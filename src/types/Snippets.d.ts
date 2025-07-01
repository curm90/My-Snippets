type Tag = {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
};

type Snippet = {
	id: string;
	title: string;
	language: string;
	content: string;
	folderId?: string | null;
	snippetTags?: Tag[];
};
