'use client';

import React from 'react';
import Sidebar from '../../components/layout/sidebar';
import Header from '../../components/layout/header';
import { Layers, Activity, CheckCircle2, Clock } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title="Executive Dashboard"
          subtitle="System overview, active metrics, and operational status"
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Total Records
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#1E5631]">
                    <Layers className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-black text-slate-900">0</div>
                <div className="mt-0.5 text-xs text-slate-500">Active records in database</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Active Status
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#1E5631]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-black text-slate-900">Online</div>
                <div className="mt-0.5 text-xs text-slate-500">All backend services healthy</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Pending Actions
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-black text-slate-900">0</div>
                <div className="mt-0.5 text-xs text-slate-500">Items requiring verification</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Activity Today
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Activity className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-black text-slate-900">Ready</div>
                <div className="mt-0.5 text-xs text-slate-500">System listening for events</div>
              </div>
            </div>

            {/* Main Content Workspace Container */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Workspace</h2>
                  <p className="text-xs text-slate-500">
                    This is your primary layout container. Mount datatables, charts, or workflow forms here.
                  </p>
                </div>
              </div>

              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center mt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-800">Clean Boilerplate Ready</h3>
                <p className="mt-1 max-w-sm text-xs text-slate-500">
                  Connect your API endpoints, define your models and forms, and begin building features.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
