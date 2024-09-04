import { useContext } from "react";
import styles from "../Styles/LoseScreen.module.css";
import { GameContext } from "./GameScreen";
const WinScreen = () => {
  const { setNext, setSave } = useContext(GameContext);
  return (
    <div className={styles.LoseScreenContainer}>
      <h1 className={styles.LostHeader}>You win!</h1>
      <div className={styles.LostContent}>Go touch grass nerd🤓</div>
      <div className={styles.buttonsContainer}>
        <button onClick={() => setNext(true)} className={styles.LoseButton}>
          Next
        </button>
        <button onClick={() => setSave(true)} className={styles.LoseButton}>
          Save Score
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
