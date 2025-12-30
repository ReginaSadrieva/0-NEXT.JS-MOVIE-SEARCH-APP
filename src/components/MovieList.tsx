'use client';

import { Row, Col } from 'antd';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

interface MovieListProps {
  movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '40px 39px',
        margin: '0 auto',
        maxWidth: 1200,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Row gutter={[36, 36]} justify="center" align="top">
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} md={12} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
