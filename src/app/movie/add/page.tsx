"use client";

import { useState } from "react";
import Image from "next/image";
import { MovieAddEditForm } from "#/components/movie-add-edit-form";

export default function AddmoviePage() {
  const [image, setImage] = useState<string>("");

  const detect = (data: string) => {
    setImage(data);
    console.log("🤬 ~ file: page.tsx:7 ~ detect ~ data:", data);
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
          <MovieAddEditForm type="add" parentCallback={detect} />
        </div>
      </div>
    </div>
  );
}
