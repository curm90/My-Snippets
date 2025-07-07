'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User } from 'lucide-react';

export function AuthButton() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<Button variant='ghost' disabled>
				Loading...
			</Button>
		);
	}

	if (session) {
		return (
			<div className='flex items-center gap-2'>
				<span className='text-sm text-muted-foreground flex items-center gap-1'>
					<User className='h-4 w-4' />
					{session.user?.name || session.user?.email}
				</span>
				<Button variant='ghost' size='sm' onClick={() => signOut()} className='flex items-center gap-1'>
					<LogOut className='h-4 w-4' />
					Sign Out
				</Button>
			</div>
		);
	}

	return (
		<Button variant='ghost' size='sm' onClick={() => signIn()} className='flex items-center gap-1'>
			<LogIn className='h-4 w-4' />
			Sign In
		</Button>
	);
}
