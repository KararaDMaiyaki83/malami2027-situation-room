import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abubakar Malami (SAN) Election 2027 Situation Room | Official Command',
  description: 'Abubakar Malami (SAN) Election 2027 Situation Room — Official Platform by the Technical Team. Powered by GetoCore Digital Innovation & TEEM TECH Solution (Kaduna\'s #1 IT Companies with Election Ideas).',
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
