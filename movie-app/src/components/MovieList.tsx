import { useReducer, useState } from "react";
import { Star, StarOff } from "lucide-react";
import { useDispatch } from "react-redux";
import moviesSlice, { type Movie } from "../redux/slices/moviesSlice";

type MovieListProps = {
  movies: Movie[];
  showOnlyFavorites?: boolean;
};

export default function MovieList({
  movies,
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
        />
      ))}
    </ul>
  );
}

type MovieListItemProps = {
  movie: Movie;
};

function MovieListItem({
  movie,
}: MovieListItemProps) {
  const [isInEditMode, setIsInEditMode] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(moviesSlice.actions.deleteMovieById(movie.id));
  };

  const handleRate = () => {
    const userInput = prompt("Neue Bewertung eingeben (0-10):") ?? "";
    const newRating = parseFloat(userInput);
    if (!isNaN(newRating) && newRating >= 0 && newRating <= 10) {
      dispatch(moviesSlice.actions.rateMovie({ id: movie.id, rating: newRating }) );
    }
  };

  const toggleEditMode = () => {
    setIsInEditMode(!isInEditMode);
  };

  const onEditSubmit = (updatedMovie: Movie) => {
    dispatch(moviesSlice.actions.updateMovie(updatedMovie));
    setIsInEditMode(false);
  };

  const handleFavorite = () => {
    dispatch(moviesSlice.actions.toggleFavorite(movie.id));
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
