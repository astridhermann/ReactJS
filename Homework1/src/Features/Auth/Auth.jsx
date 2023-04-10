import { useState } from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRightOnRectangleIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import { configureApi, ApiError } from "../../Helpers/api.helper";
import { Button } from "../../components/Button/Button";

import styles from "./Auth.module.css";
import { useAuth } from "./Auth.context";

const { add: apiRegister } = configureApi("register");
const { add: apiLogin } = configureApi("login");

const emailReggex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

function checkFormValidity(input, isRegister) {
  let isValid = true;
  const errors = {};

  if (input.email === "" || !emailReggex.test(input.email)) {
    errors.email = "The email address needs to be valid.";
    isValid = false;
  }

  if (input.password === "") {
    errors.password = "The password may not be empty.";
    isValid = false;
  }

  if (isRegister) {
    if (input.password !== input.retype_password) {
      errors.retype_password = "The passwords do not match.";
      isValid = false;
    }
    if (input.name === "") {
      errors.name = "Please specify a name.";
      isValid = false;
    }
  }

  return { isValid, errors };
}

const initialErrors = {
  email: "",
  password: "",
  retype_password: "",
  lastName: "",
};

export function Auth() {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState(initialErrors);

  const navigate = useNavigate();

  const { login } = useAuth();

  const { pathname: path } = useLocation();
  const isRegister = path === "/singup";

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const user = Object.fromEntries(data.entries());

    const { isValid, errors } = checkFormValidity(user, isRegister);

    if (!isValid) {
      setErrors(errors);
      return;
    }

    setApiError("");
    setErrors(initialErrors);
    setSuccessMessage("");

    delete user.retype_password;

    try {
      let auth;
      if (isRegister) {
        auth = await apiRegister(user);
        setSuccessMessage("You have registered successfully!");
      } else {
        auth = await apiLogin(user);
        setSuccessMessage("You have logged in successfully!");
      }

      login(auth);
      console.log(auth);
      navigate("/");
    } catch (e) {
      if (e instanceof ApiError) {
        setApiError(e.message);
        return;
      }

      throw e;
    }
  }

  function wipeErrors(e) {
    setErrors({ ...errors, [e.target.name]: "" });
  }

  return (
    <>
      <div className={styles.authTitle}>
        <h1>{isRegister ? "Sing up" : "Log in"}</h1>
      </div>
      <div>
        <div className={styles.underTitleGroup}>
          <div className={styles.formTitle}>
            <UserIcon width={24}></UserIcon>
            <p className={styles.underTitle}>
              {isRegister ? "Create your account" : "Sing into your account"}
            </p>
          </div>
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                placeholder="Name"
                name="name"
                id="name"
                type="text"
                className={clsx({ [styles.hasError]: errors.name })}
                onChange={wipeErrors}
              />
              {errors.name && (
                <p className={styles.inputError}>{errors.name} </p>
              )}
            </>
          )}

          <input
            placeholder="Email Address"
            name="email"
            id="email"
            type="email"
            className={clsx({ [styles.hasError]: errors.email })}
            onChange={wipeErrors}
          />
          {errors.email && <p className={styles.inputError}>{errors.email} </p>}

          <input
            placeholder="Password"
            name="password"
            id="password"
            type="password"
            className={clsx({ [styles.hasError]: errors.password })}
            onChange={wipeErrors}
          />
          {errors.password && (
            <p className={styles.inputError}>{errors.password} </p>
          )}

          {isRegister && (
            <>
              <input
                placeholder="Confirm Password"
                name="retype_password"
                id="retype_password"
                type="password"
                className={clsx({ [styles.hasError]: errors.retype_password })}
                onChange={wipeErrors}
              />
              {errors.retype_password && (
                <p className={styles.inputError}>{errors.retype_password} </p>
              )}
            </>
          )}

          <div className={styles.divWrapper}>
            <div>
              <Button variant="primary">
                {isRegister ? "Register" : "Login"}
              </Button>
            </div>

            <div>
              {isRegister && (
                <>
                  <label>Already have an account? </label>
                  <a className={styles.authLink} id="logIn" href="/login">
                    Sing In
                  </a>
                </>
              )}
              {!isRegister && (
                <>
                  <label>Don't have an account? </label>
                  <a className={styles.authLink} id="singUp" href="/singup">
                    Sing Up
                  </a>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
