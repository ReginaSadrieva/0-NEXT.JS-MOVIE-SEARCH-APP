import { Movie } from '@/types/movie'; // Type for movies.
import MovieList from '@/components/MovieList'; // Client UI component.

// Async Server Component: Fetches data on server-side.
export default async function Home() {
  // Fetch movies from TMDB API using keyword 'return' (as per task; probably search term).
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=return`,
    { cache: 'force-cache' }, // Next.js caching for static data.
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  const movies: Movie[] = data.results || [];

  // Pass data to Client Component for rendering.
  return <MovieList movies={movies} />;
}
