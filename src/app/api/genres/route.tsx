import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      { cache: 'force-cache' },
    );

    if (!res.ok) throw new Error('Failed to fetch genres');

    const data = await res.json();
    return NextResponse.json({ genres: data.genres || [] });
  } catch {
    return NextResponse.json({ error: 'Error fetching genres' }, { status: 500 });
  }
}
