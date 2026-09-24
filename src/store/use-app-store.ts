import { create } from 'zustand';
import type { PoStatus } from '../types/dispatch';

interface AppState {
  statusFilter: PoStatus | 'ALL';
  searchQuery: string;
  selectedPoId: number | null;
  isPrintModalOpen: boolean;
  sidebarCollapsed: boolean;
  setStatusFilter: (status: PoStatus | 'ALL') => void;
  setSearchQuery: (query: string) => void;
  setSelectedPoId: (id: number | null) => void;
  setIsPrintModalOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  statusFilter: 'DISPATCHED', // Default to DISPATCHED since printing focuses on fulfilled POs
  searchQuery: '',
  selectedPoId: null,
  isPrintModalOpen: false,
  sidebarCollapsed: false,
  setStatusFilter: (status) => set({ statusFilter: status }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedPoId: (selectedPoId) => set({ selectedPoId }),
  setIsPrintModalOpen: (isPrintModalOpen) => set({ isPrintModalOpen }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
