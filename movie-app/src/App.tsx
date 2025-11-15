import { useEffect, useRef } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import { Link, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moviesSlice, {
  type NewMovie,
} from "./redux/slices/moviesSlice";

function App() {
  // Beispiel für useRef - Zeichnen auf ein Canvas-Element:
  // Mit Hilfe der ref können wir auf das Canvas-Element zugreifen und darauf zeichnen.
  // Dabei können wir direkt auf die DOM-Elemente zugreifen und diese
  // über die vanilla JavaScript Canvas API manipulieren.
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mittels useEffect zeichnen wir ein Rechteck auf das Canvas,
  // sobald das Canvas-Element gemountet wurde.
  // Die Funktion im useEffect wird nur einmal ausgeführt,
  // da das Abhängigkeits-Array leer ist.
  // Das bedeutet, dass die App-Funktion einmal ausgeführt und gerendert wird
  // und daraufhin die Funktion im useEffect-Hook ausgeführt wird, mit der
  // wir den Canvas manipulieren.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  // Redux: Alle Filme aus dem Store selektieren
  // useSelector kommt aus react-redux und wir übergeben eine Selector-Funktion
  // aus dem Slice, auf den wir zugreifen möchten, hier also moviesSlice.
  // Verändert sich dieser State im moviesSlice, wird die App-Komponente
  // erneut gerendert.
  const movies = useSelector(moviesSlice.selectors.selectAllMovies);

  // Redux: useDispatch aus react-redux ermöglicht es uns,
  // Aktionen an den Redux-Store zu senden.
  const dispatch = useDispatch();

  const handleAddMovie = () => {
    const newMovie = {
      title: "New Movie",
      description: "A newly added movie",
      rating: 0,
      isFavorite: false,
    };

    // Senden der addMovie-Aktion an den Redux-Store
    // Wir rufen die addMovie-Aktion aus dem moviesSlice auf, welche
    // uns ein Action-Objekt zurückgibt, das wir dann an dispatch übergeben.
    dispatch(moviesSlice.actions.addMovie(newMovie));
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie", {
      headers: {
        // Der API-Schlüssel wird aus den Umgebungsvariablen geladen, wobei
        // der Präfix VITE_ notwendig ist, damit Vite die Variable zur Laufzeit
        // im Browser verfügbar macht. Vorsicht: Niemals geheime Schlüssel im
        // Frontend-Code verwenden, sofern diese nicht öffentlich sein dürfen!
        // Man kann diesen Schlüssel aus der Website extrahieren.
        Authorization: "Bearer " + import.meta.env.VITE_MOVIEDB_API_KEY,
      },
    })
      .then((response) => response.json())
      .then(
        // Hier typisieren wir nur den Teil der Daten, den wir tatsächlich
        // verwenden, auch wenn die API noch viel mehr Daten zurückliefert.
        // Diese extra Daten ignorieren wir einfach, auch wenn sie im
        // tatsächlichen API-Response vorhanden sind.
        (data: {
          results: {
            id: number;
            title: string;
            overview: string;
            vote_average: number;
          }[];
        }) => {
          console.log("Fetched movies from external API:", data);

          // Die geladenen Filme dem Redux-Store hinzufügen, nachdem wir
          // sie in das Format umgewandelt haben, das wir im Store verwenden.
          data.results.forEach((movie) => {
            const newMovie: NewMovie = {
              title: movie.title,
              description: movie.overview,
              rating: movie.vote_average,
              isFavorite: false,
            };
            dispatch(moviesSlice.actions.addMovie(newMovie));
          });
        }
      );
  }, [dispatch]);

  return (
    <>
      <canvas height={32} ref={canvasRef} />
      <h1>Welcome to Movie App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Movies</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleAddMovie}>Add Movie</button>
      {/* Navigation per react-router, der zugehörige BrowserRouter
          befindet sich in main.tsx */}
      <Routes>
        <Route path="/" element={<MovieList movies={movies} />} />
        <Route
          path="/favorites"
          element={<MovieList movies={movies} showOnlyFavorites />}
        />
      </Routes>
    </>
  );
}

export default App;
