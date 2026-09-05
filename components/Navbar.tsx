"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex w-[90%] max-w-4xl items-center justify-between rounded-full border border-border/40 bg-background/70 px-6 py-3.5 shadow-sm backdrop-blur-md transition-all">
      
      {/* Logo */}
      <a href="#" className="text-xl font-extrabold tracking-tight text-foreground">
        Nezira<span className="text-primary">.</span>
      </a>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
        <a href="#about" className="hover:text-foreground transition-colors">About</a>
        <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
        <a href="#education" className="hover:text-foreground transition-colors">Education</a>
        <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/50 text-foreground transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Toggle theme"
      >
        {mounted ? (
          theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )
        ) : (
          <div className="h-[18px] w-[18px]" />
        )}
      </button>
    </nav>
  );
}