import { apiClient } from '../lib/api-client';
import type { DispatchFilterParams, PurchaseOrder } from '../types/dispatch';

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export async function fetchDispatches(params: DispatchFilterParams = {}): Promise<PurchaseOrder[]> {
  const query = new URLSearchParams();
  if (params.status && params.status !== 'ALL') {
    query.set('status', params.status);
  }
  if (params.search) {
    query.set('search', params.search);
  }

  const endpoint = `/api/dispatch${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await apiClient.get<unknown, ApiResponse<PurchaseOrder[]>>(endpoint);
  return res.data;
}

export async function fetchDispatchById(id: number | string): Promise<PurchaseOrder> {
  const res = await apiClient.get<unknown, ApiResponse<PurchaseOrder>>(`/api/dispatch/${id}`);
  return res.data;
}

export async function triggerFtpSync(): Promise<{
  processedFiles: number;
  importedPOs: number;
  skippedPOs: number;
  errors: string[];
}> {
  const res = await apiClient.post<unknown, ApiResponse<{
    processedFiles: number;
    importedPOs: number;
    skippedPOs: number;
    errors: string[];
  }>>('/api/dispatch/sync-ftp');
  return res.data;
}
