import prisma from '@/lib/prisma';
import SnippetListWrapper from '@/components/SnippetListWrapper/SnippetListWrapper';

export default async function Page({ params }: { params: Promise<{ folderId: string }> }) {
	const { folderId } = await params;
	const snippets = await prisma.snippet.findMany({
		where: { folderId },
	});

	return (
		<section className='py-4 px-6'>
			<h1 className='text-3xl'>Welcome Liam!</h1>
			<SnippetListWrapper snippets={snippets} />
		</section>
	);
}
