"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { useSearch } from "#/lib/hooks/useSearch";

const MovieSearchbar = () => {
  const [search, setSearch] = useState<string>("");
  const { handleSearch } = useSearch();

  return (
    <Input
      className="w-60"
      type="search"
      placeholder="Search Movie Title"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default MovieSearchbar;
