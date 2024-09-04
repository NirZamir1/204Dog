import { useLayoutEffect, useState } from "react";

const useHighestScore = (score: number) => {
  const [value, setValue] = useState(() => localStorage.getItem("score"));
  useLayoutEffect(() => {
    if (!value) {
      localStorage.setItem("score", String(score));
      setValue(String(score));
    } else if (parseInt(value) < score) {
      localStorage.setItem("score", String(score));
      setValue(String(score));
    }
  }, [score]);
  return value!;
};

export default useHighestScore;
