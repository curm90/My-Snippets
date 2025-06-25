import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import SnippetActionButtons from '@/components/SnippetActionButtons/SnippetActionButtons';

type SnippetCardProps = {
	id: string;
	title: string;
	language: string;
	content: string;
	showFullContent?: boolean;
	blurContent?: boolean;
};

export default function SnippetCard({
	id,
	title,
	language,
	content,
	showFullContent = false,
	blurContent = false,
}: SnippetCardProps) {
	return (
		<Card className='mt-8 p-0 bg-secondary group'>
			<CardHeader className='pt-4'>
				<div className='flex gap-4 items-center justify-between w-full'>
					<div className='flex items-center gap-4'>
						<span>{title}</span>
						<div className='px-4 py-1 rounded-md bg-chart-1/30 border border-chart-1/50'>
							<span className='bg-opacity-20'>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
						</div>
					</div>
					<div className='flex gap-2 pointer-events-auto'>
						<SnippetActionButtons snippetId={id} content={content} />
					</div>
				</div>
			</CardHeader>
			<CardContent className='flex flex-col gap-4 p-0 relative'>
				<div className='overflow-hidden rounded-b-xl relative'>
					<SyntaxHighlighter
						customStyle={{
							overflow: 'hidden',
							borderRadius: 0,
							margin: 0,
						}}
						className={showFullContent ? '' : 'max-h-[100px]'}
						language={language.toLowerCase()}
						style={oneDark}
						wrapLines={true}
						showLineNumbers={true}
					>
						{content}
					</SyntaxHighlighter>
					{blurContent && (
						<div className='absolute inset-0 bg-gradient-to-t from-[#282c34] from-5% to-transparent pointer-events-none' />
					)}
				</div>
				{!showFullContent && (
					<div className='absolute inset-0 bg-background/70 text-action font-semibold flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-xl'>
						View Snippet
					</div>
				)}
			</CardContent>
		</Card>
	);
}
