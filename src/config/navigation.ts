import type { UserRole } from '../store/use-auth-store';

export interface NavItem {
  id: string;
  title: string;
  href: string;
  iconName: 'Printer' | 'FileSpreadsheet';
  allowedRoles: UserRole[];
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dispatch',
    title: 'Outbound Dispatch',
    href: '/dispatch',
    iconName: 'Printer',
    allowedRoles: ['STAFF', 'ENCODER', 'QA'],
    description: 'Review fulfilled store shipments and print Delivery Receipts (DR)',
  },
  {
    id: 'ftp',
    title: 'FTP Ingestion',
    href: '/ftp',
    iconName: 'FileSpreadsheet',
    allowedRoles: ['STAFF', 'ENCODER'],
    description: 'Monitor AS/400 PO file ingestion and trigger manual syncs',
  },
];
