import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DeletingSnippetsProvider } from '@/contexts/DeletingSnippetsContext';
import { DeletingFoldersProvider } from '@/contexts/DeletingFoldersContext';
import Navigation from '@/components/Navigation/Navigation';
import AppSidebar from '@/components/AppSidebar/AppSidebar';
import MobileSidebarTrigger from '@/components/MobileSidebarTrigger/MobileSidebarTrigger';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<DeletingSnippetsProvider>
			<DeletingFoldersProvider>
				<SidebarProvider>
					<main className='w-full min-h-[calc(100vh-var(--navbar-height))] bg-background text-foreground'>
						<Navigation />
						<MobileSidebarTrigger />
						<div className='flex pt-[var(--navbar-height)]'>
							<AppSidebar />
							<div className='flex flex-col w-full'>{children}</div>
						</div>
					</main>
				</SidebarProvider>
			</DeletingFoldersProvider>
		</DeletingSnippetsProvider>
	);
}
