import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import { DataHandler } from "./DataHandler";

const dataHandler = new DataHandler();

function App() {
  const [movies, setMovies] = useState(dataHandler.getMovies());

  const updateMovies = () => {
    setMovies(dataHandler.getMovies());
  };

  const handleAddMovie = () => {
    const newMovie = {
      title: "New Movie",
      description: "A newly added movie",
      rating: 0,
      isFavorite: false,
    };
    dataHandler.addMovie(newMovie);
    updateMovies()
  }

  return (
    <>
      <h1>Welcome to Movie App</h1>
      <button onClick={handleAddMovie}>Add Movie</button>
      <MovieList
        movies={movies}
        dataHandler={dataHandler}
        updateMovies={updateMovies}
      />
    </>
  );
}

export default App;
