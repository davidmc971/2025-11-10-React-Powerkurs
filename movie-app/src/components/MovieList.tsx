import { useReducer, useState } from "react";
import type { DataHandler, Movie } from "../DataHandler";
import { Star, StarOff } from "lucide-react";

type MovieListProps = {
  movies: Movie[];
  dataHandler: DataHandler;
  updateMovies: () => void;
  showOnlyFavorites?: boolean;
};

export default function MovieList({
  movies,
  dataHandler,
  updateMovies,
  showOnlyFavorites = false,
}: MovieListProps) {
  const filteredMovies = movies.filter(
    (movie) => !showOnlyFavorites || movie.isFavorite
  );

  return (
    <ul>
      {filteredMovies.map((movie) => (
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
  const [isInEditMode, setIsInEditMode] = useState(false);

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
  };

  const toggleEditMode = () => {
    setIsInEditMode(!isInEditMode);
  };

  const onEditSubmit = (updatedMovie: Movie) => {
    dataHandler.updateMovie(updatedMovie);
    updateMovies();
    setIsInEditMode(false);
  };

  const handleFavorite = () => {
    dataHandler.toggleFavorite(movie.id);
    updateMovies();
  };

  if (isInEditMode) {
    return <MovieItemEdit movie={movie} onSubmit={onEditSubmit} />;
  }

  return (
    <li>
      <h2>
        {movie.title} ({movie.rating})
      </h2>
      <p>{movie.description}</p>
      <button onClick={handleFavorite}>
        {movie.isFavorite ? <StarOff size={14} /> : <Star size={14} />}
      </button>
      <button onClick={handleRate}>Rate</button>
      <button onClick={toggleEditMode}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

const editMovieReducer = (
  state: Movie,
  action: {
    type: "setTitle" | "setDescription";
    value: string;
  }
): Movie => {
  switch (action.type) {
    case "setTitle":
      return { ...state, title: action.value };
    case "setDescription":
      return { ...state, description: action.value };
    default:
      return state;
  }
};

type MovieItemEditProps = {
  movie: Movie;
  onSubmit: (updatedMovie: Movie) => void;
};

function MovieItemEdit({ movie, onSubmit }: MovieItemEditProps) {
  const [movieState, dispatch] = useReducer(editMovieReducer, movie);

  const handleSubmit = () => {
    onSubmit(movieState);
  };

  return (
    <li style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h2>Edit Movie: {movie.title}</h2>
      <input
        type="text"
        value={movieState.title}
        onChange={(e) => dispatch({ type: "setTitle", value: e.target.value })}
      />
      <textarea
        value={movieState.description}
        onChange={(e) =>
          dispatch({ type: "setDescription", value: e.target.value })
        }
      />
      <button onClick={handleSubmit}>Save</button>
    </li>
  );
}
