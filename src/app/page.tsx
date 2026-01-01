'use client';

import { useEffect, useState } from 'react';
import { Spin, Alert } from 'antd';
import { Movie } from '@/types/movie';
import MovieList from '@/components/MovieList';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!isOnline) {
        setError('No internet connection. Please check your network.');
        setLoading(false);
        return;
      }

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
  }, [isOnline]); // Dependency on isOnline -  refetch when online status change

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Spin size="large" tip="Loading movies..." />
      </div>
    );
  }

  // Error state (including offline)
  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Alert message="Error" description={error} type="error" showIcon className="mb-6" />
      </div>
    );
  }

  // Success state
  return <MovieList movies={movies} />;
}
