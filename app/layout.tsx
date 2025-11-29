import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from './components/session-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plataforma Médica - Gestión de Salud Integral',
  description: 'Sistema de gestión médica para pacientes y profesionales de la salud',
  keywords: 'salud, médicos, pacientes, citas, telemedicina',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}