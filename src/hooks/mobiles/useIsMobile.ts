import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent =
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        ) || window.innerWidth <= 1024;

      setIsMobile(
        mobile || ("ontouchstart" in window && window.innerWidth <= 1024)
      );
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  return isMobile;
};
