import React, { useState } from "react";
import Board from "./Board";
import styles from "../Styles/Game.module.css";
import LoseScreen from "./LoseScreen";
import TryAgainScreen from "./TryAgainScreen";
import Save from "./Save";
import WinScreen from "./WinScreen";

export const GameContext = React.createContext<{
  isLost: boolean;
  isWon: boolean;
  setIsLost: (val: boolean) => void;
  setNext: (val: boolean) => void;
  setSave: (val: boolean) => void;
  setIsWon: (val: boolean) => void;
}>({
  isWon: false,
  isLost: false,
  setIsLost: () => {},
  setNext: () => {},
  setSave: () => {},
  setIsWon: () => {},
});

const GameScreen = () => {
  const [isLost, setIsLost] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);

  return (
    <div className={styles.GameContainer}>
      <GameContext.Provider
        value={{ isWon, isLost, setIsLost, setNext, setSave, setIsWon }}
      >
        {!save ? (
          isLost ? (
            next ? (
              <TryAgainScreen />
            ) : (
              <LoseScreen />
            )
          ) : isWon ? (
            next ? (
              <TryAgainScreen />
            ) : (
              <WinScreen />
            )
          ) : null
        ) : (
          <Save />
        )}
        <Board />
      </GameContext.Provider>
    </div>
  );
};

export default GameScreen;
