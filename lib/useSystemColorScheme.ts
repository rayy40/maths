"use client";

import { useEffect, useState } from "react";

const useSystemColorScheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== undefined
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isDarkMode;
};

export default useSystemColorScheme;
