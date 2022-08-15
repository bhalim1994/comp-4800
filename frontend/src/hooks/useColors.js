import { useEffect } from "react";
import colors from "../config/colors";

const useColors = () => {
  useEffect(() => {
    const rootEl = document.querySelector(":root");

    for (const [key, val] of Object.entries(colors))
      rootEl.style.setProperty(`--${key}-clr`, val);
  }, []);
};

export default useColors;
