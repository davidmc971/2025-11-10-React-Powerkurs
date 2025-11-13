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

  return (
    <>
      <h1>Welcome to Movie App</h1>
      <MovieList
        movies={movies}
        dataHandler={dataHandler}
        updateMovies={updateMovies}
      />
    </>
  );
}

export default App;
