import React, { useState, useEffect } from "react";

const getSystemTheme = () => {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
};

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return getSystemTheme();
  });

  useEffect(() => {
    const root = document.documentElement;
    console.log("Tema atual:", isDark ? "dark" : "light");
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="self-end mb-4 flex items-center gap-3">
      <span className="text-sm text-gray-800 dark:text-gray-200">
        {isDark ? "Modo escuro 🌙" : "Modo claro 🌞"}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isDark}
          onChange={toggleTheme}
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-700 rounded-full peer-checked:bg-blue-600 dark:peer-checked:bg-yellow-500 transition-colors" />
        <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-full" />
      </label>
    </div>
  );
};

export default ThemeToggle;
