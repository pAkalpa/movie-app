"use client";
import Loading from "#/app/loading";
import { Button, buttonVariants } from "#/components/ui/button";
import { deleteMovie } from "#/functions/client/movieFunctions";
import { useSearch } from "#/lib/hooks/useSearch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { movies } from "@prisma/client";

export interface MovieDetailsProps {
  movieData: movies;
}

const MovieDetails = ({ movieData }: MovieDetailsProps) => {
  const queryClient = useQueryClient();
  const [isImgLoading, setIsImgLoading] = useState(false);
  const router = useRouter();
  const { searchValue } = useSearch();
  const { mutateAsync: deleteMovieAsync } = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies", { searchValue }],
      });
      router.replace("/");
    },
  });
  const deleteHandler = async () => {
    await deleteMovieAsync(movieData.id);
  };
  return (
    <div className="bg-secondary relative px-4 md:px-0">
      <div className="container mx-auto min-h-[calc(100vh-77px)] flex items-center relative">
        <div className="flex-col lg:flex-row flex gap-10 lg:mx-10 py-20">
          <div className="mx-auto flex-none relative">
            <Image
              src={movieData.image}
              width={700}
              height={700}
              className="w-[300px] object-cover"
              alt="movie poster"
              priority
              onLoadingComplete={() => setIsImgLoading(false)}
            />
            {isImgLoading && <Loading />}
          </div>

          <div className="space-y-6">
            <div className="uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-white">
              {movieData.title}
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="flex gap-4 text-textColor hover:text-white cursor-pointer">
                <div>{movieData.genre}</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div>Language: {movieData.language.toUpperCase()}</div>
              <div>Release: {movieData.release}</div>
              <div>Runtime: {movieData.runtime.toUpperCase()}</div>
            </div>

            <div className="pt-14 space-y-2 pr-4">
              <div>PLOT:</div>
              <div className="lg:line-clamp-4">{movieData.plot}</div>
            </div>
            <div className="flex flex-row gap-2">
              <Link
                href={`/movie/edit/${movieData.id}`}
                className={buttonVariants({ variant: "outline" })}
              >
                Update Movie
              </Link>
              <Button variant="destructive" onClick={deleteHandler}>
                Delete this Movie
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
