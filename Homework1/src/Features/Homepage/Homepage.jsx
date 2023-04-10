import styles from "./Homepage.module.css";

export function Homepage() {
  return (
    <div
      className={styles.divButton}
      style={{
        backgroundImage: `url("/Images/backgroundImage.jpg")`,
      }}
    >
      <div className={styles.buttonWrapper}>
        <div>
          <a id="singUp" className={styles.button2} href="/singup">
            Sing Up
          </a>
          <a id="logIn" className={styles.button2} href="/login">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
