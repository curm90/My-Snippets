import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// Ensure required environment variables are present
if (!process.env.NEXTAUTH_SECRET) {
	throw new Error('NEXTAUTH_SECRET environment variable is not set');
}

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL environment variable is not set');
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
