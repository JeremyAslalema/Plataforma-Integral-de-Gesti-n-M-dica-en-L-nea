import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from './components/session-provider'; // ← MANTIENE "componets"

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Plataforma Médica - Gestión Integral de Salud',
    template: '%s | Plataforma Médica',
  },
  description: 'Conectando pacientes y profesionales de la salud con tecnología de vanguardia',
  keywords: ['salud', 'médicos', 'pacientes', 'telemedicina', 'gestión médica'],
  authors: [{ name: 'Tu Nombre/Empresa' }],
  creator: 'Tu Nombre/Empresa',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tudominio.com'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    title: 'Plataforma Médica - Gestión Integral de Salud',
    description: 'Conectando pacientes y profesionales de la salud',
    siteName: 'Plataforma Médica',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plataforma Médica - Gestión Integral de Salud',
    description: 'Conectando pacientes y profesionales de la salud',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body 
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}