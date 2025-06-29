import Link from 'next/link';
import { Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarMenuItem } from '../ui/sidebar';

export default function Folder({ folder }: { folder: Folder }) {
	return (
		<SidebarMenuItem className='text-sm font-semibold text-muted-foreground flex items-center justify-between hover:bg-accent rounded-sm'>
			<Link href={`/folder/${folder.id}`} className='w-full flex justify-between py-2 px-0 cursor-pointer'>
				<div className='flex items-center gap-2 w-full'>
					<div className='w-8 h-8 bg-accent flex justify-center items-center rounded-md'>{folder.name?.[0] || 'F'}</div>
					<span>{folder.name}</span>
				</div>
			</Link>
			<Button type='button' variant='ghost' size='icon' className='p-1 cursor-pointer'>
				<Cog size='16' />
			</Button>
		</SidebarMenuItem>
	);
}
