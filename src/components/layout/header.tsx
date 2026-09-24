'use client';

import React from 'react';
import { useAppStore } from '../../store/use-app-store';
import { triggerFtpSync } from '../../services/dispatch-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RefreshCw, Search, FileDown } from 'lucide-react';

export default function Header() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const queryClient = useQueryClient();

  const syncMutation = useMutation({
    mutationFn: triggerFtpSync,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dispatches'] });
      alert(
        `FTP Sync Successful!\nProcessed: ${data.processedFiles} files\nImported: ${data.importedPOs} POs\nSkipped: ${data.skippedPOs} POs`
      );
    },
    onError: (err: any) => {
      alert(`FTP Sync Failed: ${err.message}`);
    },
  });

  return (
    <header className="no-print flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-none">PO Dispatch Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review fulfilled store shipments and print official Delivery Receipts (DR)
          </p>
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
            placeholder="Search PO#, Store, Location..."
            className="h-9 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 focus:border-[#1E5631] focus:bg-white focus:outline-none"
          />
        </div>

        {/* Sync FTP Button */}
        <button
          onClick={() => syncMutation.mutate()}
          disabled={syncMutation.isPending}
          className="flex h-9 items-center space-x-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 transition shadow-sm"
          title="Poll FTP server for new PO CSV files"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${syncMutation.isPending ? 'animate-spin text-[#1E5631]' : ''}`} />
          <span>{syncMutation.isPending ? 'Syncing...' : 'Sync FTP'}</span>
        </button>
      </div>
    </header>
  );
}
