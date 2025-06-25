'use client';

import { Clipboard, SquarePen, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { deleteSnippet } from '@/data-access/snippets';
import { useRouter } from 'next/navigation';

export default function SnippetActionButtons({ snippetId }: { snippetId: string }) {
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		try {
			await deleteSnippet(snippetId);

			console.log('Snippet deleted successfully');
			router.refresh(); // Refresh the page to reflect the deletion
			// Optionally add a toast notification here
		} catch (error) {
			console.error('Failed to delete snippet:', error);
			// Optionally show error message
		} finally {
			setConfirmingDelete(false);
		}
	};

	const buttons = [
		{
			id: 'copy',
			icon: Clipboard,
			label: 'Copy',
			action: () => {
				console.log('Copy action triggered');
			},
		},
		{
			id: 'edit',
			icon: SquarePen,
			label: 'Edit',
			action: () => {
				console.log('Edit action triggered');
			},
		},
		...(confirmingDelete
			? [
					{
						id: 'confirm-delete',
						icon: Check,
						label: 'Confirm Delete',
						action: handleDelete,
						variant: 'destructive' as const,
					},
					{
						id: 'cancel-delete',
						icon: X,
						label: 'Cancel',
						action: () => setConfirmingDelete(false),
						variant: 'outline' as const,
					},
			  ]
			: [
					{
						id: 'delete',
						icon: Trash2,
						label: 'Delete',
						action: () => setConfirmingDelete(true),
						variant: 'outline' as const,
					},
			  ]),
	];

	return (
		<div className='flex gap-2'>
			{buttons.map(({ id, icon: Icon, label, action, variant = 'outline' }) => (
				<Button
					key={id}
					variant={variant}
					size='icon'
					className='cursor-pointer z-20'
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						action();
					}}
					title={label}
				>
					<Icon className='h-4 w-4' />
				</Button>
			))}
		</div>
	);
}
