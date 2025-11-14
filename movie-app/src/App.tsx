import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import { DataHandler } from "./DataHandler";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  const dataHandlerRef = useRef(new DataHandler());
  const dataHandler = dataHandlerRef.current;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  const [movies, setMovies] = useState(dataHandler.getMovies());

  const updateMovies = useCallback(() => {
    setMovies(dataHandler.getMovies());
  }, [dataHandler]);

  const handleAddMovie = () => {
    const newMovie = {
      title: "New Movie",
      description: "A newly added movie",
      rating: 0,
      isFavorite: false,
    };
    dataHandler.addMovie(newMovie);
    updateMovies();
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie", {
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_MOVIEDB_API_KEY,
      },
    })
      .then((response) => response.json())
      .then(
        (data: {
          results: {
            id: number;
            title: string;
            overview: string;
            vote_average: number;
          }[];
        }) => {
          console.log("Fetched movies from external API:", data);

          data.results.forEach((movie) => {
            dataHandler.addMovie({
              title: movie.title,
              description: movie.overview,
              rating: movie.vote_average,
              isFavorite: false,
            });
          });
          updateMovies();
        }
      );
  }, [dataHandler, updateMovies]);

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
      <Routes>
        <Route
          path="/"
          element={
            <MovieList
              movies={movies}
              dataHandler={dataHandler}
              updateMovies={updateMovies}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <MovieList
              movies={movies}
              dataHandler={dataHandler}
              updateMovies={updateMovies}
              showOnlyFavorites
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
