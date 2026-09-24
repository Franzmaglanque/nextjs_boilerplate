'use client';

import React from 'react';
import type { PurchaseOrder } from '../../types/dispatch';
import { Printer, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface DispatchPrintSlipProps {
  po: PurchaseOrder;
  onClose: () => void;
}

export default function DispatchPrintSlip({ po, onClose }: DispatchPrintSlipProps) {
  const handlePrint = () => {
    window.print();
  };

  const totalOrdered = po.items.reduce((acc, it) => acc + (it.orderedQty || 0), 0);
  const totalActual = po.items.reduce((acc, it) => acc + (it.actualQty !== null ? it.actualQty : it.orderedQty || 0), 0);
  const fulfillmentRate = totalOrdered > 0 ? ((totalActual / totalOrdered) * 100).toFixed(1) : '100.0';
  const totalAmount = po.items.reduce((acc, it) => acc + (it.amount || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 overflow-y-auto">
      {/* Container Box */}
      <div className="relative w-full max-w-4xl rounded-xl bg-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Screen-Only Control Toolbar */}
        <div className="no-print flex items-center justify-between border-b border-slate-200 bg-slate-100 px-6 py-3.5">
          <div className="flex items-center space-x-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Document Preview: Delivery Receipt / Dispatch Advice
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 rounded-lg bg-[#1E5631] px-4 py-2 text-xs font-bold text-white hover:bg-[#143d22] transition shadow"
            >
              <Printer className="h-4 w-4" />
              <span>Print Slip / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
              title="Close Preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Area */}
        <div className="overflow-y-auto p-8 sm:p-10 text-slate-800 text-xs bg-white print-area">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                  ROYAL CARGO INC. / PUREGOLD PRICE CLUB
                </h1>
                <div className="text-xs font-semibold text-slate-600 tracking-wide mt-0.5">
                  CENTRAL MEAT PROCESSING & LOGISTICS DIVISION
                </div>
                <div className="text-[11px] text-slate-500">
                  Cold Storage Facility · Outbound Meat Dispatch Dock
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block bg-[#1E5631] text-[#F4B41A] font-black text-sm px-3 py-1 rounded">
                  DELIVERY RECEIPT
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1 font-mono">
                  PO #: {po.poNo}
                </div>
                <div className="text-[10px] text-slate-500">
                  Printed: {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Details 2-Column Grid */}
          <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-300 p-4 mb-6 bg-slate-50 text-[11px]">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ship To Destination</div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5">{po.locationName}</div>
              <div className="font-semibold text-slate-700">Store / DC Code: {po.locationCode}</div>
              <div className="text-slate-600 mt-1 leading-snug">
                {po.locationAddress || 'Standard Warehouse / Puregold Receiving Dock'}
              </div>
            </div>

            <div className="border-l border-slate-200 pl-4 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">PO Entry Date:</span>
                <span className="font-semibold">{po.poEntryDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expected Delivery:</span>
                <span className="font-bold text-slate-900">{po.expectedDeliveryDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dispatch Time:</span>
                <span className="font-semibold">
                  {po.dispatchedAt ? new Date(po.dispatchedAt).toLocaleString() : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dispatched By:</span>
                <span className="font-semibold text-slate-800">{po.dispatchedBy || 'Warehouse Staff'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-black text-[#1E5631] uppercase">{po.status}</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mb-6">
            <table className="w-full text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-200 text-slate-800 text-[10px] font-bold uppercase border-b border-slate-300">
                  <th className="p-2 border-r border-slate-300 w-8 text-center">#</th>
                  <th className="p-2 border-r border-slate-300">SKU Code</th>
                  <th className="p-2 border-r border-slate-300">Description</th>
                  <th className="p-2 border-r border-slate-300 text-center">UOM / Pack</th>
                  <th className="p-2 border-r border-slate-300 text-right w-20">Ordered</th>
                  <th className="p-2 border-r border-slate-300 text-right w-20 bg-slate-300/40">Actual Dispatched</th>
                  <th className="p-2 text-right w-20">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                {po.items.map((item, idx) => {
                  const ordered = item.orderedQty;
                  const actual = item.actualQty !== null ? item.actualQty : ordered;
                  const diff = actual - ordered;
                  const hasVariance = diff !== 0;

                  return (
                    <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-2 border-r border-slate-200 text-center font-mono text-slate-500">{idx + 1}</td>
                      <td className="p-2 border-r border-slate-200 font-mono font-bold text-slate-800">
                        {item.skuCode}
                      </td>
                      <td className="p-2 border-r border-slate-200 font-medium text-slate-800">
                        {item.description}
                      </td>
                      <td className="p-2 border-r border-slate-200 text-center text-slate-600">
                        {item.uom || 'PACK'} {item.standardPack ? `(${item.standardPack})` : ''}
                      </td>
                      <td className="p-2 border-r border-slate-200 text-right font-semibold text-slate-700">
                        {ordered.toLocaleString()}
                      </td>
                      <td className="p-2 border-r border-slate-200 text-right font-black text-slate-900 bg-emerald-50/40">
                        {actual.toLocaleString()}
                      </td>
                      <td
                        className={`p-2 text-right font-bold ${
                          hasVariance ? 'text-amber-700 bg-amber-50/50' : 'text-slate-400'
                        }`}
                      >
                        {hasVariance ? `${diff > 0 ? `+${diff}` : diff}` : '0'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold border-t-2 border-slate-400 text-slate-900 text-[11px]">
                  <td colSpan={4} className="p-2.5 text-right uppercase tracking-wider">
                    Total Quantities:
                  </td>
                  <td className="p-2.5 text-right font-bold border-r border-slate-300">
                    {totalOrdered.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right font-black border-r border-slate-300 text-[#1E5631] bg-emerald-100/50">
                    {totalActual.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right text-slate-700">
                    {totalActual - totalOrdered === 0 ? '0' : totalActual - totalOrdered}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Fulfillment Summary & Compliance Callout */}
          <div className="grid grid-cols-3 gap-3 mb-8 p-3 rounded border border-slate-200 bg-slate-50 text-[10px]">
            <div>
              <span className="text-slate-500">Order Fill Rate:</span>{' '}
              <span className="font-extrabold text-[#1E5631] text-xs">{fulfillmentRate}%</span>
            </div>
            <div>
              <span className="text-slate-500">Cold Chain Compliance:</span>{' '}
              <span className="font-bold text-slate-800">Passed (-18°C ~ 4°C Target)</span>
            </div>
            <div>
              <span className="text-slate-500">Total Items / Lines:</span>{' '}
              <span className="font-bold text-slate-800">{po.items.length} Lines</span>
            </div>
          </div>

          {/* Signatures & Chain of Custody */}
          <div className="grid grid-cols-4 gap-4 pt-6 border-t-2 border-slate-800 text-[10px]">
            <div className="flex flex-col justify-between h-24">
              <div className="text-slate-500 uppercase font-bold tracking-wider">Prepared & Dispatched By:</div>
              <div className="border-t border-slate-400 pt-1 text-center font-semibold text-slate-800">
                {po.dispatchedBy || 'Warehouse Clerk'}
                <div className="text-[9px] text-slate-500 font-normal">RCI Cold Storage Logistics</div>
              </div>
            </div>

            <div className="flex flex-col justify-between h-24">
              <div className="text-slate-500 uppercase font-bold tracking-wider">Inspected & Verified By:</div>
              <div className="border-t border-slate-400 pt-1 text-center font-semibold text-slate-800">
                Quality Assurance / Inspector
                <div className="text-[9px] text-slate-500 font-normal">Seal & Temperature Verified</div>
              </div>
            </div>

            <div className="flex flex-col justify-between h-24">
              <div className="text-slate-500 uppercase font-bold tracking-wider">Reefer Truck / Driver:</div>
              <div className="border-t border-slate-400 pt-1 text-center font-semibold text-slate-800">
                Driver Signature & Plate #
                <div className="text-[9px] text-slate-500 font-normal">3PL Cold Carrier</div>
              </div>
            </div>

            <div className="flex flex-col justify-between h-24">
              <div className="text-slate-500 uppercase font-bold tracking-wider">Store Received By:</div>
              <div className="border-t border-slate-400 pt-1 text-center font-semibold text-slate-800">
                Puregold Store Receiving Clerk
                <div className="text-[9px] text-slate-500 font-normal">Date, Time & Store Stamp</div>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="mt-8 text-center text-[9px] text-slate-400 border-t border-slate-200 pt-2">
            This document serves as the official Delivery Receipt (DR) for outbound meat yields from Royal Cargo Inc.
            transferred to Puregold Price Club Inc. stores. Any physical shortage or damage must be annotated immediately
            upon delivery.
          </div>
        </div>
      </div>
    </div>
  );
}
