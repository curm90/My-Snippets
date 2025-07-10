'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error('Application error:', error);
	}, [error]);

	return (
		<div className='min-h-screen bg-background text-foreground flex items-center justify-center px-4'>
			<div className='text-center max-w-md mx-auto'>
				{/* Logo */}
				<div className='mb-8'>
					<Image src='/logo.png' alt='Code Snippets Logo' width={80} height={80} className='rounded-full mx-auto' />
				</div>

				{/* Error Icon */}
				<div className='mb-6'>
					<AlertTriangle className='w-16 h-16 text-destructive mx-auto mb-4' />
				</div>

				{/* Error Text */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-destructive mb-2'>Something went wrong!</h1>
					<h2 className='text-xl font-semibold mb-4'>Unexpected Error</h2>
					<p className='text-muted-foreground text-base'>
						We encountered an unexpected error. This has been logged and we&apos;ll look into it.
					</p>
					{process.env.NODE_ENV === 'development' && (
						<details className='mt-4 text-left'>
							<summary className='cursor-pointer text-sm text-muted-foreground hover:text-foreground'>
								Error Details (Development)
							</summary>
							<pre className='mt-2 p-4 bg-secondary rounded-md text-xs text-destructive overflow-auto max-h-32'>
								{error.message}
							</pre>
						</details>
					)}
				</div>

				{/* Action Buttons */}
				<div className='space-y-4'>
					<Button
						onClick={reset}
						className='bg-action hover:bg-action/90 text-action-foreground px-6 py-3 text-lg w-full'
					>
						<RefreshCw className='w-5 h-5 mr-2' />
						Try Again
					</Button>

					<Link href='/' className='block'>
						<Button variant='outline' className='px-6 py-3 text-lg w-full'>
							<Home className='w-5 h-5 mr-2' />
							Go Home
						</Button>
					</Link>
				</div>

				{/* Additional helpful text */}
				<div className='mt-8 pt-8 border-t border-border'>
					<p className='text-sm text-muted-foreground'>
						If this problem persists, try refreshing the page or go back to your{' '}
						<Link href='/' className='text-action hover:underline'>
							dashboard
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
