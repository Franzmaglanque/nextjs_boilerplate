import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthUserData {
  id: number | string;
  username: string;
  fullName: string;
  role?: string;
  department?: string;
  email?: string;
  [key: string]: unknown;
}

interface AuthState {
  token: string | null;
  user: AuthUserData | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: AuthUserData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'app-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
