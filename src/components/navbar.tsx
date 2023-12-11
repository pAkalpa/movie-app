"use client";
import Link from "next/link";
import MovieSearchbar from "./movie-search-bar";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-end w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl gap-2">
      <MovieSearchbar />
      <Link
        href="/movie/add"
        className={buttonVariants({ variant: "outline" })}
      >
        Add Movie
      </Link>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
};
