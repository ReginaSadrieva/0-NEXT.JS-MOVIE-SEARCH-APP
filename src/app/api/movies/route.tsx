import { NextResponse } from 'next/server';
import { Movie } from '@/types/movie';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'return'; // Default to 'return' if no query
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
      { cache: 'force-cache' },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    const movies: Movie[] = data.results || [];
    const total = data.total_results || 0;

    return NextResponse.json({
      movies,
      total,
      page,
      pageSize,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching movies' }, { status: 500 });
  }
}
