'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { UserDropdown } from '@/components/UserDropdown/UserDropdown';
import ThemeToggle from '@/components/Theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/constants/navItems';

export default function MobileNavMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	// Close menu when pathname changes (navigation occurs)
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='md:hidden relative'>
			{/* Hamburger Menu Button */}
			<Button
				onClick={toggleMenu}
				className='p-2 hover:bg-secondary/80 rounded-md transition-colors duration-200'
				aria-label='Toggle navigation menu'
				variant='outline'
			>
				{isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
			</Button>

			{/* Mobile Menu Dropdown */}
			{isOpen && (
				<>
					{/* Backdrop */}
					<div className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40' onClick={() => setIsOpen(false)} />

					{/* Menu Content */}
					<div className='fixed top-0 left-0 right-0 bg-secondary border-b border-border shadow-lg z-50 animate-in slide-in-from-top-2 duration-200'>
						<div className='flex flex-col py-4'>
							{/* Navigation Items */}
							{menuItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className='flex items-center px-6 py-3 text-foreground hover:bg-secondary/20 transition-colors duration-200'
									onClick={() => setIsOpen(false)}
								>
									{item.label}
								</Link>
							))}

							{/* Separator */}
							<Separator className='my-2 mx-6' />

							{/* Theme Toggle */}
							<div className='px-6 py-3'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium'>Theme</span>
									<ThemeToggle />
								</div>
							</div>

							{/* User Profile Section */}
							<div className='px-6 py-3'>
								<UserDropdown />
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
