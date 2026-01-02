// Proxy for POST rating to TMDB using guest session

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const guestSessionId = searchParams.get('guest_session_id');
  const movieId = searchParams.get('movie_id');

  if (!guestSessionId || !movieId) {
    return NextResponse.json({ error: 'Missing guest_session_id or movie_id' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const value = body.value;

    if (!value || value < 0.5 || value > 10) {
      return NextResponse.json({ error: 'Invalid rating value' }, { status: 400 });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      },
    );

    if (!response.ok) {
      const errData = await response.json();
      return NextResponse.json(
        { error: errData.status_message || 'Failed to rate movie' },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Server error while rating movie' }, { status: 500 });
  }
}
