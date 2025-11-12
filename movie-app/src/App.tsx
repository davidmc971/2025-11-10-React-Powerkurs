import "./App.css";
import MovieList from "./components/MovieList";
import { DataHandler } from "./DataHandler";

const dataHandler = new DataHandler();

function App() {
  return (
    <>
      <h1>Welcome to Movie App</h1>
      <MovieList movies={dataHandler.getMovies()} />
    </>
  );
}

export default App;
