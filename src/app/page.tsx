import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card';
import SnippetActionButtons from '@/components/SnippetActionButtons/SnippetActionButtons';

export default async function Home() {
	const snippets = await prisma.snippet.findMany();

	console.log({ snippets });

	return (
		<section className='py-4 px-6'>
			<h1 className='text-3xl'>Welcome Liam!</h1>
			{snippets.length > 0 ? (
				snippets.map(({ id, title, language, content }) => (
					<Link key={id} href={`/snippet/${id}`}>
						<Card className='mt-8 p-0 bg-secondary'>
							<CardHeader className='pt-4'>
								<div className='flex gap-4 items-center justify-between w-full '>
									<div className='flex items-center gap-4'>
										<span>{title}</span>
										<div className='px-4 py-2 rounded-md bg-chart-1/30 border border-chart-1/50'>
											<span className='bg-opacity-20'>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
										</div>
									</div>
									<div className='flex gap-2'>
										<SnippetActionButtons />
									</div>
								</div>
							</CardHeader>
							<CardContent className='flex flex-col gap-4 p-0'>
								<div>
									<div className='overflow-hidden rounded-md relative'>
										<SyntaxHighlighter
											customStyle={{
												overflow: 'hidden',
												borderRadius: 0,
												marginBottom: 0,
											}}
											className='max-h-[100px]'
											language={language.toLowerCase()}
											style={oneDark}
											wrapLines={true}
											showLineNumbers={true}
										>
											{content}
										</SyntaxHighlighter>
										<div className='absolute inset-0 bg-gradient-to-t from-[#282c34] from-5% to-transparent pointer-events-none' />
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				))
			) : (
				<span className='italic'>No snippets to show</span>
			)}
		</section>
	);
}
