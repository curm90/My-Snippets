import Link from 'next/link';
import React from 'react';
import SnippetCard from '@/components/SnippetCard/SnippetCard';
import prisma from '@/lib/prisma';

export default async function Page({ params }: { params: { folderId: Promise<string> } }) {
	const folderId = await params.folderId;
	const snippets = await prisma.snippet.findMany({
		where: { folderId },
	});

	return (
		<section className='py-4 px-6'>
			<h1 className='text-3xl'>Welcome Liam!</h1>
			{snippets.length > 0 ? (
				snippets.map(({ id, title, language, content }) => (
					<Link key={id} href={`/snippet/${id}`}>
						<SnippetCard title={title} language={language} content={content} id={id} blurContent />
					</Link>
				))
			) : (
				<span className='italic'>No snippets to show</span>
			)}
		</section>
	);
}
