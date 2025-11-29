import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

// Extender tipos de NextAuth
declare module 'next-auth' {
  interface User {
    role?: string;
    name: string;
  }

  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { 
          label: 'Email', 
          type: 'email', 
          placeholder: 'correo@ejemplo.com' 
        },
        password: { 
          label: 'Contraseña', 
          type: 'password' 
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email y contraseña son requeridos');
        }

        try {
          // Buscar usuario en la base de datos
          const user = await prisma.user.findUnique({
            where: { 
              email: credentials.email.toLowerCase().trim() 
            }
          });

          if (!user) {
            throw new Error('Usuario no encontrado');
          }

          // Verificar contraseña
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
          }

          // Retornar usuario sin password
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Error en autenticación:', error);
          throw new Error('Error en el servidor. Intente nuevamente.');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  pages: {
    signIn: '/auth/login',
    // signUp: '/auth/register', // ← ELIMINA ESTA LÍNEA TEMPORALMENTE
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirigir al dashboard después del login
      if (url.startsWith('/dashboard')) return url;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl + '/dashboard';
    }
  },
  debug: process.env.NODE_ENV === 'development',
};