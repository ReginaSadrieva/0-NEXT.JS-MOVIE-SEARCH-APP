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
      className="w-full rounded-none bg-white"
      style={{
        borderRadius: 0,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="flex flex-row gap-[20px] relative">
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

        <div className="flex flex-1 flex-col gap-[7px] px-[16px] py-[16px] pl-[20px] justify-between h-full">
          <div className="absolute top-4 right-4">
            <Progress
              type="circle"
              percent={rating * 10}
              format={() => rating.toFixed(1)}
              size={50}
              strokeColor={ratingColor}
              railColor="#d9d9d9"
            />
          </div>

          <Title level={5} className="max-w-[200px] !m-0 !text-black">
            {movie.title}
          </Title>

          <Text className="!text-[12px] !text-[#827e7e]">{releaseDate}</Text>

          <Space wrap>
            {movieGenres.map((genre, i) => (
              <Tag key={i}>{genre}</Tag>
            ))}
          </Space>

          <Text className="!mt-[7px] !text-[12px] !leading-[1.5] !text-black">
            {truncateDescription(movie.overview || '', 200)}
          </Text>

          <Rate
            allowHalf
            value={userRating}
            className="mt-auto"
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
    </Card>
  );
}
