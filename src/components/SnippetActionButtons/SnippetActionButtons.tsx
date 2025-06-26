'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Clipboard, SquarePen, Trash2, Check, X, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { deleteSnippet } from '@/data-access/snippets';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/CopyToClipboardButton/CopyToClipboardButton';
import { toastMessages } from '@/constants/toastMessages';

export default function SnippetActionButtons({ snippetId, content }: { snippetId: string; content: string }) {
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		setDeleting(true);
		try {
			await deleteSnippet(snippetId);
			toast.success(toastMessages.deleteSnippet.success);
			router.push('/');
		} catch (error) {
			console.error('Failed to delete snippet:', error);
			toast.error(toastMessages.deleteSnippet.error);
		} finally {
			setDeleting(false);
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
				router.push(`/edit-snippet/${snippetId}`);
			},
		},
		...(confirmingDelete
			? [
					{
						id: 'confirm-delete',
						icon: deleting ? LoaderCircle : Check,
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
			{buttons.map(({ id, icon: Icon, label, action, variant = 'outline' }) =>
				id === 'copy' ? (
					<CopyButton key={id} text={content} disabled={deleting} />
				) : (
					<Button
						key={id}
						variant={variant}
						size='icon'
						className='cursor-pointer z-20'
						disabled={deleting}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							action();
						}}
						title={label}
					>
						{deleting && id === 'confirm-delete' ? (
							<Icon className='size-4 animate-spin' />
						) : (
							<Icon className='h-4 w-4' />
						)}
					</Button>
				),
			)}
		</div>
	);
}
