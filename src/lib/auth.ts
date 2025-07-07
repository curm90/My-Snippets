import { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		// GoogleProvider({
		//   clientId: process.env.GOOGLE_CLIENT_ID!,
		//   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		// }),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user.password) {
					return null;
				}

				const passwordMatch = await bcrypt.compare(credentials.password, user.password);

				if (!passwordMatch) {
					return null;
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image,
				};
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	pages: {
		signIn: '/auth/signin',
	},
	debug: process.env.NODE_ENV === 'development',
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
};

export const auth = () => getServerSession(authOptions);
