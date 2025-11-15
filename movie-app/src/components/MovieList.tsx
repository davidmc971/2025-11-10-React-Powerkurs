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
  // Hier empfiehlt es sich, useMemo zu verwenden.
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

  // Wie in App.tsx, hier holen wir uns die Dispatch-Funktion
  const dispatch = useDispatch();

  const handleDelete = () => {
    // Auch hier wieder analog zu App.tsx:
    // Wir erstellen ein Action-Objekt und schicken es an den Store,
    // welcher dann den State aktualisiert.
    dispatch(moviesSlice.actions.deleteMovieById(movie.id));

    // Zur Veranschaulichung, so könnte man es aufteilen, macht man
    // in der Praxis aber eher nicht:
    // const deleteMovieAction = moviesSlice.actions.deleteMovieById(movie.id);
    // dispatch(deleteMovieAction);
  };

  const handleRate = () => {
    // Prompt kann auch null zurückgeben, daher der Fallback auf leeren String
    // über den Nullish Coalescing Operator (??)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
    const userInput = prompt("Neue Bewertung eingeben (0-10):") ?? "";

    // Da userInput ein String ist, müssen wir ihn in eine Zahl umwandeln
    // parseFloat wandelt den String in eine Gleitkommazahl um, wobei dabei
    // ungültige Eingaben zu NaN werden können.
    const newRating = parseFloat(userInput);

    // Mit isNan prüfen wir, ob die Umwandlung erfolgreich war und prüfen
    // zusätzlich, ob die Bewertung im gültigen Bereich liegt.
    if (!isNaN(newRating) && newRating >= 0 && newRating <= 10) {
      // Action-Objekt erstellen und per dispatch an den Store senden
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

  // Wenn wir im Editiermodus sind, rendern wir die MovieItemEdit-Komponente
  // statt der normalen Ansicht.
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
        {/* Mit dem ternären Operator lässt sich schnell die Ansicht des
            Buttons zwischen favorisieren und entfavorisieren wechseln */}
        {movie.isFavorite ? <StarOff size={14} /> : <Star size={14} />}
      </button>
      <button onClick={handleRate}>Rate</button>
      <button onClick={toggleEditMode}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

// Das hier gehört nicht zu redux, sondern ist nur eine lokale
// State-Management-Lösung für den Editiermodus eines Films.
// Wir könnten das auch mit zwei mal useState lösen, aber mit
// useReducer können wir einen einzelnen movie-Zustand verwalten,
// der sowohl den Titel als auch die Beschreibung enthält.
// Der Reducer nimmt den aktuellen Zustand und eine Aktion
// entgegen und gibt den neuen Zustand zurück.
const editMovieReducer = (
  state: Movie,
  // Die Action können wir beliebig definieren, hier nutzen wir
  // ein Objekt mit einem Typ der Veränderung und einem Wert.
  action: {
    type: "setTitle" | "setDescription";
    value: string;
  }
): Movie => {
  switch (action.type) {
    case "setTitle":
      // Hier nutzen wir den Spread-Operator, um den bestehenden
      // Zustand zu kopieren und nur den Titel zu ändern.
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
  // useReducer nutzen wir hier, um den lokalen Zustand des zu
  // editierenden Films zu verwalten. movieState enthält den aktuellen
  // Zustand, dispatch wird genutzt, um Aktionen zu senden, die den
  // Zustand verändern.
  const [movieState, dispatch] = useReducer(editMovieReducer, movie);

  const handleSubmit = () => {
    // Wenn der Nutzer auf "Save" klickt, rufen wir die onSubmit
    // Funktion auf, die von der übergeordneten Komponente
    // (MovieListItem) übergeben wurde, und geben den
    // aktualisierten Filmzustand weiter.
    onSubmit(movieState);
  };

  return (
    <li style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h2>Edit Movie: {movie.title}</h2>
      <input
        type="text"
        value={movieState.title}
        // dispatch hier nutzen wir, um eine Aktion zu senden, die unseren
        // lokalen Zustand von dem useReducer-Hook ändert, funktioniert analog
        // zu redux, ist aber auf diese Komponente beschränkt. Die dispatch
        // Funktion hier stammt nicht aus react-redux, sondern aus dem
        // useReducer-Hook.
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
