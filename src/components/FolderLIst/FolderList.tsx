import Link from 'next/link';
import { Cog } from 'lucide-react';
import { Button } from '../ui/button';

export default function FolderList({ folders }: Folders) {
	console.log({ folders });

	return (
		<ul>
			{folders.map((folder) => (
				<li key={folder.id} className='text-sm font-semibold text-muted-foreground flex items-center justify-between'>
					<Link href='#' className='w-full flex justify-between py-2 px-0 cursor-pointer'>
						<div className='flex items-center gap-2'>
							<div className='w-8 h-8 bg-accent flex justify-center items-center rounded-md'>
								{folder.name?.[0] || 'F'}
							</div>
							<span>{folder.name}</span>
						</div>
						<Button type='button' variant='ghost' size='icon' className='p-1 cursor-pointer'>
							<Cog size='16' />
						</Button>
					</Link>
				</li>
			))}
			{folders.length === 0 && (
				<li className='text-sm text-muted-foreground text-center italic'>No folders available</li>
			)}
		</ul>
	);
}
