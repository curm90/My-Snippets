'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { Loader2, Check, X } from 'lucide-react';
import DeleteFolderDropdown from '@/components/DeleteFolderDropdown/DeleteFolderDropdown';
import { useDeletingFolders } from '@/contexts/DeletingFoldersContext';
import { updateFolder } from '@/data-access/folders';
import { toast } from 'sonner';

export default function Folder({ folder }: { folder: Folder }) {
	const { isFolderDeleting } = useDeletingFolders();
	const isDeleting = isFolderDeleting(folder.id);
	const [isEditing, setIsEditing] = useState(false);
	const [editingName, setEditingName] = useState(folder.name);
	const [isUpdating, setIsUpdating] = useState(false);

	const handleStartEdit = () => {
		setIsEditing(true);
		setEditingName(folder.name);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditingName(folder.name);
	};

	const handleSaveEdit = async () => {
		if (editingName.trim() === folder.name) {
			setIsEditing(false);
			return;
		}

		setIsUpdating(true);
		try {
			await updateFolder(folder.id, editingName.trim());
			setIsEditing(false);
			toast.success('Folder renamed successfully!');
		} catch (error) {
			toast.error('Failed to rename folder');
			console.log({ error });
		} finally {
			setIsUpdating(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSaveEdit();
		} else if (e.key === 'Escape') {
			handleCancelEdit();
		}
	};

	return (
		<SidebarMenuItem
			className={`text-sm font-semibold text-muted-foreground flex items-center justify-between hover:bg-accent/40 rounded-sm px-2 [&:hover_.folder-actions]:opacity-100 ${
				isDeleting || isUpdating ? 'opacity-50 pointer-events-none' : ''
			}`}
		>
			{isEditing ? (
				<div className='w-full flex items-center py-2 px-0'>
					<div className='flex items-center gap-2 w-full'>
						<div className='w-8 h-8 bg-accent flex justify-center items-center rounded-md'>
							{isUpdating ? <Loader2 className='h-4 w-4 animate-spin' /> : folder.name?.[0] || 'F'}
						</div>
						<div className='flex-1 relative'>
							<input
								type='text'
								value={editingName}
								onChange={(e) => setEditingName(e.target.value)}
								onKeyDown={handleKeyDown}
								className='w-full bg-transparent border-b border-muted-foreground focus:outline-none focus:border-primary pr-12'
								autoFocus
							/>
							<div className='absolute right-0 top-0 flex items-center gap-1'>
								<button
									onClick={handleSaveEdit}
									disabled={isUpdating}
									className='p-1 hover:bg-accent rounded-sm text-green-600 hover:text-green-700'
								>
									<Check size='12' />
								</button>
								<button
									onClick={handleCancelEdit}
									disabled={isUpdating}
									className='p-1 hover:bg-accent rounded-sm text-red-600 hover:text-red-700'
								>
									<X size='12' />
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Link href={`/folder/${folder.id}`} className='w-full flex justify-between py-2 px-0 cursor-pointer'>
					<div className='flex items-center gap-2 w-full'>
						<div className='w-8 h-8 bg-accent flex justify-center items-center rounded-md'>
							{isDeleting ? <Loader2 className='h-4 w-4 animate-spin' /> : folder.name?.[0] || 'F'}
						</div>
						<span>{folder.name}</span>
					</div>
				</Link>
			)}
			{!isEditing && (
				<div className='opacity-0 transition-opacity duration-200 folder-actions'>
					<DeleteFolderDropdown folderId={folder.id} onRename={handleStartEdit} />
				</div>
			)}
		</SidebarMenuItem>
	);
}
