import { useEffect, useRef } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import { Link, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moviesSlice from "./redux/slices/moviesSlice";

function App() {
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

  const movies = useSelector(moviesSlice.selectors.selectAllMovies);
  const dispatch = useDispatch();

  const handleAddMovie = () => {
    const newMovie = {
      title: "New Movie",
      description: "A newly added movie",
      rating: 0,
      isFavorite: false,
    };

    dispatch(moviesSlice.actions.addMovie(newMovie));
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
            const newMovie = {
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
      <Routes>
        <Route
          path="/"
          element={
            <MovieList
              movies={movies}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <MovieList
              movies={movies}
              showOnlyFavorites
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
