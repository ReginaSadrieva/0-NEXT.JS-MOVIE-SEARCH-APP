// TypeScript interface for Movie data from TMDB API.
export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  // Placeholder for genres; real ones later.
  genre_ids: number[];
}
