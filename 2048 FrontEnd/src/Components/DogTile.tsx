import { useEffect, useState } from "react";
import { usePrevVal } from "../Hooks/usePrevVal";
import styles from "../Styles/DogTile.module.css";

const DogTile = ({
  id,
  number,
  position,
  isMerged,
}: {
  id: number;
  number: number;
  position: { x: number; y: number };
  isMerged: boolean;
}) => {
  const [scale, setScale] = useState<number>(0);
  const [num, setNum] = useState<number>(number);
  let val = usePrevVal(number);
  let isNew = false;
  let hasChanged = false;

  if (!val) isNew = true;
  else if (val !== number) {
    hasChanged = true;
  }

  useEffect(() => {
    if (isNew) {
      setScale(0.1);
      setTimeout(() => {
        setScale(1);
      }, 0);
    } else if (hasChanged) {
      setScale(1);
      if (val) setNum(val);
      setTimeout(() => {
        if (val) setNum(number);
        setScale(1.2);
        setTimeout(() => {
          setScale(1);
        }, 100);
      }, 100);
    }
  }, [hasChanged, isNew]);

  return (
    <div
      id={`${id}`}
      className={`tile tile-${number} position-${position.y}-${position.x} ${
        isMerged ? "merged" : ""
      }`}
    >
      <div className="inner" style={{ transform: `scale(${scale})` }}>
        <img
          className={styles.DogImage}
          src={`/Content/${hasChanged ? num : number}.jpg`}
        ></img>
      </div>
    </div>
  );
};

export default DogTile;
