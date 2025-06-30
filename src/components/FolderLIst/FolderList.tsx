import React from 'react';
import Folder from '@/components/Folder/Folder';

export default function FolderList({ folders }: FolderListProps) {
	return (
		<>
			{folders.map((folder) => (
				<React.Fragment key={folder.id}>
					<Folder folder={folder} />
				</React.Fragment>
			))}
			{folders.length === 0 && (
				<span className='text-sm text-muted-foreground text-center italic'>No folders available</span>
			)}
		</>
	);
}
