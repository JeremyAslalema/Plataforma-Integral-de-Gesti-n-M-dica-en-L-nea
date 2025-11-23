// proxy.ts (en la RAIZ del proyecto)
import { withAuth } from 'next-auth/middleware';

// Exportar como función proxy (nueva convención Next.js 16)
export const proxy = withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// Configuración de rutas protegidas
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/paciente/:path*',
    '/profesional/:path*'
  ]
};