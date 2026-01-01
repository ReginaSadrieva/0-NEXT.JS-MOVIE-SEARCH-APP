'use client';

import { useEffect, useState } from 'react';
import { Spin, Alert } from 'antd';
import { debounce } from 'lodash';
import { Movie } from '@/types/movie';
import MovieList from '@/components/MovieList';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 10;
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
    const debouncedFetch = debounce(async (query: string, page: number) => {
      setLoading(true);
      setError(null);

      if (!isOnline) {
        setError('No internet connection. Please check your network.');
        setLoading(false);
        return;
      }

      try {
        const url = `/api/movies?query=${encodeURIComponent(query || 'return')}&page=${page}&pageSize=${pageSize}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to load movies');
        }

        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setMovies(data.movies || []);
          setTotalResults(data.total || 0);
          setCurrentPage(data.page || 1);
        }
      } catch {
        setError('Unable to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 500);

    debouncedFetch(searchQuery, currentPage);

    // Cleanup debounce on unmount or deps change
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchQuery, currentPage, isOnline]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Spin size="large" tip="Loading movies...">
          <div className="min-h-[100px]" />
        </Spin>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Alert message="Error" description={error} type="error" showIcon className="mb-6" />
      </div>
    );
  }

  if (movies.length === 0 && !loading && !error) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <Alert
          title="No Results"
          description={`No movies found for "${searchQuery || 'return'}"`}
          type="info"
          showIcon
          className="mb-6"
        />
      </div>
    );
  }

  return (
    <MovieList
      movies={movies}
      totalResults={totalResults}
      currentPage={currentPage}
      pageSize={pageSize}
      searchQuery={searchQuery}
      onSearch={handleSearch}
      onPageChange={handlePageChange}
    />
  );
}
