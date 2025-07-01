import { Skeleton } from '@/components/ui/skeleton';

export default function SearchBarSkeleton() {
	return (
		<div className='relative max-w-sm w-full'>
			<div className='relative'>
				{/* Search icon skeleton */}
				<Skeleton className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 rounded' />

				{/* Input field skeleton */}
				<Skeleton className='h-10 w-full rounded-md pl-10 pr-10' />
			</div>
		</div>
	);
}
