// "use client";
import { cn } from "#/lib/utils";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { movies } from "@prisma/client";

export interface MovieCardProps extends React.ComponentProps<typeof Card> {
  movieData: movies;
}

const MovieCard = ({ className, movieData, ...props }: MovieCardProps) => {
  return (
    <Link href={`/movie/${movieData.id}`}>
      <Card
        className={cn(
          "w-[300px] h-[500px] aspect-auto hover:scale-[101%] transition duration-100 m-8",
          className
        )}
        {...props}
      >
        <CardHeader>
          <CardTitle className="truncate">{movieData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="rounded bg-cover bg-center h-[200px]"
            style={{ backgroundImage: `url(${movieData.image})` }}
          />
        </CardContent>
        <CardFooter className="overflow-clip">
          <p>{movieData.plot}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default MovieCard;
