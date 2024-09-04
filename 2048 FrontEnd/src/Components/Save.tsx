import { ChangeEvent, useContext, useState } from "react";
import styles from "../Styles/Save.module.css";
import { ControllerContext } from "./HomePage";
import { GameContext } from "./GameScreen";
const Save = () => {
  const { score } = useContext(ControllerContext);
  const { setSave } = useContext(GameContext);
  const [isSave, setIsSave] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const saveFunc = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: query, score: score }),
      });
      if (response.ok) {
        setIsSave(true);
      }
    } catch (err) {
      setMessage("failed to connect to server");
      setIsSave(false);
    }
  };
  return (
    <div className={styles.SaveScreenContainer}>
      <div className={styles.text}>Your Score is {score}!</div>
      <input
        className={styles.input}
        placeholder="Enter your name and save!"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      ></input>
      <div className={styles.Saved}>
        {isSave ? "Saved your score!" : message}
      </div>
      <div className={styles.ButtonsContainer}>
        <button onClick={() => setSave(false)} className={styles.SaveButton}>
          Back
        </button>
        <button onClick={() => saveFunc()} className={styles.SaveButton}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Save;
