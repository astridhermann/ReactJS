import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import { useAuth } from "../../features";
import clsx from "clsx";

function BrandNavLink({ children, className, ...props }) {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(className, { [styles.active]: isActive })
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}

export function Nav() {
  const { user, logout } = useAuth();

  function handleLogout(e) {
    e.preventDefault();
    logout();
  }

  return (
    <nav className={styles["main-menu"]}>
      <menu>
        <li>
          <BrandNavLink to="/">Home</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="/products">Products</BrandNavLink>
        </li>
        {user && (
          <li>
            <BrandNavLink to="/products/add">Add Product</BrandNavLink>
          </li>
        )}
        {user && (
          <li>
            <BrandNavLink to="/categories/add">Add Category</BrandNavLink>
          </li>
        )}
        {user && (
          <li>
            <BrandNavLink to="/brands/add">Add Brand</BrandNavLink>
          </li>
        )}
        {user && (
          <li className={styles.pushRight}>
            Welcome to Luxly, {user.firstName}!
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        )}
        {!user && (
          <>
            <li className={styles.pushRight}>
              <BrandNavLink to="/login">Login</BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="/register">Register</BrandNavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
