'use client';

import { Card, Typography, Tag, Space, Progress, Rate } from 'antd';
import Image from 'next/image';
import { format } from 'date-fns';
import { truncateDescription } from '@/utils/truncateDescription';
import { Movie } from '@/types/movie';
import { useAppContext } from '@/context/AppContext';

type RatedMovie = Movie & {
  rating?: number;
};

const { Title, Text } = Typography;

interface MovieCardProps {
  movie: RatedMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { genres, guestSessionId, ratingsMap, setRating } = useAppContext();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseDate = movie.release_date
    ? format(new Date(movie.release_date), 'MMMM d, yyyy')
    : 'N/A';

  const movieGenres = movie.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean) as string[];

  const rating = movie.vote_average || 0;
  const ratingColor =
    rating <= 3 ? '#E90000' : rating <= 5 ? '#E97E00' : rating <= 7 ? '#E9D100' : '#66E900';

  const userRating = typeof movie.rating === 'number' ? movie.rating : ratingsMap[movie.id];

  return (
    <Card
      hoverable
      styles={{ body: { padding: 0 } }}
      className="w-full bg-white"
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
    >
      <div className="flex gap-[20px] relative min-h-[280px]">
        {/* Poster */}
        <div className="shrink-0">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              width={183}
              height={281}
              className="h-[281px] w-[183px] object-cover"
            />
          ) : (
            <div className="flex h-[281px] w-[183px] items-center justify-center bg-[#f0f0f0]">
              No Poster
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-[16px] py-[16px] pr-[20px] relative">
          {/* Title + Rating circle */}
          <div className="flex items-start justify-between gap-4">
            <Title level={5} className="!m-0 !text-black max-w-[220px]">
              {movie.title}
            </Title>

            <Progress
              type="circle"
              percent={rating * 10}
              format={() => rating.toFixed(1)}
              size={40}
              strokeColor={ratingColor}
              railColor="#d9d9d9"
            />
          </div>

          {/* Date */}
          <Text className="!text-[12px] !text-[#827e7e] mt-[4px]">{releaseDate}</Text>

          {/* Genres */}
          <Space wrap className="mt-[6px]">
            {movieGenres.map((genre, i) => (
              <Tag key={i}>{genre}</Tag>
            ))}
          </Space>

          {/* Description */}
          <Text className="!mt-[10px] !text-[12px] !leading-[1.5] !text-black pr-[10px]">
            {truncateDescription(movie.overview || '', 200)}
          </Text>

          {/* ⭐ Stars — ABSOLUTE BOTTOM */}
          <div className="absolute bottom-[16px] left-[16px]">
            <Rate
              allowHalf
              count={10}
              value={userRating}
              onChange={async (value) => {
                if (!guestSessionId || value == null) return;

                await fetch(`/api/rating?guest_session_id=${guestSessionId}&movie_id=${movie.id}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ value }),
                });

                setRating(movie.id, value);
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
