export type Movie = {
  id: number;
  title: string;
  description: string;
  rating: number;
  isFavorite: boolean;
};

type NewMovie = Omit<Movie, "id"> & { id?: number };

export class DataHandler {
  movies: Movie[];
  nextMovieId: number;

  constructor() {
    // Initialize with some dummy data
    this.movies = [
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
    this.nextMovieId = 6;
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  deleteMovieById(id: number) {
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  addMovie(movie: NewMovie) {
    if (movie.id === undefined) {
      movie.id = this.nextMovieId++;
    }
    this.movies.push(movie as Movie);
    this.movies = this.movies.slice();
  }

  rateMovie(id: number, rating: number) {
    const movie = this.movies.find((m) => m.id === id);
    if (movie) {
      movie.rating = rating;
    }
    this.movies = this.movies.slice();

    // Alternativ:
    // this.movies = this.movies.map((movie) =>
    //   movie.id === id ? { ...movie, rating } : movie
    // );
  }

  updateMovie(updatedMovie: Movie) {
    const movie = this.movies.find((m) => m.id === updatedMovie.id);
    if (movie) {
      movie.title = updatedMovie.title;
      movie.description = updatedMovie.description;
    }
    this.movies = this.movies.slice();

    // Alternativ:
    // this.movies = this.movies.map((movie) =>
    //   movie.id === updatedMovie.id ? updatedMovie : movie
    // );
  }

  toggleFavorite(id: number) {
    const movie = this.movies.find((m) => m.id === id);
    if (movie) {
      movie.isFavorite = !movie.isFavorite;
    }
    this.movies = this.movies.slice();
  }
}
