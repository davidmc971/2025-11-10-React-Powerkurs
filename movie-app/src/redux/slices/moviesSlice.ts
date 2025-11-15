import { createSlice } from "@reduxjs/toolkit";

export type Movie = {
  id: number;
  title: string;
  description: string;
  rating: number;
  isFavorite: boolean;
};

// NewMovie ist wie Movie, aber die id ist optional,
// da sie beim Erstellen eines neuen Films noch nicht
// festgelegt sein muss.
export type NewMovie = Omit<Movie, "id"> & { id?: number };

// Bei der lokalen Speicherung der Filme im
// localStorage nutzen wir diesen Schlüssel.
// Diesen hier als Konstante zu definieren hilft
// Fehler bei der Implementierung oder bei Refactorings
// zu vermeiden.
const LOCAL_STORAGE_KEY = "movies";

const defaultMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    description: "A mind-bending thriller",
    rating: 8.8,
    isFavorite: false,
  },
  {
    id: 2,
    title: "The Matrix",
    description: "A sci-fi classic",
    rating: 8.7,
    isFavorite: false,
  },
  {
    id: 3,
    title: "Interstellar",
    description: "A journey through space and time",
    rating: 8.6,
    isFavorite: false,
  },
  {
    id: 4,
    title: "The Dark Knight",
    description: "A gripping superhero tale",
    rating: 9.0,
    isFavorite: false,
  },
  {
    id: 5,
    title: "Pulp Fiction",
    description: "A cult classic crime film",
    rating: 8.9,
    isFavorite: false,
  },
];

// Der Zustand des Movies-Slices, analog dazu, wie wir zuvor
// die Attribute der Klasse DataHandler definiert hatten.
export type MoviesState = {
  movies: Movie[];
  nextMovieId: number;
}

// Hilfsfunktion, die einen Anfangszustand für unseren Slice initialisiert.
// Hier laden wir die Filme aus dem localStorage, oder nutzen
// defaultMovies, falls keine im localStorage vorhanden sind.
function initilizeState(): MoviesState {
  const storedMovies = localStorage.getItem(LOCAL_STORAGE_KEY);
  const movies: Movie[] = storedMovies
    ? JSON.parse(storedMovies)
    : defaultMovies;

  let nextMovieId = 0;
  for (const movie of movies) {
    nextMovieId = Math.max(nextMovieId, movie.id + 1);
  }

  return {
    movies,
    nextMovieId,
  };
}

// Hilfsfunktion, die die aktuelle Liste der Filme
// im localStorage speichert. Man könnte das automatische
// abspeichern auch in eine eigene Middleware auslagern.
function persistMovies(movies: Movie[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
}

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initilizeState(),
  // Die Reducer definieren die verschiedenen Aktionen,
  // mit denen wir den Movies-State mutieren können.
  reducers: {
    // Ein Reducer erhält immer den aktuellen State und eine
    // Action, die die neuen Daten, unsere Payload, enthält.
    // Hierbei wird kein Typ benötigt, da die Zuordnung automatisch erfolgt.
    // createSlice aus Redux Toolkit erstellt nämlich für jeden
    // Reducer automatisch einen Action-Creator mit dem gleichen
    // Namen, der den Typ in seinem Action-Objekt zurückgibt.
    addMovie: (state, action: { payload: NewMovie }) => {
      const movie = action.payload;
      if (movie.id === undefined) {
        movie.id = state.nextMovieId++;
      } else if (state.movies.some((m) => m.id === movie.id)) {
        console.warn(
          `Movie with id ${movie.id} already exists. Cannot add duplicate.`
        );
        return;
      }
      state.movies.push(movie as Movie);
      state.movies = state.movies.slice();
      persistMovies(state.movies);
    },
    deleteMovieById: (state, action: { payload: number }) => {
      const id = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== id);
      persistMovies(state.movies);
    },
    rateMovie: (state, action: { payload: { id: number; rating: number } }) => {
      const { id, rating } = action.payload;
      const movie = state.movies.find((m) => m.id === id);
      if (movie) {
        movie.rating = rating;
      }
      state.movies = state.movies.slice();
      persistMovies(state.movies);
    },
    updateMovie: (state, action: { payload: Movie }) => {
      const updatedMovie = action.payload;
      const movie = state.movies.find((m) => m.id === updatedMovie.id);
      if (movie) {
        movie.title = updatedMovie.title;
        movie.description = updatedMovie.description;
      }
      state.movies = state.movies.slice();
      persistMovies(state.movies);
    },
    toggleFavorite: (state, action: { payload: number }) => {
      const id = action.payload;
      const movie = state.movies.find((m) => m.id === id);
      if (movie) {
        movie.isFavorite = !movie.isFavorite;
      }
      state.movies = state.movies.slice();
      persistMovies(state.movies);
    },
  },
  // Selektoren sind Hilfsfunktionen, die es uns erlauben,
  // bestimmte Teile des States einfach auszulesen.
  selectors: {
    selectAllMovies: (state: MoviesState) => state.movies,
    selectFavoriteMovies: (state: MoviesState) =>
      state.movies.filter((movie) => movie.isFavorite),
  },
});

// Wir echten den Slice als Default-Export,
// damit er einfach importiert werden kann.
export default moviesSlice;

// Es würde sich auch anbieten, die Actions und Selektoren
// separat zu exportieren, damit sie einfach importiert
// und genutzt werden könnten. Das sieht man häufig in
// der Praxis, ist aber hier nicht zwingend notwendig.
// export const moviesActions = moviesSlice.actions;
// export const moviesSelectors = moviesSlice.selectors;