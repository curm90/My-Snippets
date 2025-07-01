import SnippetListWrapper from '@/components/SnippetListWrapper/SnippetListWrapper';
import prisma from '@/lib/prisma';

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
	const { q: searchQuery } = await searchParams;

	// Build the database query based on search parameters
	const snippets = await prisma.snippet.findMany({
		where: searchQuery
			? {
					OR: [
						{ title: { contains: searchQuery, mode: 'insensitive' } },
						{ content: { contains: searchQuery, mode: 'insensitive' } },
						{ language: { contains: searchQuery, mode: 'insensitive' } },
					],
			  }
			: undefined,
		orderBy: { id: 'desc' },
	});

	return (
		<section className='py-4 px-6'>
			<div className='mb-4'>
				<h1 className='text-3xl'>Welcome Liam!</h1>
				{searchQuery && (
					<p className='text-muted-foreground mt-2'>
						{snippets.length > 0
							? `Found ${snippets.length} snippet${snippets.length === 1 ? '' : 's'} for "${searchQuery}"`
							: `No snippets found for "${searchQuery}"`}
					</p>
				)}
			</div>
			<SnippetListWrapper snippets={snippets} />
		</section>
	);
}
