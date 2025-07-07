import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect('/auth/signin');
	}

	return session.user;
}

export async function getOptionalUser() {
	const session = await getServerSession(authOptions);
	return session?.user || null;
}
