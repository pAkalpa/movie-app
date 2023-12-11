import { ILoginRegister, IMovieUpdate, IMovieUpdateData } from "#/lib/types";
import { movies, users } from "@prisma/client";
import prisma from "#/lib/db";

export const getMovie = async (
  id: string
): Promise<movies | null | undefined> => {
  try {
    const movie = await prisma?.movies.findUnique({
      where: {
        id: id,
      },
    });
    return movie;
  } catch (error) {
    console.log("🤬 ~ file: auth.ts:15 ~ getUser ~ error:", error);
    throw new Error("Unable to find movie");
  }
};

export const getUser = async (
  email: string
): Promise<users | null | undefined> => {
  try {
    const user = await prisma?.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log("🤬 ~ file: auth.ts:17 ~ getUser ~ error:", error);
    throw new Error("Unable to find user");
  }
};

export const createUser = async (data: ILoginRegister): Promise<void> => {
  await prisma?.users.create({
    data: {
      email: data.email,
      password: data.password,
    },
  });
};

export const searchMovies = async (
  searchString: string
): Promise<movies[] | null | undefined> => {
  const movies = await prisma?.movies.findMany({
    where: {
      title: {
        contains: searchString,
      },
    },
  });
  return movies;
};

export const getAllMovies = async (): Promise<movies[] | null | undefined> => {
  const movies = await prisma?.movies.findMany();
  return movies;
};

export const deleteMovie = async (mid: string): Promise<void> => {
  await prisma?.movies.delete({
    where: {
      id: mid,
    },
  });
};

export const updateMovie = async (data: IMovieUpdateData): Promise<void> => {
  await prisma.movies.update({
    where: {
      id: data.id,
    },
    data: data,
  });
};
export const createMovie = async (data: IMovieUpdateData): Promise<void> => {
  const { id, image, ...rest } = data;
  await prisma.movies.create({
    data: {
      ...rest,
      image: image as string,
    },
  });
};
