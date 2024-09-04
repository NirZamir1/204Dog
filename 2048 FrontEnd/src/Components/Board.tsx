import {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "../styles/Board.module.css";
import Row from "./Row";
import Tile from "./Tile";
import tile from "./Tile";
import {
  getIsLost,
  getIsWon,
  getScore,
  GetTiles,
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
} from "../GameLogic";

export interface tile {
  number: number;
  id: number;
  position: { x: number; y: number };
  isMerged?: boolean;
}
import { GameContext } from "./GameScreen";
import { ControllerContext } from "./HomePage";
import DogTile from "./DogTile";
const Board = () => {
  const [tiles, setTiles] = useState<tile[]>(GetTiles());
  const KeyPressed = useRef<boolean>(false);
  const { isLost, setIsLost, isWon, setIsWon } = useContext(GameContext);
  const { show, setScore } = useContext(ControllerContext);

  useLayoutEffect(() => {
    function handler() {
      if (!isLost) {
        setIsLost(getIsLost());
        setIsWon(getIsWon());
        setTiles(GetTiles());
        setScore(getScore());
      }
    }
    handler();
  }, [isLost, isWon]);
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft" || "a":
          KeyPressed.current = false;
          break;
        case "ArrowRight" || "d":
          KeyPressed.current = false;
          break;
        case "ArrowUp" || "ArrowUp":
          KeyPressed.current = false;
          break;
        case "ArrowDown":
          KeyPressed.current = false;
          break;
      }
      setIsLost(getIsLost());
      setIsWon(getIsWon());
    };
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!KeyPressed.current) {
        switch (event.key) {
          case "ArrowLeft" || "a":
            MoveLeft();
            setTiles(GetTiles());
            KeyPressed.current = true;

            break;
          case "ArrowRight" || "d":
            MoveRight();
            setTiles(GetTiles());
            KeyPressed.current = true;

            break;
          case "ArrowUp" || "ArrowUp":
            MoveUp();
            setTiles(GetTiles());
            KeyPressed.current = true;

            break;
          case "ArrowDown":
            MoveDown();
            setTiles(GetTiles());
            KeyPressed.current = true;

            break;
        }
        setScore(getScore());
      }
    };
    if (!isLost) {
      window.addEventListener("keydown", handleKeyPress);
      window.addEventListener("keyup", handleKeyUp);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return (
    <Fragment>
      <div className={styles.BoardContainer}>
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
      <div className={styles.TileContainer}>
        {!show
          ? tiles
              .sort((a, b) => a.id - b.id)
              .map((tile) => (
                <Tile
                  key={`${tile.id}`}
                  id={tile.id}
                  number={tile.number}
                  position={tile.position}
                  isMerged={tile.isMerged ? true : false}
                />
              ))
          : tiles
              .sort((a, b) => a.id - b.id)
              .map((tile) => (
                <DogTile
                  key={`${tile.id}`}
                  id={tile.id}
                  number={tile.number}
                  position={tile.position}
                  isMerged={tile.isMerged ? true : false}
                />
              ))}
      </div>
    </Fragment>
  );
};

export default Board;
