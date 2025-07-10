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
			<div className='mb-6'>
				<h1 className='text-3xl'>{title || `Snippet ${snippetId}`}</h1>
				<p className='text-muted-foreground mt-2'>
					Viewing snippet details
				</p>
			</div>
			<SnippetCard id={id} title={title} language={language} content={content} showFullContent />
		</section>
	);
}
