"use client";

import { MoonIcon, SunIcon, BrainCircuit } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import "../../styles/header-navbar.css";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="header-navbar" data-theme={mounted ? theme : undefined}>
      <div className="header-navbar-inner header-navbar-between">
        <div className="header-title">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <h1>Smart Analyzer</h1>
        </div>
        <button
          className="header-theme-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
      </div>
    </header>
  );
};
