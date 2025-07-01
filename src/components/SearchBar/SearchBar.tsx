'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

	// Initialize search query from URL params and clear when navigating away from search
	useEffect(() => {
		const q = searchParams.get('q');
		if (pathname === '/' && q) {
			// On home page with search query - show it
			setSearchQuery(q);
		} else {
			// On other pages or home without search - clear search input
			setSearchQuery('');
		}
	}, [searchParams, pathname]);

	const performSearch = useCallback(
		(query: string) => {
			if (query.trim()) {
				// If not on home page, navigate to home page with search query
				if (pathname !== '/') {
					router.push(`/?q=${encodeURIComponent(query.trim())}`);
				} else {
					// If on home page, just update the search params
					const params = new URLSearchParams();
					params.set('q', query.trim());
					router.push(`/?${params.toString()}`);
				}
			} else {
				// Clear search - navigate to home without query params
				router.push('/');
			}
		},
		[router, pathname],
	);

	// Automatically search when debounced query changes
	useEffect(() => {
		// Only perform search if:
		// 1. There's a search query (from any page), OR
		// 2. We're on home page and clearing a search (URL has 'q' param but debounced query is empty)
		const urlSearchQuery = searchParams.get('q');

		if (debouncedSearchQuery.trim()) {
			// Always search when there's a query (from any page)
			performSearch(debouncedSearchQuery);
		} else if (pathname === '/' && urlSearchQuery && !debouncedSearchQuery.trim()) {
			// Only clear search when on home page
			performSearch(debouncedSearchQuery);
		}
	}, [debouncedSearchQuery, performSearch, searchParams, pathname]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			// Search immediately on Enter
			performSearch(searchQuery);
		}
	};

	const clearSearch = () => {
		setSearchQuery('');
		router.push('/');
	};

	return (
		<div className='relative max-w-sm w-full'>
			<div className='relative'>
				<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
				<Input
					type='text'
					placeholder='Search snippets...'
					value={searchQuery}
					onChange={handleInputChange}
					onKeyDown={handleKeyPress}
					className='pl-10 pr-10'
				/>
				{searchQuery && (
					<Button
						variant='ghost'
						size='sm'
						onClick={clearSearch}
						className='absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted'
					>
						<X className='h-3 w-3' />
					</Button>
				)}
			</div>
		</div>
	);
}
