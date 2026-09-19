import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Malami 2027 | Kebbi Election Monitoring Command Center',
  description: 'Official Election Day Collation & Legal Defense Platform for Abubakar Malami, SAN, CON (ADC). Powered by GetoCore Digital Innovation in partnership with TEEM TECH Solution.',
  authors: [
    { name: 'GetoCore Digital Innovation' },
    { name: 'TEEM TECH Solution' }
  ],
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Malami 2027',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
