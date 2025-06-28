import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FolderSelect({
	onChange,
	value,
	folders,
	name = 'folderId',
}: {
	onChange?: (value: string) => void;
	value?: string;
	folders?: { id: string; name: string }[];
	name: string;
}) {
	return (
		<Select name={name} onValueChange={onChange} value={value} defaultValue={value}>
			<SelectTrigger className='w-[180px]'>
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
