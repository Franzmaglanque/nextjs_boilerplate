'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDispatches } from '../../services/dispatch-service';
import { useAppStore } from '../../store/use-app-store';
import type { PoStatus, PurchaseOrder } from '../../types/dispatch';
import { Printer, Eye, Store, Calendar, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface DispatchTableProps {
  onSelectPo: (po: PurchaseOrder) => void;
}

export default function DispatchTable({ onSelectPo }: DispatchTableProps) {
  const { statusFilter, setStatusFilter, searchQuery } = useAppStore();

  const { data: pos = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['dispatches', statusFilter, searchQuery],
    queryFn: () => fetchDispatches({ status: statusFilter, search: searchQuery }),
  });

  const statusTabs: { label: string; value: PoStatus | 'ALL' }[] = [
    { label: 'Dispatched (Ready to Print)', value: 'DISPATCHED' },
    { label: 'Pending Dispatch', value: 'PENDING' },
    { label: 'All Orders', value: 'ALL' },
  ];

  return (
    <div className="space-y-4">
      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex space-x-1 rounded-lg bg-slate-100 p-1">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-white text-[#1E5631] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">{pos.length}</span> purchase orders
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center text-slate-400 text-sm">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1E5631] mr-3"></div>
            Loading purchase orders from backend...
          </div>
        ) : isError ? (
          <div className="flex flex-col h-64 items-center justify-center text-rose-600 p-6 text-center">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <div className="font-semibold text-sm">Failed to connect to backend API</div>
            <div className="text-xs text-slate-500 mt-1 max-w-md">{(error as any)?.message}</div>
            <button
              onClick={() => refetch()}
              className="mt-3 text-xs font-bold text-[#1E5631] underline hover:text-[#143d22]"
            >
              Retry Connection
            </button>
          </div>
        ) : pos.length === 0 ? (
          <div className="flex flex-col h-64 items-center justify-center text-slate-400 text-sm">
            <Store className="h-8 w-8 mb-2 text-slate-300" />
            <div className="font-medium text-slate-600">No purchase orders found</div>
            <div className="text-xs text-slate-400 mt-0.5">
              {statusFilter === 'DISPATCHED'
                ? 'No dispatched POs match your filter. Check Pending tab or sync FTP.'
                : 'No records found for current criteria.'}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">PO Number</th>
                  <th className="px-4 py-3.5">Destination Store</th>
                  <th className="px-4 py-3.5">Expected Delivery</th>
                  <th className="px-4 py-3.5 text-center">SKU Lines</th>
                  <th className="px-4 py-3.5 text-right">Ordered Qty</th>
                  <th className="px-4 py-3.5 text-right">Dispatched Qty</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {pos.map((po) => {
                  const isDispatched = po.status === 'DISPATCHED';

                  return (
                    <tr key={po.id} className="hover:bg-slate-50/80 transition">
                      {/* PO Number */}
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">
                        {po.poNo}
                      </td>

                      {/* Store */}
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{po.locationName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Code: {po.locationCode}</div>
                      </td>

                      {/* Delivery Date */}
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1.5 text-slate-600">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          <span>{po.expectedDeliveryDate || 'N/A'}</span>
                        </div>
                      </td>

                      {/* SKU Count */}
                      <td className="px-4 py-3 text-center font-medium">
                        <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                          {po.itemsCount || (po.items ? po.items.length : 0)} SKUs
                        </span>
                      </td>

                      {/* Ordered Qty */}
                      <td className="px-4 py-3 text-right font-medium text-slate-600">
                        {po.totalOrderedQty.toLocaleString()} packs
                      </td>

                      {/* Dispatched Qty */}
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        {isDispatched ? (
                          <span className="text-[#1E5631] font-extrabold">
                            {(po.totalActualQty ?? po.totalOrderedQty).toLocaleString()} packs
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal">Pending Floor Count</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center">
                        {isDispatched ? (
                          <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>DISPATCHED</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-200">
                            <Clock className="h-3 w-3" />
                            <span>PENDING</span>
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onSelectPo(po)}
                          className={`inline-flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition shadow-sm ${
                            isDispatched
                              ? 'bg-[#1E5631] text-white hover:bg-[#143d22]'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {isDispatched ? (
                            <>
                              <Printer className="h-3.5 w-3.5" />
                              <span>Print DR</span>
                            </>
                          ) : (
                            <>
                              <Eye className="h-3.5 w-3.5" />
                              <span>View PO</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
