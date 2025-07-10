'use client';

import { Cog } from 'lucide-react';
import { toast } from 'sonner';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { deleteFolder } from '@/data-access/folders';
import { useDeletingFolders } from '@/contexts/DeletingFoldersContext';

export default function DeleteFolderDropdown({ folderId, onRename }: { folderId: string; onRename: () => void }) {
	const { setFolderDeleting } = useDeletingFolders();

	async function handleDelete() {
		setFolderDeleting(folderId, true);
		try {
			await deleteFolder(folderId);
			toast.success('Folder deleted successfully!');
		} catch (error) {
			toast.error('Failed to delete folder');
			console.log({ error });
		} finally {
			setFolderDeleting(folderId, false);
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='p-2 cursor-pointer'>
					<Cog size='16' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={onRename}>Rename</DropdownMenuItem>
				<DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
