import type { Movie } from "../DataHandler";

type MovieListProps = {
  movies: Movie[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>
            {movie.title} ({movie.rating})
          </h2>
          <p>{movie.description}</p>
        </li>
      ))}
    </ul>
  );
}
