'use client';

import Image from 'next/image';
import * as React from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

type AvatarProps = {
	src?: string;
	alt?: string;
	fallback?: string;
	className?: string;
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ src, alt, fallback, className, ...props }, ref) => {
	const [imageError, setImageError] = React.useState(false);

	const getInitials = (name?: string) => {
		if (!name) return '';
		return name
			.split(' ')
			.map((part) => part.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<div
			ref={ref}
			className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted', className)}
			{...props}
		>
			{src && !imageError ? (
				<Image
					src={src}
					alt={alt || 'Avatar'}
					width={40}
					height={40}
					className='aspect-square h-full w-full object-cover'
					onError={() => setImageError(true)}
				/>
			) : fallback ? (
				<div className='flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-sm font-medium'>
					{getInitials(fallback)}
				</div>
			) : (
				<div className='flex h-full w-full items-center justify-center bg-muted text-muted-foreground'>
					<User className='h-5 w-5' />
				</div>
			)}
		</div>
	);
});
Avatar.displayName = 'Avatar';

export { Avatar };
