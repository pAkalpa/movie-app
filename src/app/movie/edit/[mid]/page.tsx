"use client";

import { MovieAddEditForm } from "#/components/movie-add-edit-form";
import { useGetFetchQuery } from "#/lib/hooks/useGetFetchQuery";
import { useSearch } from "#/lib/hooks/useSearch";
import { movies } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";
import { set } from "zod";
import { useRouter } from "next/navigation";

interface MovieEditPageProps {
  params: {
    mid: string;
  };
}

export default function EditmoviePage({ params }: MovieEditPageProps) {
  const [image, setImage] = useState<string>("");
  const { searchValue } = useSearch();
  const data = useGetFetchQuery(["movies", { searchValue }]) as movies[];
  const router = useRouter();
  if (data === undefined) {
    return router.replace("/not-found");
  }
  const movie = data?.find((movie: movies) => movie.id === params.mid);
  const detect = (data: string) => {
    setImage(data);
  };
  return (
    <div className="bg-secondary relative px-4 md:px-0">
      <div className="container mx-auto min-h-[calc(100vh-77px)] flex items-center relative">
        <div className="flex-col lg:flex-row flex gap-10 lg:mx-10 py-20">
          <div className="mx-auto flex-none relative">
            {image && (
              <Image
                src={image}
                width={700}
                height={700}
                className="w-[300px] object-cover"
                alt="movie poster"
                priority
              />
            )}
          </div>
          <MovieAddEditForm
            type="edit"
            parentCallback={detect}
            movieData={movie}
          />
        </div>
      </div>
    </div>
  );
}
