import prisma from '@/lib/prisma';
import SnippetListWrapper from '@/components/SnippetListWrapper/SnippetListWrapper';
import { getCurrentUser } from '@/lib/session';

export default async function Page({ params }: { params: Promise<{ folderId: string }> }) {
	const { folderId } = await params;
	const user = await getCurrentUser();

	// Get folder information and snippets
	const [folder, snippets] = await Promise.all([
		prisma.folder.findFirst({
			where: {
				id: folderId,
				userId: user.id,
			},
		}),
		prisma.snippet.findMany({
			where: {
				folderId,
				userId: user.id,
			},
			include: {
				snippetTags: true,
			},
		}),
	]);

	if (!folder) {
		return <div className='text-destructive'>Folder not found</div>;
	}

	return (
		<section className='py-4 px-6'>
			<div className={snippets.length === 0 ? 'flex flex-col items-center justify-center min-h-[50vh]' : ''}>
				<h1 className='text-3xl'>Showing results for folder &ldquo;{folder.name}&rdquo;</h1>
				{snippets.length > 0 ? (
					<p className='text-muted-foreground mt-2'>
						{snippets.length} snippet{snippets.length === 1 ? '' : 's'} in this folder
					</p>
				) : (
					<p className='text-muted-foreground mt-2 text-center'>No snippets in this folder yet</p>
				)}
			</div>
			{snippets.length > 0 && <SnippetListWrapper snippets={snippets} />}
		</section>
	);
}
