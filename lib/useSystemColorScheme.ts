"use client";

import { useEffect, useState } from "react";

const useSystemColorScheme = () => {
  const isClient = typeof window !== "undefined";

  const [isDarkMode, setIsDarkMode] = useState(
    isClient ? window.matchMedia("(prefers-color-scheme: dark)").matches : false
  );

  useEffect(() => {
    if (!isClient) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [isClient]);

  return isDarkMode;
};

export default useSystemColorScheme;
