import { useCallback, useEffect, useState } from "react";

// cand setam initial value, noi nu le salvam in localStorage
// de exemplu, la prima incarcare a paginii initialValue este null, null
// dar localStorage este gol.
// helper method, un fel se setState()
function setStorage(key, value) {
  if (window?.localStorage) {
    if (value === undefined) {
      window.localStorage.removeItem(key);
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value)); //scriem in localStorage
  }
}

export function useLocalStorageState(key, initialValue) {
  // daca deja am fost logati cu un user, cand dam refresh la pagina
  // sa ramanem logati cu acel user
  // pentru asta il luam din local storage
  // functia va fi doar prima data invocata
  const [state, setState] = useState(() => {
    const fromStorage = localStorage.getItem(key);
    if (fromStorage !== null) {
      return JSON.parse(fromStorage);
    }

    let defaultValue = initialValue;
    if (typeof initialValue === "function") {
      // daca useLocalStorage este folosit cu funtie, cum este useState(() => {}) mai sus
      defaultValue = initialValue(); // invocam initialValue, ca sa aflam care e rezultatul, pentru a-l putea stoca si serializa
    }

    setStorage(key, defaultValue);
    return defaultValue;
  });

  // cand avem mai multe tab-uri deschise cu pagina noastra:
  // daca dam logout/login de pe un tab,
  // vrem ca actiunea sa fie instantaneu actualizata si pe al doilea tab
  useEffect(() => {
    function handleStorage(e) {
      // se declanseaza cand se schimba key-ul, indiferent din ce tab a avut loc schimbarea
      if (e.key === key) {
        // ne asiguram ca e key-ul de care avem nevoie, adica sa fie key-ul din hookul curent
        setState(JSON.parse(e.newValue));
      }
    }

    window?.addEventListener("storage", handleStorage); // asa ne dam seama daca cineva mai foloseste hook-ul?
    return () => {
      window?.removeEventListener("storage", handleStorage);
    };
  }, [key]);

  // de cate ori ruleaza hookul, declara si returneaza o functie updateState
  // daca facem asta, inseamna ca ceea ce e in Auth nu este o functie stabila in timp
  // deoarece SIGUR isi va modifica referinta (va fi diferint de la o randare la alta).
  // pot aparea diferite probleme, din cauza dependentelor.
  // daca vrem sa obtinem o functie care are o referinta stabila in timp
  // putem folosi un alt hook, numit useCallback
  const updateState = useCallback(
    (newState) => {
      setState((oldState) => {
        let newValue = newState;
        if (typeof newState === "function") {
          newValue = newState(oldState);
        }
        setStorage(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  return [state, updateState];
}
