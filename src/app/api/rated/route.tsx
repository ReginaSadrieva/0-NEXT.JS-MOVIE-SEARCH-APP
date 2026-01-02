import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guestSessionId = searchParams.get('guest_session_id');
  const page = parseInt(searchParams.get('page') || '1');

  if (!guestSessionId)
    return NextResponse.json({ error: 'Guest session required' }, { status: 400 });

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
      { cache: 'force-cache' },
    );

    if (!res.ok) throw new Error('Failed to fetch rated movies');

    const data = await res.json();
    return NextResponse.json({
      movies: data.results || [],
      total: data.total_results || 0,
      page: data.page || 1,
    });
  } catch {
    return NextResponse.json({ error: 'Error fetching rated movies' }, { status: 500 });
  }
}
