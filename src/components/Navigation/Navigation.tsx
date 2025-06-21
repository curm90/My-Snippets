import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/Theme/ThemeToggle';

export default function Navigation() {
	return (
		<nav className='flex items-center justify-between py-4 px-8 bg-secondary'>
			<div className='flex items-center space-x-6'>
				<Link href='/'>
					<Image src='/logo.png' alt='code tags' width={30} height={30} className='rounded-full' />
				</Link>
				<Link href='/'>Dashboard</Link>
			</div>
			<div className='flex items-center space-x-4 flex-1 justify-end px-6'>
				<ThemeToggle />
				<div className='max-w-sm w-full'>
					<Input className='' type='search' placeholder='Search snippets' />
				</div>
			</div>
			<div className='flex items-center space-x-1'>
				<SignedOut>
					<SignInButton>
						<Button className='cursor-pointer'>Register</Button>
					</SignInButton>
					<SignUpButton>
						<Button className='cursor-pointer' variant='link'>
							Sign in
						</Button>
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</nav>
	);
}
