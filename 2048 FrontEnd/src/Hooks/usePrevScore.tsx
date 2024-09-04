import { useEffect, useRef } from "react";

const usePrevScore = (val: number) => {
  const prev = useRef<number>(0);
  const truePrev = useRef<number>(0);
  useEffect(() => {
    if (val != prev.current) {
      truePrev.current = prev.current;
    }
    prev.current = val;
  }, [val]);
  return truePrev.current;
};

export default usePrevScore;
