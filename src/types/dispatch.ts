export type PoStatus = 'PENDING' | 'DISPATCHED' | 'CANCELLED';

export interface PoItem {
  id: number;
  skuCode: string;
  description: string;
  orderedQty: number;
  actualQty: number | null;
  amount: number | null;
  uom: string | null;
  standardPack: number | null;
}

export interface PurchaseOrder {
  id: number;
  poNo: string;
  poEntryDate: string | null;
  expectedDeliveryDate: string | null;
  cancelDate: string | null;
  locationCode: string;
  locationName: string;
  locationAddress: string | null;
  status: PoStatus;
  dispatchedBy: string | null;
  dispatchedAt: string | null;
  createdAt: string;
  itemsCount: number;
  totalOrderedQty: number;
  totalActualQty: number | null;
  totalAmount?: number | null;
  items: PoItem[];
}

export interface DispatchFilterParams {
  status?: PoStatus | 'ALL';
  search?: string;
}
