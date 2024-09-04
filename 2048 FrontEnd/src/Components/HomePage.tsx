import { createContext, useState } from "react";
import GameController from "./GameController";
import GameScreen from "./GameScreen";
export const ControllerContext = createContext<{
  show: boolean;
  setShow: (val: boolean) => void;
  score: number;
  setScore: (val: number) => void;
}>({
  show: false,
  setShow: () => {
    return;
  },
  score: -1,
  setScore: () => {},
});
const GamePage = () => {
  const [show, setShow] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  return (
    <ControllerContext.Provider value={{ score, setScore, show, setShow }}>
      <GameController />
      <GameScreen />
    </ControllerContext.Provider>
  );
};

export default GamePage;
