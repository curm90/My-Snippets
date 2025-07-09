'use server';

import prisma from '@/lib/prisma';
import { processedFormSchema } from '@/lib/schemas';
import { getCurrentUser } from '@/lib/session';

async function createTagConnections(tags: string[]) {
	if (!tags || tags.length === 0) {
		return [];
	}

	return await Promise.all(
		tags.map(async (tagName) => {
			// Try to find existing tag first
			let tag = await prisma.tag.findFirst({
				where: { name: tagName },
			});

			// If not found, create it
			if (!tag) {
				tag = await prisma.tag.create({
					data: { name: tagName },
				});
			}

			return { id: tag.id };
		}),
	);
}

export async function getSnippetsForCurrentUser(searchQuery?: string) {
	const user = await getCurrentUser();

	return await prisma.snippet.findMany({
		where: {
			userId: user.id,
			...(searchQuery && {
				OR: [
					{ title: { contains: searchQuery, mode: 'insensitive' } },
					{ content: { contains: searchQuery, mode: 'insensitive' } },
					{ language: { contains: searchQuery, mode: 'insensitive' } },
				],
			}),
		},
		include: {
			snippetTags: true,
		},
		orderBy: { id: 'desc' },
	});
}

export async function getSnippetById(snippetId: string): Promise<Snippet | null> {
	if (!snippetId) {
		throw new Error('Snippet ID is required');
	}

	try {
		const snippet = await prisma.snippet.findUnique({
			where: { id: snippetId },
			include: {
				snippetTags: true,
			},
		});

		return snippet;
	} catch (error) {
		console.error('Error fetching snippet by ID:', error);
		throw new Error('Failed to fetch snippet');
	}
}

export async function createSnippet(prevState: ActionState | null, data: unknown): Promise<ActionState> {
	if (!(data instanceof FormData)) {
		throw new Error('Invalid data format. Expected FormData.');
	}

	try {
		const user = await getCurrentUser();
		const formData = Object.fromEntries(data.entries());

		const validatedData = processedFormSchema.safeParse(formData);

		if (!validatedData.success) {
			return {
				errors: validatedData.error.flatten().fieldErrors,
				success: false,
			};
		}

		const snippetData = validatedData.data;
		const { title, language, snippet, folderId, tags } = snippetData;

		// Handle tags - create/connect to existing tags
		const tagConnections = await createTagConnections(tags || []);

		const createdSnippet = await prisma.snippet.create({
			data: {
				title,
				language,
				content: snippet,
				folderId: folderId || null,
				userId: user.id,
				snippetTags: {
					connect: tagConnections,
				},
			},
		});

		return {
			id: createdSnippet.id,
			success: true,
		};
	} catch (error) {
		console.error('Unexpected error:', error);
		return {
			errors: { server: ['Failed to create snippet'] },
			success: false,
		};
	}
}

export async function editSnippet(prevState: ActionState | null, data: unknown): Promise<ActionState> {
	if (!(data instanceof FormData)) {
		throw new Error('Invalid data format. Expected FormData.');
	}

	const user = await getCurrentUser();
	const formData = Object.fromEntries(data.entries());
	const validatedData = processedFormSchema.safeParse(formData);

	if (!validatedData.success) {
		return {
			errors: validatedData.error.flatten().fieldErrors,
			success: false,
		};
	}

	const { id, title, language, snippet, folderId, tags } = validatedData.data;

	if (!id) {
		return {
			errors: { message: ['Snippet ID is required'] },
			success: false,
		};
	}

	try {
		// Handle tags - create/connect to existing tags
		const tagConnections = await createTagConnections(tags || []);

		const updatedSnippet = await prisma.snippet.update({
			where: {
				id,
				userId: user.id, // Only allow updating own snippets
			},
			data: {
				title,
				language,
				content: snippet,
				folderId: folderId || null,
				snippetTags: {
					set: tagConnections, // Replace all existing tags with new ones
				},
			},
			include: {
				snippetTags: true,
			},
		});

		if (!updatedSnippet) {
			return {
				errors: { message: ['Snippet not found or update failed'] },
				success: false,
			};
		}

		return {
			id: updatedSnippet.id,
			success: true,
		};
	} catch (error) {
		console.error('Unexpected error:', error);
		return {
			errors: { server: ['Failed to update snippet'] },
			success: false,
		};
	}
}

export async function deleteSnippet(snippetId: string) {
	if (!snippetId) {
		throw new Error('Snippet ID is required');
	}

	const user = await getCurrentUser();

	try {
		const deletedSnippet = await prisma.snippet.delete({
			where: {
				id: snippetId,
				userId: user.id, // Only allow deleting own snippets
			},
		});

		return { id: deletedSnippet.id };
	} catch (error) {
		console.error('Unexpected error:', error);
		throw new Error('An unexpected error occurred while deleting the snippet.');
	}
}
