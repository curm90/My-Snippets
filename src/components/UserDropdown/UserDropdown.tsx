'use client';

import { signOut, useSession } from 'next-auth/react';
import { Avatar } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

interface UserDropdownProps {
	className?: string;
}

export function UserDropdown({ className }: UserDropdownProps) {
	const { data: session } = useSession();

	if (!session?.user) {
		return null;
	}

	const user = session.user;
	const displayName = user.name || user.email || 'User';

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={className}>
				<Avatar
					src={user.image || undefined}
					alt={displayName}
					fallback={displayName}
					className='cursor-pointer hover:ring-2 hover:ring-primary transition-all'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-56'>
				<div className='flex items-center gap-2 p-2'>
					<Avatar src={user.image || undefined} alt={displayName} fallback={displayName} className='h-8 w-8' />
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{user.name || 'User'}</p>
						<p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/profile' className='flex items-center gap-2 cursor-pointer'>
						<Settings className='h-4 w-4' />
						Settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => signOut()}
					className='flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600'
				>
					<LogOut className='h-4 w-4' />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
