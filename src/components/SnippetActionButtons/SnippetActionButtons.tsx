'use client';

import { Clipboard, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
	{
		id: 'delete',
		icon: Trash2,
		label: 'Delete',
		action: () => {
			console.log('Delete action triggered');
		},
	},
];

export default function SnippetActionButtons() {
	return buttons.map(({ id, icon: Icon, label, action }) => (
		<Button key={id} variant='outline' size='icon' className='cursor-pointer' onClick={action} title={label}>
			<Icon />
		</Button>
	));
}
