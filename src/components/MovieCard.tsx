'use client';

import { Card, Typography, Tag, Space } from 'antd';
import Image from 'next/image';
import { format } from 'date-fns';
import { truncateDescription } from '@/utils/truncateDescription';
import { Movie } from '@/types/movie';

const { Title, Text } = Typography;

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseDate = movie.release_date
    ? format(new Date(movie.release_date), 'MMMM d, yyyy')
    : 'N/A';

  return (
    <Card
      hoverable
      styles={{ body: { padding: 0 } }}
      className="w-full rounded-none bg-white"
      style={{
        borderRadius: 0,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* layout — tailwind, without replacing antd */}
      <div className="flex flex-row gap-[20px]">
        {/* Poster */}
        <div className="shrink-0">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              width={183}
              height={281}
              className="block h-[281px] w-[183px] object-cover"
            />
          ) : (
            <div className="flex h-[281px] w-[183px] items-center justify-center bg-[#f0f0f0]">
              No Poster
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-[7px] px-[16px] py-[16px] pl-[20px]">
          {/* Title —  Typography */}
          <Title level={5} className="!m-0 !text-black">
            {movie.title}
          </Title>

          {/* Date —  Typography */}
          <Text className="!text-[12px] !text-[#827e7e]">{releaseDate}</Text>

          {/* Tags */}
          <Space wrap>
            <Tag style={{ marginRight: 8 }}>Action</Tag>
            <Tag style={{ marginRight: 8 }}>Drama</Tag>
          </Space>
          {/* Description — Typography */}
          <Text className="!mt-[7px] !text-[12px] !leading-[1.5] !text-black">
            {truncateDescription(movie.overview || '', 350)}
          </Text>
        </div>
      </div>
    </Card>
  );
}
