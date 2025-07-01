'use client';

import Link from 'next/link';
import SnippetCard from '@/components/SnippetCard/SnippetCard';
import { useDeletingSnippets } from '@/contexts/DeletingSnippetsContext';

export default function SnippetList({ snippets }: { snippets: Snippet[] }) {
	const { isSnippetDeleting } = useDeletingSnippets();

	return snippets.length > 0 ? (
		snippets
			.filter(({ id }) => !isSnippetDeleting(id)) // Filter out snippets that are being deleted
			.map(({ id, title, language, content }) => (
				<Link key={id} href={`/snippet/${id}`}>
					<SnippetCard title={title} language={language} content={content} id={id} blurContent />
				</Link>
			))
	) : (
		<span className='italic'>No snippets to show</span>
	);
}
