'use client';

import { Cog } from 'lucide-react';
import { toast } from 'sonner';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteFolder } from '@/data-access/folders';

export default function DeleteFolderDropdown({ folderId }: { folderId: string }) {
	async function handleDelete() {
		try {
			await deleteFolder(folderId);

			toast.success('Folder deleted successfully!');
		} catch (error) {
			toast.error('Failed to delete folder');
			console.log({ error });
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='hover:bg-accent p-2 rounded-sm hover:text-white transition cursor-pointer'>
				<Cog size='16' />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Rename</DropdownMenuItem>
				<DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
