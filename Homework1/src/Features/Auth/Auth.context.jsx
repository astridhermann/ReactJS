import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null); //context trebuie sa fie cu initiala mare; 
const initialValue = {   //structura asta o primim dupa login sau register
    accessToken: null,
    user: null,
}

export function AuthContextProvider({ children }) { //pasam toti copii din App.jsx (Nav, ToDo, etc.)
    const[auth, setAuth] = useState(initialValue);

    function login(auth){
        setAuth(auth);
    }

    function logout(){
        setAuth(initialValue);
    }

    //{...auth} --> se trimite separat accessToken si user
    return (
        <AuthContext.Provider value={{...auth, login, logout}}>
            {children}
        </AuthContext.Provider> 
    );
}


export function useAuth() { //custom hook name convention: prefix use
    const ctx =  useContext(AuthContext); //hook folosit in alt hook
    if (ctx === null) {
        throw new Error(
            'The useAuth hook needs to be used inside a child of AuthContextProvider');
    }

    return ctx;
}