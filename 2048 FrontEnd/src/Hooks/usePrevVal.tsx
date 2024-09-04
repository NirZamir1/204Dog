import { useRef, useEffect } from "react";

export const usePrevVal = <Type,>(val: Type) => {
  const prev = useRef<Type>();

  useEffect(() => {
    prev.current = val;
  }, [val]);

  return prev.current;
};
