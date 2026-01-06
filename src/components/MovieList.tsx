'use client';

import { Row, Col, Tabs, Input, Pagination, Spin, Alert } from 'antd';
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
  onTabChange: (key: string) => void;
  activeKey: string;
  loading: boolean;
  error: string | null;
}

export default function MovieList({
  movies,
  totalResults,
  currentPage,
  pageSize,
  searchQuery,
  onSearch,
  onPageChange,
  onTabChange,
  activeKey,
  loading,
  error,
}: MovieListProps) {
  return (
    <div className="bg-white p-10 md:px-[39px] mx-auto max-w-[1200px] rounded-lg w-full box-border">
      <Tabs
        activeKey={activeKey}
        centered
        tabBarStyle={{ borderBottom: 'none', marginBottom: '19px' }}
        className="mb-0"
        onChange={(key) => onTabChange(key)}
        items={[
          {
            key: 'search',
            label: <span className="font-medium pb-[11px]">Search</span>,
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
                <div className="mt-8 min-h-[300px]">
                  {loading ? (
                    <div className="flex justify-center pt-20">
                      <Spin size="large" />
                    </div>
                  ) : error ? (
                    <Alert title="Error" description={error} type="error" showIcon />
                  ) : movies.length === 0 ? (
                    <Alert
                      title="No results"
                      description={`No movies found for "${searchQuery || 'return'}"`}
                      type="info"
                      showIcon
                    />
                  ) : (
                    <Row gutter={[36, 36]} justify="center">
                      {movies.map((movie) => (
                        <Col key={movie.id} xs={24} md={12} className="flex items-start">
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </Row>
                  )}
                </div>

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
            children: (
              <>
                {/* Movies */}
                <div className="mt-8 min-h-[300px]">
                  {loading ? (
                    <div className="flex justify-center pt-20">
                      <Spin size="large" />
                    </div>
                  ) : error ? (
                    <Alert title="Error" description={error} type="error" showIcon />
                  ) : movies.length === 0 ? (
                    <Alert
                      title="No results"
                      description={`No movies found for "${searchQuery || 'return'}"`}
                      type="info"
                      showIcon
                    />
                  ) : (
                    <Row gutter={[36, 36]} justify="center">
                      {movies.map((movie) => (
                        <Col key={movie.id} xs={24} md={12} className="flex items-start">
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </Row>
                  )}
                </div>

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
        ]}
      />
    </div>
  );
}
