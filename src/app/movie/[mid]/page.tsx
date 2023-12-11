import MovieDetails from "#/components/movie-details";
import { getMovie } from "#/functions/db/dbFunctions";
import { redirect } from "next/navigation";

interface MovieDetailPageProps {
  params: {
    mid: string;
  };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const movieData = await getMovie(params.mid);
  if (!movieData) {
    redirect("/not-found");
  }
  return <MovieDetails movieData={movieData} />;
}
