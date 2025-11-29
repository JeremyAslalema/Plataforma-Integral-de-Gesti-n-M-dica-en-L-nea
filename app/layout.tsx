import type { Metadata } from 'next'
import { SessionProvider } from './components/session-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plataforma Médica',
  description: 'Sistema de gestión médica integral',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}