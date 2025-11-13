import type { DataHandler, Movie } from "../DataHandler";

type MovieListProps = {
  movies: Movie[];
  dataHandler: DataHandler;
  updateMovies: () => void;
};

export default function MovieList({
  movies,
  dataHandler,
  updateMovies,
}: MovieListProps) {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieListItem
          key={movie.id}
          movie={movie}
          dataHandler={dataHandler}
          updateMovies={updateMovies}
        />
      ))}
    </ul>
  );
}

type MovieListItemProps = {
  movie: Movie;
  dataHandler: DataHandler;
  updateMovies: () => void;
};

function MovieListItem({
  movie,
  dataHandler,
  updateMovies,
}: MovieListItemProps) {
  const handleDelete = () => {
    dataHandler.deleteMovieById(movie.id);
    updateMovies();
  };

  const handleRate = () => {
    const userInput = prompt("Neue Bewertung eingeben (0-10):") ?? "";
    const newRating = parseFloat(userInput);
    if (!isNaN(newRating) && newRating >= 0 && newRating <= 10) {
      dataHandler.rateMovie(movie.id, newRating);
      updateMovies();
    }
  }

  return (
    <li>
      <h2>
        {movie.title} ({movie.rating})
      </h2>
      <p>{movie.description}</p>
      <button onClick={handleRate}>Rate</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}
