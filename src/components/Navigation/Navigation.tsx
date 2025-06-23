import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/Theme/ThemeToggle';

export default function Navigation() {
	return (
		<nav className='fixed top-0 left-0 z-50 flex items-center justify-between py-4 px-8 bg-secondary w-full h-[var(--navbar-height)]'>
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
				<Button className='cursor-pointer bg-action hover:bg-action/85 text-foreground'>
					Register
				</Button>
				<Button className='cursor-pointer' variant='link'>
					Sign in
				</Button>
			</div>
		</nav>
	);
}
