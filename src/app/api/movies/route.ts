import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  searchMovies,
  updateMovie,
} from "#/functions/db/dbFunctions";
import { IMovieUpdateData } from "#/lib/types";
import { Prisma } from "@prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchString = request.nextUrl.searchParams.get("search") as string;

    if (!searchString || typeof searchString !== "string") {
      const movies = await getAllMovies();
      return NextResponse.json(movies, { status: 200 });
    }

    const movies = await searchMovies(searchString);

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("🤬 ~ file: route.ts:27 ~ GET ~ error:", error);
      // fetch error code and return appropriate response
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("image") as unknown as File;
    const movieString: string | null = data.get("data") as unknown as string;
    const movieData: IMovieUpdateData = JSON.parse(movieString);
    console.log("🚀 ~ file: route.ts:41 ~ POST ~ movieData:", movieData);
    if (!movieData) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `./public/uploads/${file.name}`;
    await writeFile(path, buffer);
    movieData.image = `/uploads/${file.name}`;
    await createMovie(movieData);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("image") as unknown as File;
    const movieString: string | null = data.get("data") as unknown as string;
    const movieData: IMovieUpdateData = JSON.parse(movieString);
    if (!movieData) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    if (file.name !== undefined) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = `./public/uploads/${file.name}`;
      await writeFile(path, buffer);
      movieData.image = `/uploads/${file.name}`;
    }
    await updateMovie(movieData);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const mid = request.nextUrl.searchParams.get("mid") as string;
    await deleteMovie(mid);
    return NextResponse.json({ message: "Movie deleted" }, { status: 200 });
  } catch (error) {
    console.log("🤬 ~ file: route.ts:42 ~ DELETE ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
