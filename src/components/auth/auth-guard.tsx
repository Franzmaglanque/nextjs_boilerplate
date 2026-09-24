'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/use-auth-store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, token } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const isAuthed = Boolean(isAuthenticated && token);
    const isLoginPage = pathname === '/login';

    if (!isAuthed && !isLoginPage) {
      router.replace('/login');
    } else if (isAuthed && isLoginPage) {
      router.replace('/dispatch');
    }
  }, [isMounted, isAuthenticated, token, pathname, router]);

  if (!isMounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1E5631] border-t-transparent" />
      </div>
    );
  }

  const isAuthed = Boolean(isAuthenticated && token);
  const isLoginPage = pathname === '/login';

  if (!isAuthed && !isLoginPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1E5631] border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
