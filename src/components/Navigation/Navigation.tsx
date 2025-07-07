import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/Theme/ThemeToggle';
import { AuthButton } from '@/components/AuthButton/AuthButton';
import SearchBarWrapper from '@/components/SearchBar/SearchBarWrapper';

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
				<SearchBarWrapper />
			</div>
			<div className='flex items-center space-x-1'>
				<AuthButton />
			</div>
		</nav>
	);
}
