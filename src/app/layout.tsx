import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '../lib/query-provider';
import AuthGuard from '../components/auth/auth-guard';

export const metadata: Metadata = {
  title: 'Enterprise Management Portal',
  description: 'Enterprise Web Application Dashboard & Management System',
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
