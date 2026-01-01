'use client';

import { Row, Col, Tabs, Input, Pagination } from 'antd';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

interface MovieListProps {
  movies: Movie[];
  totalResults: number;
  currentPage: number;
  pageSize: number;
  searchQuery: string;
  onSearch: (value: string) => void;
  onPageChange: (page: number) => void;
}

export default function MovieList({
  movies,
  totalResults,
  currentPage,
  pageSize,
  searchQuery,
  onSearch,
  onPageChange,
}: MovieListProps) {
  return (
    <div className="bg-white p-10 md:px-[39px] mx-auto max-w-[1200px] rounded-lg w-full box-border">
      <Tabs
        activeKey="search"
        centered
        tabBarStyle={{ borderBottom: 'none', marginBottom: '19px' }}
        className="mb-0"
        items={[
          {
            key: 'search',
            label: (
              <span className="text-blue-600 font-medium text-lg pb-[11px] border-b-2 border-blue-600">
                Search
              </span>
            ),
            children: (
              <>
                {/* Search field */}
                <div className="mt-[19px] max-w-[1200px] mx-auto">
                  <Input
                    placeholder="Type to search..."
                    allowClear
                    size="large"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Movies */}
                <Row gutter={[36, 36]} justify="center" className="mt-8">
                  {movies.map((movie) => (
                    <Col key={movie.id} xs={24} md={12} className="flex items-start">
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {totalResults > pageSize && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={totalResults}
                      onChange={onPageChange}
                      showSizeChanger={false}
                    />
                  </div>
                )}
              </>
            ),
          },
          {
            key: 'rated',
            label: 'Rated',
            disabled: true,
          },
        ]}
      />
    </div>
  );
}
