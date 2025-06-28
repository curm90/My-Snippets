import Link from 'next/link';
import SnippetCard from '@/components/SnippetCard/SnippetCard';

export default async function SnippetList({ snippets }: { snippets: Snippet[] }) {
	return snippets.length > 0 ? (
		snippets.map(({ id, title, language, content }) => (
			<Link key={id} href={`/snippet/${id}`}>
				<SnippetCard title={title} language={language} content={content} id={id} blurContent />
			</Link>
		))
	) : (
		<span className='italic'>No snippets to show</span>
	);
}
