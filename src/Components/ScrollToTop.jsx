import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Esto hace que la pantalla suba de golpe al inicio de cada página
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;