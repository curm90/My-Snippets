import Link from 'next/link';
import {
	Sidebar,
	SidebarContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

export default function AppSidebar() {
	return (
		<Sidebar className='h-[calc(100vh-var(--navbar-height))] border-r-4 border-r-secondary'>
			<SidebarContent className='px-4 py-6'>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className='bg-action text-center hover:bg-chart-4/85 cursor-pointer'>
							<Link href='/create-snippet' className='text-md font-bold text-center w-full'>
								Create Snippet
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	);
}
