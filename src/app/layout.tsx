import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '../lib/query-provider';
import AuthGuard from '../components/auth/auth-guard';

export const metadata: Metadata = {
  title: 'Puregold RCI - Outbound Dispatch & Yield CMS',
  description: 'Outbound PO Fulfillment and Delivery Receipt Printing System for Puregold Meat Cutting Facility',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full min-h-screen bg-[#f8fafc] text-slate-900">
        <QueryProvider>
          <AuthGuard>{children}</AuthGuard>
        </QueryProvider>
      </body>
    </html>
  );
}
