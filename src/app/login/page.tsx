'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/use-auth-store';
import { apiClient } from '../../lib/api-client';
import { Truck, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res: any = await apiClient.post('/api/auth/login', {
        username: username.trim(),
        password: password.trim(),
      });

      // Backend returns formatResponse: { status, message, data: { token, user } }
      const authData = res.data;
      if (authData?.token && authData?.user) {
        setAuth(authData.token, authData.user);
        router.replace('/dispatch');
      } else {
        throw new Error('Invalid authentication response from server');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f1f5f9] p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        {/* Header Branding */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E5631] text-[#F4B41A] shadow-md">
            <Truck className="h-8 w-8" />
          </div>
          <h1 className="mt-4 text-xl font-black tracking-tight text-slate-900">
            RCI MEAT YIELD SYSTEM
          </h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#1E5631]">
            Puregold Dispatch & Ingestion CMS
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-6 flex items-center space-x-2 rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Username
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. encoder_rci"
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 focus:border-[#1E5631] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 focus:border-[#1E5631] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex w-full items-center justify-center space-x-2 rounded-lg bg-[#1E5631] py-3 text-sm font-bold text-white hover:bg-[#143d22] transition disabled:opacity-50 shadow-md"
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            {!isLoading && <ArrowRight className="h-4 w-4 text-[#F4B41A]" />}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 border-t border-slate-100 pt-4 text-center text-[11px] text-slate-400">
          Royal Cargo Inc. Cold Storage & Processing Logistics
        </div>
      </div>
    </div>
  );
}
