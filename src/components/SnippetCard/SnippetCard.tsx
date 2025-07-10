'use client';

import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import SnippetActionButtons from '@/components/SnippetActionButtons/SnippetActionButtons';
import LanguageBadge from '@/components/LanguageBadge/LanguageBadge';

type SnippetCardProps = {
	id: string;
	title: string;
	language: string;
	content: string;
	showFullContent?: boolean;
	blurContent?: boolean;
	totalSnippetsInFolder?: number;
};

export default function SnippetCard({
	id,
	title,
	language,
	content,
	showFullContent = false,
	blurContent = false,
	totalSnippetsInFolder,
}: SnippetCardProps) {
	const { theme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Ensure component only renders themed content after mount
	useEffect(() => {
		setMounted(true);
	}, []);

	// Show loading skeleton until mounted and theme is resolved
	if (!mounted) {
		return (
			<Card className='mt-8 p-0 bg-secondary rounded-sm'>
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

	// After mounted, use theme with fallback
	const currentTheme = theme || resolvedTheme || 'dark';
	const syntaxTheme = currentTheme === 'dark' ? oneDark : oneLight;
	const blurGradientColor = currentTheme === 'dark' ? 'from-[#282c34]' : 'from-[#fafbfc]';

	return (
		<Card className='mt-8 p-0 bg-secondary group rounded-sm'>
			<CardHeader className='pt-4'>
				<div className='flex gap-4 items-center justify-between w-full'>
					<div className='flex items-center gap-4'>
						<span>{title}</span>
						<LanguageBadge language={language} />
					</div>
					<div className='flex gap-2 pointer-events-auto'>
						<SnippetActionButtons snippetId={id} content={content} totalSnippetsInFolder={totalSnippetsInFolder} />
					</div>
				</div>
			</CardHeader>
			<CardContent className='flex flex-col gap-4 p-0 relative'>
				<div className='overflow-hidden rounded-b-sm relative'>
					<SyntaxHighlighter
						customStyle={{
							overflow: 'hidden',
							borderRadius: 0,
							margin: 0,
						}}
						className={showFullContent ? '' : 'max-h-[100px]'}
						language={language.toLowerCase()}
						style={syntaxTheme}
						wrapLines={true}
						showLineNumbers={true}
					>
						{content}
					</SyntaxHighlighter>
					{blurContent && (
						<div
							className={`absolute inset-0 bg-gradient-to-t ${blurGradientColor} from-5% to-transparent pointer-events-none`}
						/>
					)}
				</div>
				{!showFullContent && (
					<div className='absolute inset-0 bg-background/70 text-action font-semibold flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-sm'>
						View Snippet
					</div>
				)}
			</CardContent>
		</Card>
	);
}
