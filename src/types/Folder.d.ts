type Folder = { id: string; name: string };
type Folders = {
	folders: Folder[];
};

type FolderFormValues = z.infer<typeof folderSchema>;
