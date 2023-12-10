"use client";

import React, { createContext, useState, ReactNode } from "react";
import { SearchContextType } from "../types";

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

interface SearchProviderProps {
  children: ReactNode;
}

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <SearchContext.Provider value={{ searchValue, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
