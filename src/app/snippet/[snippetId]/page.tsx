import prisma from '@/lib/prisma';

export default async function Page({ params }: { params: Promise<{ snippetId: string }> }) {
	const { snippetId } = await params;
	const snippet = await prisma.snippet.findUnique({
		where: { id: snippetId },
	});

	if (!snippet) {
		return <div className='text-red-500'>Snippet not found</div>;
	}

	const { id } = snippet || {};

	console.log({ snippetId, snippet });

	return (
		<section className='py-4 px-6'>
			<div>{id}</div>
		</section>
	);
}
