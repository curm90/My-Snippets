import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/Theme/ThemeToggle';
import { AuthButton } from '@/components/AuthButton/AuthButton';
import SearchBarWrapper from '@/components/SearchBar/SearchBarWrapper';
import MobileNavMenu from '@/components/MobileNavMenu/MobileNavMenu';

export default function Navigation() {
	return (
		<nav className='fixed top-0 left-0 z-50 flex items-center justify-between py-4 px-8 bg-secondary w-full h-[var(--navbar-height)]'>
			<div className='flex items-center space-x-6'>
				{/* Logo */}
				<Link href='/'>
					<Image src='/logo.png' alt='code tags' width={30} height={30} className='rounded-full' />
				</Link>

				{/* Desktop Navigation */}
				<Link href='/' className='hidden md:block'>
					Dashboard
				</Link>
			</div>

			{/* Search Bar & Theme */}
			<div className='flex items-center space-x-4 flex-1 md:justify-end justify-center px-6'>
				<div className='hidden md:block'>
					<ThemeToggle />
				</div>
				<SearchBarWrapper />
			</div>

			{/* Desktop Auth + Mobile Menu */}
			<div className='flex items-center space-x-4'>
				<div className='hidden md:block'>
					<AuthButton />
				</div>
				{/* Mobile Navigation Menu */}
				<MobileNavMenu />
			</div>
		</nav>
	);
}
