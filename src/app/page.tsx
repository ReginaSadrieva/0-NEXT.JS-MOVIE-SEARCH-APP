'use client'; // Make this a Client Component

import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import MovieList from '@/components/MovieList';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies'); // Fetch from internal API route

        if (!response.ok) {
          throw new Error('Failed to load movies');
        }

        const data = await response.json();
        setMovies(data.movies || []);
      } catch {
        setError('Unable to load movies. Please try again later.');
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return <div>{error}</div>; // Fallback UI without crashing the page
  }

  return <MovieList movies={movies} />;
}
