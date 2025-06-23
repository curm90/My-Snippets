import { PrismaClient, Prisma } from '../src/app/generated/prisma';

const prisma = new PrismaClient();

const snippetData: Prisma.SnippetCreateInput[] = [
	{
		title: 'Hello World',
		language: 'javascript',
		content: `console.log("Hello, World!");`,
	},
	{
		title: 'Hello World',
		language: 'javascript',
		content: ` function initializeProperties(target, members) {
    var keys = Object.keys(members);
    var properties;
    var i, len;

    for (let i = 0; i < keys.length; i++) {
      console.log('test long snippets')
      console.log('test long snippets')
      console.log('test long snippets')
      console.log('test long snippets')
      console.log('test long snippets')
      console.log('test long snippets')
      console.log('test long snippets')
      console.log('test long snippets')
      console.log('test long snippets')
      console.log('test long snippets')
      console.log('test long snippets')
    }
 }`,
	},
];

export async function main() {
	for (const s of snippetData) {
		await prisma.snippet.create({ data: s });
	}
}

main();
