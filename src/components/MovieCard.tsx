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
      style={{
        width: '100%',
        borderRadius: 0,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
        {/* Poster - with no margins */}
        <div style={{ flexShrink: 0 }}>
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              width={183}
              height={281}
              style={{
                width: 183,
                height: 281,
                objectFit: 'cover',
                display: 'block',
                margin: 0,
                padding: 0,
              }}
              priority={false}
            />
          ) : (
            <div
              style={{
                width: 183,
                height: 281,
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0,
                padding: 0,
              }}
            >
              No Poster
            </div>
          )}
        </div>

        {/* Right part - with normal margins */}
        <div
          style={{
            flex: 1,
            padding: '16px 16px 16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 7,
          }}
        >
          <Title level={5} style={{ margin: 0, color: '#000000' }}>
            {movie.title}
          </Title>

          <Text style={{ fontSize: 12, color: '#827e7e' }}>{releaseDate}</Text>

          <Space size={[0, 8]} wrap>
            <Tag
              style={{
                backgroundColor: '#fafafa',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: 12,
                padding: '0 7px',
                marginRight: 8,
              }}
            >
              Action
            </Tag>
            <Tag
              style={{
                backgroundColor: '#fafafa',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: 12,
                padding: '0 7px',
                marginRight: 8,
              }}
            >
              Drama
            </Tag>
          </Space>

          <Text style={{ marginTop: 7, fontSize: 12, lineHeight: 1.5, color: '#000000' }}>
            {truncateDescription(movie.overview || '', 350)}
          </Text>
        </div>
      </div>
    </Card>
  );
}
