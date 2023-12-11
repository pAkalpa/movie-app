"use client";
import { z } from "zod";
import { movies } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createMovie, updateMovie } from "#/functions/client/movieFunctions";
import { useSearch } from "#/lib/hooks/useSearch";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface MovieAddEditFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "add" | "edit";
  movieData?: movies;
  parentCallback: (preview: string) => void;
}

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export function MovieAddEditForm({
  type,
  parentCallback,
  movieData,
}: MovieAddEditFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { searchValue } = useSearch();
  const { mutateAsync: updateMovieAsync } = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies", { searchValue }],
      });
      router.replace("/");
    },
  });
  const { mutateAsync: createMovieAsync } = useMutation({
    mutationFn: createMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies", { searchValue }],
      });
      router.replace("/");
    },
  });

  const schema = z.object({
    title: z.string().min(1).max(255),
    image: z.any(),
    genre: z.string().min(1).max(255),
    language: z.string().min(1).max(255),
    release: z.string().min(1).max(255),
    runtime: z.string().min(1).max(255),
    plot: z.string().min(1),
  });
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: movieData?.title,
      image: movieData?.image,
      genre: movieData?.genre,
      language: movieData?.language,
      release: movieData?.release,
      runtime: movieData?.runtime,
      plot: movieData?.plot,
    },
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    const fd = new FormData();
    const { image, ...rest } = data;
    if (type === "edit") {
      if (image !== undefined) {
        fd.set("image", image[0]);
      }
      fd.set(
        "data",
        JSON.stringify({ id: movieData?.id, image: movieData?.image, ...rest })
      );
      await updateMovieAsync(fd);
    } else {
      if (image === undefined) {
        toast.warning("Please Upload Image and Try again");
        return;
      }
      fd.set("image", image[0]);
      fd.set("data", JSON.stringify({ ...rest }));
      await createMovieAsync(fd);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Genre</FormLabel>
              <FormControl>
                <Input placeholder="Genre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Movie Cover Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...rest}
                  accept="image/jpg"
                  onChange={(e) => {
                    const { files, displayUrl } = getImageData(e);
                    parentCallback(displayUrl);
                    onChange(files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Language</FormLabel>
              <FormControl>
                <Input placeholder="Language" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="release"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Release</FormLabel>
              <FormControl>
                <Input placeholder="Release" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="runtime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Runtime</FormLabel>
              <FormControl>
                <Input placeholder="Runtime" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Plot</FormLabel>
              <FormControl>
                <Textarea placeholder="Plot" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{type === "add" ? "Add" : "Update"} Movie</Button>
      </form>
    </Form>
  );
}
