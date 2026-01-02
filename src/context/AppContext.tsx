// Context for genres and guest session ID
'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Genre {
  id: number;
  name: string;
}

interface AppContextType {
  genres: Genre[];
  guestSessionId: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch genres on app start
    const fetchGenres = async () => {
      try {
        const res = await fetch('/api/genres');
        const data = await res.json();
        if (data.genres) setGenres(data.genres);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };

    // Create guest session on app start
    const createGuestSession = async () => {
      try {
        const res = await fetch('/api/guest-session');
        const data = await res.json();
        if (data.guest_session_id) setGuestSessionId(data.guest_session_id);
      } catch (err) {
        console.error('Failed to create guest session:', err);
      }
    };

    fetchGenres();
    createGuestSession();
  }, []);

  return <AppContext.Provider value={{ genres, guestSessionId }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
