import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type SnippetCardSkeletonProps = {
	showFullContent?: boolean;
};

export default function SnippetCardSkeleton({ showFullContent = false }: SnippetCardSkeletonProps) {
	return (
		<Card className='mt-8 p-0 bg-secondary rounded-sm animate-pulse'>
			<CardHeader className='pt-4'>
				<div className='flex gap-4 items-center justify-between w-full'>
					<div className='flex items-center gap-4'>
						<Skeleton className='h-6 w-32' />
						<Skeleton className='h-5 w-16 rounded-full' />
					</div>
					<div className='flex gap-2'>
						<Skeleton className='h-8 w-8' />
						<Skeleton className='h-8 w-8' />
					</div>
				</div>
			</CardHeader>
			<CardContent className='p-0'>
				<div className='overflow-hidden rounded-b-sm'>
					<Skeleton className={`w-full ${showFullContent ? 'h-64' : 'h-[100px]'}`} />
				</div>
			</CardContent>
		</Card>
	);
}
