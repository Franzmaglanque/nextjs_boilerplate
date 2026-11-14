'use client';

import React from 'react';
import { useAppStore } from '../../store/use-app-store';
import { Search } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Header({
  title = 'Overview',
  subtitle = 'Manage records, monitor operations, and inspect system state',
  actions,
}: HeaderProps) {
  const { searchQuery, setSearchQuery } = useAppStore();

  return (
    <header className="no-print flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-none">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records..."
            className="h-9 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1E5631] focus:bg-white focus:outline-none transition shadow-2xs"
          />
        </div>

        {/* Action Slots */}
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>
    </header>
  );
}
