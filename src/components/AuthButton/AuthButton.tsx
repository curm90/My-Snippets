'use client';

import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { UserDropdown } from '@/components/UserDropdown/UserDropdown';
import { LogIn } from 'lucide-react';

export function AuthButton() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <Avatar className='animate-pulse bg-muted' fallback='' />;
	}

	if (session) {
		return <UserDropdown />;
	}

	return (
		<Button
			onClick={() => signIn()}
			className='bg-action hover:bg-action/85 hover:text-action-foreground text-action-foreground flex items-center gap-2'
		>
			<LogIn className='h-4 w-4' />
			Sign In
		</Button>
	);
}
