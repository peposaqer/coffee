import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children, detectLang }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    detectLang()
  }, [pathname]);

  return children || null;
};

export default ScrollToTop;
