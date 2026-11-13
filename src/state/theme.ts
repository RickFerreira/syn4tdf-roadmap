import { useCallback, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "syn4tdf-roadmap:theme";

function current(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current);
  const toggle = useCallback(() => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* sem storage: vale só nesta sessão */
    }
    setTheme(next);
  }, []);
  return { theme, toggle };
}
