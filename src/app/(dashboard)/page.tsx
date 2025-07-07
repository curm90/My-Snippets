import SnippetListWrapper from '@/components/SnippetListWrapper/SnippetListWrapper';
import { getSnippetsForCurrentUser } from '@/data-access/snippets';
import { getCurrentUser } from '@/lib/session';

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
	const user = await getCurrentUser();
	const { q: searchQuery } = await searchParams;
	const snippets = await getSnippetsForCurrentUser(searchQuery);

	return (
		<section className='py-4 px-6'>
			<div className='mb-4'>
				<h1 className='text-3xl'>Welcome {user.name || user.email}!</h1>
				{searchQuery && (
					<p className='text-muted-foreground mt-2'>
						{snippets.length > 0
							? `Found ${snippets.length} snippet${snippets.length === 1 ? '' : 's'} for "${searchQuery}"`
							: `No snippets found for "${searchQuery}"`}
					</p>
				)}
			</div>
			<SnippetListWrapper snippets={snippets} searchQuery={searchQuery} />
		</section>
	);
}
