import SnippetForm from '@/components/SnippetForm/SnippetForm';
import { createSnippet } from '@/data-access/snippets';
import { getCurrentUser } from '@/lib/session';
import { getFoldersForCurrentUser } from '@/data-access/folders';

export default async function Page() {
	// This will redirect to /auth/signin if not authenticated
	await getCurrentUser();
	const folders = await getFoldersForCurrentUser();

	return (
		<div className='py-6 px-8'>
			<h1 className='font-semibold text-xl'>Create a Snippet</h1>
			<p className='text-sm text-muted-foreground mt-1'>
				This information will be visible to you—please avoid sharing sensitive or private details.
			</p>
			<div className='mt-8'>
				<SnippetForm action={createSnippet} actionId='create' folders={folders} />
			</div>
		</div>
	);
}
