'use client';

import { useEffect } from 'react';
import { useDeletingSnippets } from '@/contexts/DeletingSnippetsContext';
import SnippetList from '@/components/SnippetList/SnippetList';

export default function SnippetListWrapper({ snippets }: { snippets: Snippet[] }) {
	const { clearAllDeleting } = useDeletingSnippets();

	// Clear all deleting states when the component mounts (fresh page load or navigation)
	useEffect(() => {
		clearAllDeleting();
	}, [clearAllDeleting]);

	return <SnippetList snippets={snippets} />;
}
