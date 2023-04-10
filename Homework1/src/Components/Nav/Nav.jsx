import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import { useAuth } from "../../features";
import {
  ArrowRightCircleIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export function Nav() {
  const { user, logout } = useAuth();

  function handleLogout(e) {
    e.preventDefault();
    logout();
  }

  return (
    <nav className={styles["main-menu"]}>
      <menu>
        <h2 className={styles.pageTitle}>Social in</h2>
        <li className={styles.alignRight}>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/"
          >
            Homepage
          </NavLink>
        </li>
        <li>
          <PencilIcon color="#fff" width={20}></PencilIcon>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/posts"
          >
            Posts
          </NavLink>
        </li>
        {user && (
          <li>
            Welcome {user.name}!{" "}
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        )}

        {!user && (
          <>
            <li>
              <ArrowRightCircleIcon
                color="#fff"
                width={20}
              ></ArrowRightCircleIcon>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="/login"
              >
                Log in
              </NavLink>
            </li>
            <li>
              <UserCircleIcon color="#fff" width={20}></UserCircleIcon>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="/singup"
              >
                Sing Up
              </NavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
