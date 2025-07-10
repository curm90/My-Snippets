'use client';

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
import { useCloseSidebarOnNav } from '@/components/SidebarNavWrapper/SidebarNavWrapper';

export default function AppSidebar({ folders }: AppSidebarProps) {
	const closeSidebarOnNav = useCloseSidebarOnNav();

	return (
		<Sidebar className='h-[calc(100vh-var(--navbar-height))] border-r-4 border-r-secondary'>
			<SidebarContent className='px-4 py-8'>
				<SidebarMenu className='flex flex-col'>
					<SidebarMenuItem>
						<SidebarMenuButton className='bg-action hover:bg-action/85 text-action-foreground hover:text-action-foreground text-center cursor-pointer mb-8 active:bg-action/80'>
							<Link href='/create-snippet' className='text-md font-bold text-center w-full' onClick={closeSidebarOnNav}>
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
