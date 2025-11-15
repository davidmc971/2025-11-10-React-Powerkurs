import { createSlice } from "@reduxjs/toolkit";

export type Movie = {
  id: number;
  title: string;
  description: string;
  rating: number;
  isFavorite: boolean;
};

export type NewMovie = Omit<Movie, "id"> & { id?: number };

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

export type MoviesState = {
  movies: Movie[];
  nextMovieId: number;
}

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

function persistMovies(movies: Movie[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
}

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initilizeState(),
  reducers: {
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
  selectors: {
    selectAllMovies: (state: MoviesState) => state.movies,
    selectFavoriteMovies: (state: MoviesState) =>
      state.movies.filter((movie) => movie.isFavorite),
  },
});

export default moviesSlice;
