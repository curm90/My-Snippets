import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FolderSelect({ onChange, value, folders }: FolderSelectProps) {
	return (
		<Select name='folderId' onValueChange={onChange} value={value} defaultValue={value}>
			<SelectTrigger className='w-full'>
				<SelectValue placeholder='Folder' />
			</SelectTrigger>
			<SelectContent>
				{folders.map((folder) => (
					<SelectItem key={folder.id} value={folder.id}>
						{folder.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
