import MovieCard from "#/components/movie-card";
import MovieList from "#/components/movie-list";
import { Navbar } from "#/components/navbar";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-center w-full mt-5">
        {/* <MovieCard
          movieData={{
            id: "1",
            title: "Family Switch",
            plot: "When a chance encounter with an astrological reader causes the Walkers to wake up to a full body switch, can they unite to land a promotion, college interview, record deal, and soccer tryout?",
            image: "/uploads/fs.jpg",
            genre: "Comedy, Family",
            runtime: "101 min",
            language: "English",
            release: "30 Nov 2023",
            createdAt: new Date(),
          }}
        /> */}
        <MovieList />
      </div>
    </>
  );
}
