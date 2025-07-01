'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type DeletingSnippetsContextType = {
	deletingSnippets: Set<string>;
	setSnippetDeleting: (snippetId: string, isDeleting: boolean) => void;
	isSnippetDeleting: (snippetId: string) => boolean;
	clearAllDeleting: () => void;
};

const DeletingSnippetsContext = createContext<DeletingSnippetsContextType | undefined>(undefined);

export function DeletingSnippetsProvider({ children }: { children: ReactNode }) {
	const [deletingSnippets, setDeletingSnippets] = useState<Set<string>>(new Set());

	const setSnippetDeleting = (snippetId: string, isDeleting: boolean) => {
		setDeletingSnippets((prev) => {
			const newSet = new Set(prev);
			if (isDeleting) {
				newSet.add(snippetId);
			} else {
				newSet.delete(snippetId);
			}
			return newSet;
		});
	};

	const isSnippetDeleting = (snippetId: string) => {
		return deletingSnippets.has(snippetId);
	};

	const clearAllDeleting = useCallback(() => {
		setDeletingSnippets(new Set());
	}, []);

	return (
		<DeletingSnippetsContext.Provider
			value={{ deletingSnippets, setSnippetDeleting, isSnippetDeleting, clearAllDeleting }}
		>
			{children}
		</DeletingSnippetsContext.Provider>
	);
}

export function useDeletingSnippets() {
	const context = useContext(DeletingSnippetsContext);
	if (context === undefined) {
		throw new Error('useDeletingSnippets must be used within a DeletingSnippetsProvider');
	}
	return context;
}
