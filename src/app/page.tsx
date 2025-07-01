import SnippetListWrapper from '@/components/SnippetListWrapper/SnippetListWrapper';
import prisma from '@/lib/prisma';

export default async function Home() {
	const snippets = await prisma.snippet.findMany();

	return (
		<section className='py-4 px-6'>
			<h1 className='text-3xl'>Welcome Liam!</h1>
			<SnippetListWrapper snippets={snippets} />
		</section>
	);
}
