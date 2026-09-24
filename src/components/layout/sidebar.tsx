'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '../../store/use-app-store';
import { useAuthStore } from '../../store/use-auth-store';
import { NAV_ITEMS } from '../../config/navigation';
import {
  Truck,
  Printer,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';

const iconMap = {
  Printer: Printer,
  FileSpreadsheet: FileSpreadsheet,
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  // Filter menus based on user's role (Approach A)
  const accessibleItems = NAV_ITEMS.filter((item) => {
    if (!user) return true;
    return item.allowedRoles.includes(user.role);
  });

  return (
    <aside
      className={`no-print flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
        {!sidebarCollapsed ? (
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E5631] text-[#F4B41A] font-bold shadow-sm">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-slate-800 leading-tight">
                RCI MEAT YIELD
              </div>
              <div className="text-[10px] font-bold tracking-wider text-[#1E5631] uppercase">
                Puregold Dispatch CMS
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E5631] text-[#F4B41A] font-bold">
            <Truck className="h-5 w-5" />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 p-3">
        {!sidebarCollapsed && (
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Outbound Operations
          </div>
        )}

        {accessibleItems.map((item) => {
          const Icon = iconMap[item.iconName] || Printer;
          const isActive = pathname === item.href || (item.href === '/dispatch' && pathname === '/');

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? 'bg-[#1E5631] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title={sidebarCollapsed ? item.title : undefined}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-[#F4B41A]' : 'text-slate-400'}`} />
              {!sidebarCollapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout Footer */}
      <div className="border-t border-slate-200 p-3">
        {!sidebarCollapsed ? (
          <div className="rounded-lg bg-slate-50 p-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 overflow-hidden">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E5631]/10 text-[#1E5631]">
                  <User className="h-4 w-4" />
                </div>
                <div className="truncate text-xs">
                  <div className="font-bold text-slate-800 truncate">{user?.fullName || 'Logged In'}</div>
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 font-mono">
                    <span className="font-semibold text-[#1E5631]">{user?.role || 'STAFF'}</span>
                    <span>·</span>
                    <span className="truncate">{user?.company === 'Royal Cargo Inc.' ? 'RCI' : 'Puregold'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
            title="Log Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </aside>
  );
}
