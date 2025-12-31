// Server-side API route for fetching movies

import { NextResponse } from 'next/server';
import { Movie } from '@/types/movie'; // Type for movies

export async function GET() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=return`,
      { cache: 'force-cache' }, // Next.js caching for static data
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    const movies: Movie[] = data.results || [];

    return NextResponse.json({ movies }); // Return JSON with movies
  } catch {
    return NextResponse.json({ error: 'Error fetching movies' }, { status: 500 }); // Handle error, return JSON
  }
}
