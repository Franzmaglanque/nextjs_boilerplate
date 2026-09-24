'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/layout/sidebar';
import Header from '../../components/layout/header';
import { triggerFtpSync } from '../../services/dispatch-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FileSpreadsheet,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FolderSync,
  Clock,
  HardDrive,
  FileCheck,
} from 'lucide-react';

export default function FtpIngestionPage() {
  const queryClient = useQueryClient();
  const [syncHistory, setSyncHistory] = useState<any[]>([]);

  const syncMutation = useMutation({
    mutationFn: triggerFtpSync,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dispatches'] });
      setSyncHistory((prev) => [
        {
          timestamp: new Date().toLocaleTimeString(),
          success: true,
          ...data,
        },
        ...prev,
      ]);
    },
    onError: (err: any) => {
      setSyncHistory((prev) => [
        {
          timestamp: new Date().toLocaleTimeString(),
          success: false,
          error: err.message,
        },
        ...prev,
      ]);
    },
  });

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Header Title Banner */}
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E5631] text-[#F4B41A] shadow">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">EDI / FTP Ingestion Monitor</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Automated AS/400 flat-file purchase order parser and background poller
                  </p>
                </div>
              </div>

              <button
                onClick={() => syncMutation.mutate()}
                disabled={syncMutation.isPending}
                className="flex items-center space-x-2 rounded-xl bg-[#1E5631] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#143d22] disabled:opacity-50 transition shadow"
              >
                <RefreshCw className={`h-4 w-4 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
                <span>{syncMutation.isPending ? 'Connecting to FTP...' : 'Sync FTP Now'}</span>
              </button>
            </div>

            {/* FTP Architecture Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase">
                  <Clock className="h-4 w-4 text-[#1E5631]" />
                  <span>Polling Interval</span>
                </div>
                <div className="mt-2 text-xl font-black text-slate-800">Every 15 Mins</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Node-cron mutex locked</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase">
                  <HardDrive className="h-4 w-4 text-[#1E5631]" />
                  <span>Protocol & Host</span>
                </div>
                <div className="mt-2 text-xl font-black text-slate-800">IBM i (AS/400)</div>
                <div className="text-[11px] text-slate-500 mt-0.5">SITE NAMEFMT 1 enabled</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase">
                  <FolderSync className="h-4 w-4 text-[#1E5631]" />
                  <span>Format Support</span>
                </div>
                <div className="mt-2 text-xl font-black text-slate-800">CSV & TSV</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Auto-detects comma / tab</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase">
                  <FileCheck className="h-4 w-4 text-[#1E5631]" />
                  <span>File Lifecycle</span>
                </div>
                <div className="mt-2 text-xl font-black text-slate-800">Inbox $\rightarrow$ Archive</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Prevents duplicate imports</div>
              </div>
            </div>

            {/* Sync Activity & Audit Log */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Manual Sync Trigger Results</h3>

              {syncHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 text-xs">
                  <FolderSync className="h-8 w-8 mb-2 text-slate-300" />
                  <div>No manual sync operations triggered during this session.</div>
                  <div className="mt-1 text-slate-400">
                    Click &quot;Sync FTP Now&quot; above to poll the incoming folder on-demand.
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {syncHistory.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start justify-between rounded-lg p-3.5 text-xs border ${
                        entry.success
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50/50 border-rose-200 text-rose-900'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {entry.success ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-rose-600 mt-0.5" />
                        )}
                        <div>
                          <div className="font-bold">
                            {entry.success ? 'FTP Poller Run Completed' : 'FTP Poller Run Failed'}
                          </div>
                          {entry.success ? (
                            <div className="text-slate-600 mt-1 space-x-3">
                              <span>Files Processed: <strong>{entry.processedFiles}</strong></span>
                              <span>•</span>
                              <span>Imported POs: <strong className="text-emerald-700">{entry.importedPOs}</strong></span>
                              <span>•</span>
                              <span>Skipped Existing: <strong>{entry.skippedPOs}</strong></span>
                            </div>
                          ) : (
                            <div className="text-rose-700 mt-1">{entry.error}</div>
                          )}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">{entry.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
