import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from './components/session-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Plataforma Médica - Gestión de Salud Integral',
  description: 'Sistema de gestión médica para pacientes y profesionales de la salud. Citas, historial médico, telemedicina y más.',
  keywords: 'salud, médicos, pacientes, citas, telemedicina, historial médico, plataforma médica',
  authors: [{ name: 'Plataforma Médica' }],
  openGraph: {
    title: 'Plataforma Médica - Tu salud simplificada',
    description: 'Conectamos pacientes y profesionales de la salud en un ecosistema digital seguro y eficiente.',
    type: 'website',
    locale: 'es_ES',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0077b6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}