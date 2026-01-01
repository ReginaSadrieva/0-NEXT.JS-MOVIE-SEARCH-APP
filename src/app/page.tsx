'use client';

import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import MovieList from '@/components/MovieList';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/movies');

        if (!response.ok) {
          throw new Error('Failed to load movies');
        }

        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setMovies(data.movies || []);
        }
      } catch {
        setError('Unable to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-gray-600">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }

  return <MovieList movies={movies} />;
}
