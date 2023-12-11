import { movies } from "@prisma/client";

export const getMovies = async (search?: string): Promise<movies[]> => {
  const response = await fetch(`/api/movies/?search=${search || ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0,
    },
  });
  const data = await response.json();
  return data;
};

export const deleteMovie = async (id: string): Promise<void> => {
  await fetch(`/api/movies/?mid=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateMovie = async (data: FormData): Promise<void> => {
  await fetch("/api/movies", {
    method: "PUT",
    body: data,
  });
};

export const createMovie = async (data: FormData): Promise<void> => {
  await fetch("/api/movies", {
    method: "POST",
    body: data,
  });
};
