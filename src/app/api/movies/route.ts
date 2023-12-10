import prisma from "#/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search") as string;
    console.log("🤬 ~ file: route.ts:8 ~ GET ~ search:", search);

    if (!search || typeof search !== "string") {
      const movies = await prisma.movies.findMany();
      return NextResponse.json(movies, { status: 200 });
    }

    const movies = await prisma.movies.findMany({
      where: {
        title: {
          contains: search,
        },
      },
    });

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
  const data = await request.formData();
  console.log("🤬 ~ file: route.ts:36 ~ POST ~ data:", data);
}

export async function PUT(request: NextRequest) {
  const data = await request.formData();
  console.log("🤬 ~ file: route.ts:40 ~ PUT ~ data:", data);
}

export async function DELETE(request: NextRequest) {
  try {
    const mid = request.nextUrl.searchParams.get("mid") as string;
    await prisma.movies.delete({
      where: {
        id: mid,
      },
    });
    return NextResponse.json({ message: "Movie deleted" }, { status: 200 });
  } catch (error) {
    console.log("🤬 ~ file: route.ts:42 ~ DELETE ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
