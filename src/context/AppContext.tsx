'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Genre {
  id: number;
  name: string;
}

interface RatingsMap {
  [movieId: number]: number;
}

interface AppContextType {
  genres: Genre[];
  guestSessionId: string | null;
  ratingsMap: RatingsMap;
  setRating: (movieId: number, rating: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [guestSessionId, setGuestSessionId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('guestSessionId');
    }
    return null;
  });

  const [ratingsMap, setRatingsMap] = useState<Record<number, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ratingsMap');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const setRating = (movieId: number, rating: number) => {
    setRatingsMap((prev) => {
      const next = { ...prev, [movieId]: rating };
      localStorage.setItem('ratingsMap', JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch('/api/genres');
      const data = await res.json();
      if (data.genres) setGenres(data.genres);
    };

    const createGuestSession = async () => {
      if (guestSessionId) return;

      const res = await fetch('/api/guest-session');
      const data = await res.json();
      if (data.guest_session_id) {
        setGuestSessionId(data.guest_session_id);
        localStorage.setItem('guestSessionId', data.guest_session_id);
      }
    };

    fetchGenres();
    createGuestSession();
  }, [guestSessionId]);

  return (
    <AppContext.Provider value={{ genres, guestSessionId, ratingsMap, setRating }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
