import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      { cache: 'force-cache' },
    );

    if (!res.ok) throw new Error('Failed to create guest session');

    const data = await res.json();
    return NextResponse.json({ guest_session_id: data.guest_session_id });
  } catch {
    return NextResponse.json({ error: 'Error creating guest session' }, { status: 500 });
  }
}
