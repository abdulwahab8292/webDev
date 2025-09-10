import { useEffect, useRef } from "react";
const useDebounce = (input, delay) => {
  const [debouncedVal, setDebounce] = useState(input);

  useEffect(() => {
    const timer = setInterval(() => {
      setDebounce(input);
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [value, delay]);
  return debouncedVal;
};

export default useDebounce;
