import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserRole = 'STAFF' | 'ENCODER' | 'QA';
export type UserCompany = 'Royal Cargo Inc.' | 'Puregold Price Club Inc.';

export interface AuthUserData {
  id: number;
  username: string;
  fullName: string;
  role: UserRole;
  company: UserCompany;
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
      name: 'rci-cms-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
