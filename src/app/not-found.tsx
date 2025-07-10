import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='min-h-screen bg-background text-foreground flex items-center justify-center px-4'>
			<div className='text-center max-w-md mx-auto'>
				{/* Logo */}
				<div className='mb-8'>
					<Image 
						src='/logo.png' 
						alt='Code Snippets Logo' 
						width={80} 
						height={80} 
						className='rounded-full mx-auto'
					/>
				</div>

				{/* 404 Text */}
				<div className='mb-8'>
					<h1 className='text-6xl font-bold text-action mb-2'>404</h1>
					<h2 className='text-2xl font-semibold mb-4'>Oops! Not Found</h2>
					<p className='text-muted-foreground text-lg'>
						The page you&apos;re looking for doesn&apos;t exist or has been moved.
					</p>
				</div>

				{/* Home Button */}
				<Link href='/' passHref>
					<Button className='bg-action hover:bg-action/90 text-action-foreground px-6 py-3 text-lg'>
						<Home className='w-5 h-5 mr-2' />
						Go Home
					</Button>
				</Link>

				{/* Additional helpful text */}
				<div className='mt-8 pt-8 border-t border-border'>
					<p className='text-sm text-muted-foreground'>
						Looking for your snippets? Check out your{' '}
						<Link href='/' className='text-action hover:underline'>
							dashboard
						</Link>{' '}
						or{' '}
						<Link href='/create-snippet' className='text-action hover:underline'>
							create a new snippet
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
