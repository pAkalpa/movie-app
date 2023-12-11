"use client";

import { getMovies } from "#/functions/client/movieFunctions";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./movie-card";
import { useSearch } from "#/lib/hooks/useSearch";
import { toast } from "sonner";
import Loading from "#/app/loading";

const MovieList = () => {
  const { searchValue } = useSearch();
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getMovies(searchValue),
    queryKey: ["movies", { searchValue }],
    initialData: [],
    refetchOnMount: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error("Something went wrong");
  }

  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto py-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movieData={movie} />
      ))}
    </div>
  );
};

export default MovieList;
