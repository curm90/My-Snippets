'use client';

import Link from 'next/link';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { Loader2 } from 'lucide-react';
import DeleteFolderDropdown from '@/components/DeleteFolderDropdown/DeleteFolderDropdown';
import { useDeletingFolders } from '@/contexts/DeletingFoldersContext';

export default function Folder({ folder }: { folder: Folder }) {
	const { isFolderDeleting } = useDeletingFolders();
	const isDeleting = isFolderDeleting(folder.id);

	return (
		<SidebarMenuItem
			className={`text-sm font-semibold text-muted-foreground flex items-center justify-between hover:bg-accent/40 rounded-sm px-2 [&:hover_.folder-actions]:opacity-100 ${
				isDeleting ? 'opacity-50 pointer-events-none' : ''
			}`}
		>
			<Link href={`/folder/${folder.id}`} className='w-full flex justify-between py-2 px-0 cursor-pointer'>
				<div className='flex items-center gap-2 w-full'>
					<div className='w-8 h-8 bg-accent flex justify-center items-center rounded-md'>
						{isDeleting ? <Loader2 className='h-4 w-4 animate-spin' /> : folder.name?.[0] || 'F'}
					</div>
					<span>{folder.name}</span>
				</div>
			</Link>
			<div className='opacity-0 transition-opacity duration-200 folder-actions'>
				<DeleteFolderDropdown folderId={folder.id} />
			</div>
		</SidebarMenuItem>
	);
}
