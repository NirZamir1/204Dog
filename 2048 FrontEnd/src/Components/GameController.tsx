import { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "../Styles/GameController.module.css";
import { ControllerContext } from "./HomePage.tsx";
import useHighestScore from "../Hooks/useHighestScore.tsx";
import "../Styles/GameController.module.css";
import usePrevScore from "../Hooks/usePrevScore.tsx";

const GameController = () => {
  const { show, setShow, score } = useContext(ControllerContext);
  const [highestScore, setHighestScore] = useState(() => 0);
  const tempScore = useHighestScore(score);
  const [animationClass, setAnimationClass] = useState(styles.noshow);
  const prev = usePrevScore(score);
  let diff: number = 0;
  if (prev) {
    diff = score - prev;
  } else {
    diff = score;
  }

  useLayoutEffect(() => setHighestScore(parseInt(tempScore)), [tempScore]);
  useEffect(() => {
    function resetAnimtation() {
      if (score != 0) {
        setAnimationClass(styles.addition);
        setTimeout(() => {
          setAnimationClass(styles.noshow);
        }, 500);
      }
    }
    resetAnimtation();
  }, [score]);
  return (
    <div className={styles.GameControllerContainer}>
      <button onClick={() => setShow(!show)} className={styles.button}>
        {show ? "Show Numbers" : "Show Dogs"}
      </button>
      <div className={styles.ScoreContainer}>Score: {score}</div>
      <div className={animationClass}>+{diff}</div>
      <div className={styles.HighestScoreContainer}>
        Highest Score: {highestScore}
      </div>
    </div>
  );
};

export default GameController;
