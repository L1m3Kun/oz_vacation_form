import { useEffect, useState } from "react";
const resizing = () => (window.innerWidth > 640 ? 416 : 256);
const useResize = () => {
  const [windowWidthSize, setWindowWidthSize] = useState(resizing);

  useEffect(() => {
    const resize = () => {
      setWindowWidthSize(resizing());
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return { windowWidthSize };
};

export default useResize;
