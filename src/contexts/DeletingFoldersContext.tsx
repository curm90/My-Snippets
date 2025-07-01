'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type DeletingFoldersContextType = {
	deletingFolders: Set<string>;
	setFolderDeleting: (folderId: string, isDeleting: boolean) => void;
	isFolderDeleting: (folderId: string) => boolean;
	clearAllDeleting: () => void;
};

const DeletingFoldersContext = createContext<DeletingFoldersContextType | undefined>(undefined);

export function DeletingFoldersProvider({ children }: { children: ReactNode }) {
	const [deletingFolders, setDeletingFolders] = useState<Set<string>>(new Set());

	const setFolderDeleting = (folderId: string, isDeleting: boolean) => {
		setDeletingFolders((prev) => {
			const newSet = new Set(prev);
			if (isDeleting) {
				newSet.add(folderId);
			} else {
				newSet.delete(folderId);
			}
			return newSet;
		});
	};

	const isFolderDeleting = (folderId: string) => {
		return deletingFolders.has(folderId);
	};

	const clearAllDeleting = useCallback(() => {
		setDeletingFolders(new Set());
	}, []);

	return (
		<DeletingFoldersContext.Provider value={{ deletingFolders, setFolderDeleting, isFolderDeleting, clearAllDeleting }}>
			{children}
		</DeletingFoldersContext.Provider>
	);
}

export function useDeletingFolders() {
	const context = useContext(DeletingFoldersContext);
	if (context === undefined) {
		throw new Error('useDeletingFolders must be used within a DeletingFoldersProvider');
	}
	return context;
}
