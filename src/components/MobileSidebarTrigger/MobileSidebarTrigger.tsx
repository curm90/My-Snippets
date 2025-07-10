'use client';

import { useSidebar } from '@/components/ui/sidebar';

export default function MobileSidebarTrigger() {
	const { toggleSidebar } = useSidebar();

	return (
		<button
			onClick={toggleSidebar}
			className='fixed top-[calc(var(--navbar-height)+1rem)] left-0 z-40 md:hidden bg-action hover:bg-action/80 text-action-foreground border-r border-t border-b border-border rounded-r-md transition-all duration-200 ease-in-out hover:translate-x-1 shadow-sm hover:shadow-md group'
			style={{
				width: '1rem',
				height: '4rem',
			}}
			aria-label='Toggle sidebar'
		>
			<div className='flex items-center justify-center h-full space-x-1'>
				<div className='w-0.5 h-4 bg-white transition-all duration-200 group-hover:h-5'></div>
				<div className='w-0.5 h-4 bg-white transition-all duration-200 group-hover:h-5'></div>
			</div>
		</button>
	);
}
