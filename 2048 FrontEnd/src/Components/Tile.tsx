import { useEffect, useState } from "react";
import "../styles/Tile.css";
import { usePrevVal } from "../Hooks/usePrevVal";
const tile = ({
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
    function animationhandler() {
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
    }
    animationhandler();
  }, [hasChanged, isNew]);
  return (
    <div
      id={`${id}`}
      className={`tile tile-${number} position-${position.y}-${position.x} ${
        isMerged ? "merged" : ""
      }`}
    >
      <div className="inner" style={{ transform: `scale(${scale})` }}>
        {!hasChanged ? number : num}
      </div>
    </div>
  );
};

export default tile;
