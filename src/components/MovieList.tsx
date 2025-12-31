'use client';

import { Row, Col } from 'antd';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

interface MovieListProps {
  movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="bg-white px-[39px] py-[40px] mx-auto max-w-[1200px] w-full box-border">
      <Row gutter={[36, 36]} justify="center" align="top">
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} md={12} className="flex items-start">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
