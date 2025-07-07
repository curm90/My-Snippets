import Link from 'next/link';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import FolderList from '@/components/FolderLIst/FolderList';
import CreateFolderForm from '@/components/CreateFolderForm/CreateFolderForm';
import { UserDropdown } from '@/components/UserDropdown/UserDropdown';
import { getFoldersForCurrentUser } from '@/data-access/folders';

export default async function AppSidebar() {
	const folders = await getFoldersForCurrentUser();

	return (
		<Sidebar className='h-[calc(100vh-var(--navbar-height))] border-r-4 border-r-secondary'>
			<SidebarContent className='px-4 py-6'>
				<SidebarMenu className='flex flex-col'>
					<SidebarMenuItem>
						<SidebarMenuButton className='bg-action hover:bg-action/85 text-foreground text-center cursor-pointer mb-8 active:bg-action/80'>
							<Link href='/create-snippet' className='text-md font-bold text-center w-full'>
								Create Snippet
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<CreateFolderForm />
					</SidebarMenuItem>
					<FolderList folders={folders} />
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className='px-4 py-4 border-t'>
				<div className='flex items-center justify-center'>
					<UserDropdown />
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
