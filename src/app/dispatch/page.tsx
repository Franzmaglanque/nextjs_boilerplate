'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/layout/sidebar';
import Header from '../../components/layout/header';
import DispatchTable from '../../components/dispatch/dispatch-table';
import DispatchPrintSlip from '../../components/dispatch/dispatch-print-slip';
import { fetchDispatchById } from '../../services/dispatch-service';
import type { PurchaseOrder } from '../../types/dispatch';

export default function DispatchPage() {
  const [selectedPo, setSelectedPo] = useState<PurchaseOrder | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const handleSelectPo = async (poSummary: PurchaseOrder) => {
    setIsLoadingDetail(true);
    try {
      // Fetch full line items for accurate DR printing
      const detailed = await fetchDispatchById(poSummary.id);
      setSelectedPo(detailed);
    } catch {
      // Fallback to summary PO if detailed fetch has transient network issue
      setSelectedPo(poSummary);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            {/* Quick KPI Overview Bar */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Ready to Print
                </div>
                <div className="mt-1 text-2xl font-black text-[#1E5631]">Dispatched Slips</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Completed warehouse floor loading
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  AS/400 Flat-File Sync
                </div>
                <div className="mt-1 text-2xl font-black text-slate-800">EDI FTP Ingestion</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Automated background poller active
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Facility Standard
                </div>
                <div className="mt-1 text-2xl font-black text-slate-800">Cold Chain (RCI)</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Full custody & store receiving sign-off
                </div>
              </div>
            </div>

            {/* Master Dispatches Table */}
            <DispatchTable onSelectPo={handleSelectPo} />
          </div>
        </main>
      </div>

      {/* Detailed Delivery Receipt Printable Modal */}
      {selectedPo && (
        <DispatchPrintSlip
          po={selectedPo}
          onClose={() => setSelectedPo(null)}
        />
      )}

      {/* Loading Overlay */}
      {isLoadingDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
          <div className="rounded-xl bg-white px-5 py-4 shadow-xl flex items-center space-x-3 text-sm font-semibold text-slate-800">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1E5631]"></div>
            <span>Fetching PO delivery line items...</span>
          </div>
        </div>
      )}
    </div>
  );
}
