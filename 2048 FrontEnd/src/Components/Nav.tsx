import { useNavigate } from "react-router-dom";
import styles from "../Styles/Nav.module.css";
export const Nav = () => {
  const nevigate = useNavigate();
  return (
    <div className={styles.NavContainer}>
      <h1 className={styles.NavHeader} onClick={() => nevigate("/")}>
        204🐩
      </h1>
      <div className={styles.ButtonContainer}>
        <button
          className={styles.button}
          onClick={() => {
            nevigate("/about");
          }}
        >
          About
        </button>
        <hr className={styles.line} />
        <button
          className={styles.button}
          onClick={() => {
            nevigate("/");
          }}
        >
          Play
        </button>
        <hr className={styles.line} />
        <button
          className={styles.button}
          onClick={() => {
            nevigate("/scoreboard");
          }}
        >
          Scoreboard
        </button>
      </div>
    </div>
  );
};

export default Nav;
