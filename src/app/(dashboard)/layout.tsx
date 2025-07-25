import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DeletingSnippetsProvider } from '@/contexts/DeletingSnippetsContext';
import { DeletingFoldersProvider } from '@/contexts/DeletingFoldersContext';
import Navigation from '@/components/Navigation/Navigation';
import AppSidebar from '@/components/AppSidebar/AppSidebar';
import MobileSidebarTrigger from '@/components/MobileSidebarTrigger/MobileSidebarTrigger';
import { getFoldersForCurrentUser } from '@/data-access/folders';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
	const folders = await getFoldersForCurrentUser();

	return (
		<DeletingSnippetsProvider>
			<DeletingFoldersProvider>
				<SidebarProvider>
					<main className='w-full min-h-[calc(100vh-var(--navbar-height))] bg-background text-foreground'>
						<Navigation />
						<MobileSidebarTrigger />
						<div className='flex pt-[var(--navbar-height)]'>
							<AppSidebar folders={folders} />
							<div className='flex flex-col w-full max-w-[2000px] mx-auto p-8'>{children}</div>
						</div>
					</main>
				</SidebarProvider>
			</DeletingFoldersProvider>
		</DeletingSnippetsProvider>
	);
}
