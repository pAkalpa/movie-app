"use client";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-end w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <ThemeToggle />
    </div>
  );
};
