type Folder = { id: string; name: string };
type Folders = { id: string; name: string }[];

type FolderListProps = {
	folders: Folders;
};

type FolderSelectProps = {
	onChange?: (value: string) => void;
	value?: string;
	folders: Folders;
};

type FolderFormValues = z.infer<typeof folderSchema>;
