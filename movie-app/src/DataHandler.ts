export type Movie = {
  id: number;
  title: string;
  description: string;
  rating: number;
};

export class DataHandler {
  movies: Movie[];

  constructor() {
    // Initialize with some dummy data
    this.movies = [
      {
        id: 1,
        title: "Inception",
        description: "A mind-bending thriller",
        rating: 8.8,
      },
      {
        id: 2,
        title: "The Matrix",
        description: "A sci-fi classic",
        rating: 8.7,
      },
      {
        id: 3,
        title: "Interstellar",
        description: "A journey through space and time",
        rating: 8.6,
      },
      {
        id: 4,
        title: "The Dark Knight",
        description: "A gripping superhero tale",
        rating: 9.0,
      },
      {
        id: 5,
        title: "Pulp Fiction",
        description: "A cult classic crime film",
        rating: 8.9,
      }
    ];
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  deleteMovieById(id: number): void {
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }
}
