import MovieCard from "#/components/movie-card";
import MovieList from "#/components/movie-list";
import { Navbar } from "#/components/navbar";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function HomePage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-center w-full mt-5">
        <MovieList />
      </div>
    </>
  );
}
