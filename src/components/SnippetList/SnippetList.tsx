'use client';

import Link from 'next/link';
import SnippetCard from '@/components/SnippetCard/SnippetCard';
import { useDeletingSnippets } from '@/contexts/DeletingSnippetsContext';

export default function SnippetList({ snippets, searchQuery }: { snippets: Snippet[]; searchQuery?: string }) {
	const { isSnippetDeleting } = useDeletingSnippets();

	return snippets.length > 0
		? snippets
				.filter(({ id }) => !isSnippetDeleting(id)) // Filter out snippets that are being deleted
				.map(({ id, title, language, content }) => (
					<Link key={id} href={`/snippet/${id}`}>
						<SnippetCard title={title} language={language} content={content} id={id} blurContent />
					</Link>
				))
		: // Only show "No snippets to show" when there's no active search
		  // When searching, the search results message in the parent handles the empty state
		  !searchQuery && <span className='italic'>No snippets to show</span>;
}
