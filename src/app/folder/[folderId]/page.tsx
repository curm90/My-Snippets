import React from 'react';
import prisma from '@/lib/prisma';
import SnippetList from '@/components/SnippetList/SnippetList';

export default async function Page({ params }: { params: Promise<{ folderId: string }> }) {
	const { folderId } = await params;
	const snippets = await prisma.snippet.findMany({
		where: { folderId },
	});

	return (
		<section className='py-4 px-6'>
			<h1 className='text-3xl'>Welcome Liam!</h1>
			<SnippetList snippets={snippets} />
		</section>
	);
}
