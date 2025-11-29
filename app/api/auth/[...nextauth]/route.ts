import NextAuth from 'next-auth';
import { authOptions } from '@/app/lib/auth'; // ← Cambiar authConfig por authOptions

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };