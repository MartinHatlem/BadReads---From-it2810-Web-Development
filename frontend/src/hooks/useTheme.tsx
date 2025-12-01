import { useEffect, useState, useCallback } from "react";

export type ThemeKey = "light" | "dark" | "system";

const useTheme = (): [ThemeKey, (value: ThemeKey) => void] => {
  const [theme, setTheme] = useState<ThemeKey>(
    (localStorage.getItem("theme") as ThemeKey) || "system",
  );

  const element: HTMLElement = document.documentElement;
  const darkQuery: MediaQueryList = window.matchMedia(
    "(prefers-color-scheme: dark)",
  );

  const applyTheme = useCallback(
    (theme: ThemeKey) => {
      if (theme === "dark") {
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else if (theme === "light") {
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        localStorage.removeItem("theme");
        if (darkQuery.matches) {
          element.classList.add("dark");
        } else {
          element.classList.remove("dark");
        }
      }
    },
    [darkQuery, element],
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    const changeHandler = (e: MediaQueryListEvent) => {
      if (!("theme" in localStorage)) {
        if (e.matches) {
          element.classList.add("dark");
        } else {
          element.classList.remove("dark");
        }
      }
    };

    darkQuery.addEventListener("change", changeHandler);
    return () => darkQuery.removeEventListener("change", changeHandler);
  }, [darkQuery, element]);

  return [theme, setTheme];
};

export default useTheme;
