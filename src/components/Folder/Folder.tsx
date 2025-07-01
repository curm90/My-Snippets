import Link from 'next/link';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import DeleteFolderDropdown from '@/components/DeleteFolderDropdown/DeleteFolderDropdown';

export default function Folder({ folder }: { folder: Folder }) {
	return (
		<SidebarMenuItem className='text-sm font-semibold text-muted-foreground flex items-center justify-between hover:bg-accent/40 rounded-sm px-2 [&:hover_.folder-actions]:opacity-100'>
			<Link href={`/folder/${folder.id}`} className='w-full flex justify-between py-2 px-0 cursor-pointer'>
				<div className='flex items-center gap-2 w-full'>
					<div className='w-8 h-8 bg-accent flex justify-center items-center rounded-md'>{folder.name?.[0] || 'F'}</div>
					<span>{folder.name}</span>
				</div>
			</Link>
			<div className='opacity-0 transition-opacity duration-200 folder-actions'>
				<DeleteFolderDropdown folderId={folder.id} />
			</div>
		</SidebarMenuItem>
	);
}
