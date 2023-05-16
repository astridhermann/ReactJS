import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.backgroundHeader}>
      <div
        className={styles.backGroundDiv}
        style={{
          content: "",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url("/Images/2095.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "50% 0",
        }}
      />
    </div>
  );
}
