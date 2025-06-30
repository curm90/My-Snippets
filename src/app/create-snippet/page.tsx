import SnippetForm from '@/components/SnippetForm/SnippetForm';
import { createSnippet } from '@/data-access/snippets';
import prisma from '@/lib/prisma';

export default async function Page() {
	const folders = await prisma.folder.findMany();

	return (
		<div className='py-6 px-8'>
			<h1 className='font-semibold text-xl'>Create a Snippet</h1>
			<p className='text-sm text-muted-foreground mt-1'>
				This information will be visible to others—please avoid sharing sensitive or private details.
			</p>
			<div className='mt-8'>
				<SnippetForm action={createSnippet} actionId='create' folders={folders} />
			</div>
		</div>
	);
}
