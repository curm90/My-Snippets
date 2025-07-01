'use client';

import { Suspense } from 'react';
import SearchBar from './SearchBar';
import SearchBarSkeleton from './SearchBarSkeleton';

export default function SearchBarWrapper() {
	return (
		<Suspense fallback={<SearchBarSkeleton />}>
			<SearchBar />
		</Suspense>
	);
}
