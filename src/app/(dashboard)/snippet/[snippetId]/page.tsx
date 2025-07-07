import SnippetCard from '@/components/SnippetCard/SnippetCard';
import { getSnippetById } from '@/data-access/snippets';

export default async function Page({ params }: { params: Promise<{ snippetId: string }> }) {
	const { snippetId } = await params;
	const snippet = await getSnippetById(snippetId);

	if (!snippet) {
		return <div className='text-red-500'>Snippet not found</div>;
	}

	const { id, title, language, content } = snippet || {};

	return (
		<section className='py-4 px-6'>
			<SnippetCard id={id} title={title} language={language} content={content} showFullContent />
		</section>
	);
}
