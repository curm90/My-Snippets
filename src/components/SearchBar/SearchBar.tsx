'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
	const [isNavigationClear, setIsNavigationClear] = useState(false);
	const isUserTypingRef = useRef(false); // Initialize search query from URL params and clear when navigating away from search
	useEffect(() => {
		const q = searchParams.get('q');
		console.log('SearchBar useEffect - pathname:', pathname, 'q:', q);

		if (pathname === '/' && q) {
			// On home page with search query - show it
			console.log('Setting search query to:', q);
			setIsNavigationClear(false);
			setSearchQuery(q);
		} else {
			// On other pages or home without search - clear search input
			console.log('Clearing search query due to navigation');
			setIsNavigationClear(true);
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
		// Don't perform search if we just cleared due to navigation
		if (isNavigationClear && !debouncedSearchQuery.trim()) {
			console.log('Skipping search due to navigation clear');
			setIsNavigationClear(false);
			return;
		}

		// Only perform search if user is actively typing or we're on home page
		// This prevents stale debounced queries from interfering with navigation
		const urlSearchQuery = searchParams.get('q');
		const shouldSearch = isUserTypingRef.current || pathname === '/';

		if (!shouldSearch && pathname !== '/') {
			console.log('Skipping search - user not typing and not on home page');
			return;
		}

		if (debouncedSearchQuery.trim()) {
			// Search when there's a query
			console.log('Performing search for:', debouncedSearchQuery);
			performSearch(debouncedSearchQuery);
			// Reset typing flag after search
			isUserTypingRef.current = false;
		} else if (pathname === '/' && urlSearchQuery && !debouncedSearchQuery.trim()) {
			// Only clear search when on home page and URL has query but debounced query is empty
			console.log('Clearing search on home page');
			performSearch(debouncedSearchQuery);
		}
	}, [debouncedSearchQuery, performSearch, searchParams, pathname, isNavigationClear]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsNavigationClear(false); // User is typing, not navigation
		isUserTypingRef.current = true; // Mark that user is actively typing
		setSearchQuery(e.target.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			// Search immediately on Enter
			performSearch(searchQuery);
		}
	};

	const clearSearch = () => {
		isUserTypingRef.current = true; // Mark as user action
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
