import { useContext } from "react";
import { SearchContext } from "../context/search-context";
import { SearchContextType } from "../types";

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
