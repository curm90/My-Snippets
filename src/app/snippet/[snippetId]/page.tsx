import SnippetCard from '@/components/SnippetCard/SnippetCard';
import prisma from '@/lib/prisma';

export default async function Page({ params }: { params: Promise<{ snippetId: string }> }) {
	const { snippetId } = await params;
	const snippet = await prisma.snippet.findUnique({
		where: { id: snippetId },
	});

	if (!snippet) {
		return <div className='text-red-500'>Snippet not found</div>;
	}

	const { title, language, content } = snippet || {};

	console.log({ snippetId, snippet });

	return (
		<section className='py-4 px-6'>
			<SnippetCard title={title} language={language} content={content} showFullContent />
		</section>
	);
}
