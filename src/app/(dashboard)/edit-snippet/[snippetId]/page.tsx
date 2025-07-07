import SnippetForm from '@/components/SnippetForm/SnippetForm';
import { editSnippet } from '@/data-access/snippets';
import prisma from '@/lib/prisma';

export default async function Page({ params }: { params: Promise<{ snippetId: string }> }) {
	const { snippetId } = await params;
	const folders = await prisma.folder.findMany();

	const snippet = await prisma.snippet.findUnique({
		where: { id: snippetId },
		include: {
			snippetTags: true,
		},
	});

	if (!snippet) {
		return <p>Snippet not found</p>;
	}

	return (
		<div className='py-6 px-8'>
			<div className='flex items-center justify-between'>
				<h1 className='font-semibold text-xl'>Edit snippet</h1>
				<h1 className='font-semibold text-xl'>Id: {snippetId}</h1>
			</div>
			<p className='text-sm text-muted-foreground mt-1'>
				This information will be visible to others—please avoid sharing sensitive or private details.
			</p>
			<div className='mt-8'>
				<SnippetForm
					action={editSnippet}
					actionId='edit'
					folders={folders}
					defaultValues={{
						id: snippetId,
						title: snippet.title,
						language: snippet.language,
						snippet: snippet.content,
						folderId: snippet.folderId || '',
						tags: snippet.snippetTags.map((tag) => tag.name),
					}}
				/>
			</div>
		</div>
	);
}
