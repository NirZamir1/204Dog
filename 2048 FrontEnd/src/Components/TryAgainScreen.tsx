import { useContext } from "react";
import styles from "../Styles/TryAgainScreen.module.css";
import { gameReset } from "../GameLogic.ts";
import { GameContext } from "./GameScreen.tsx";

const TryAgainScreen = () => {
  const { setNext, setIsLost } = useContext(GameContext);
  return (
    <div className={styles.TryAgainContainer}>
      <img className={styles.GifContainer} src="\Content\funnyGif.gif"></img>
      <button
        onClick={() => {
          gameReset();
          setNext(false);
          setIsLost(false);
        }}
        className={styles.TryAgainButton}
      >
        Try Again
      </button>
    </div>
  );
};

export default TryAgainScreen;
