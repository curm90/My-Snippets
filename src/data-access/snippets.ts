'use server';

import prisma from '@/lib/prisma';
import { processedFormSchema } from '@/lib/schemas';

export async function createSnippet(prevState: ActionState | null, data: unknown): Promise<ActionState> {
	console.log({ data });

	if (!(data instanceof FormData)) {
		throw new Error('Invalid data format. Expected FormData.');
	}

	try {
		const formData = Object.fromEntries(data.entries());
		console.log({ formData });

		const validatedData = processedFormSchema.safeParse(formData);

		if (!validatedData.success) {
			return {
				errors: validatedData.error.flatten().fieldErrors,
				success: false,
			};
		}

		const snippetData = validatedData.data;
		console.log({ snippetData, formData, validatedData });
		const { title, language, snippet, folderId, tags } = snippetData;

		// Handle tags - create/connect to existing tags
		const tagConnections =
			tags && tags.length > 0
				? await Promise.all(
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
				  )
				: [];

		const createdSnippet = await prisma.snippet.create({
			data: {
				title,
				language,
				content: snippet,
				folderId: folderId || null,
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
		const tagConnections =
			tags && tags.length > 0
				? await Promise.all(
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
				  )
				: [];

		const updatedSnippet = await prisma.snippet.update({
			where: { id },
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

		console.log('Snippet updated successfully:', updatedSnippet);
		return {
			id: updatedSnippet.id,
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

export async function deleteSnippet(snippetId: string) {
	if (!snippetId) {
		throw new Error('Snippet ID is required');
	}

	try {
		const deletedSnippet = await prisma.snippet.delete({
			where: { id: snippetId },
		});

		return { id: deletedSnippet.id };
	} catch (error) {
		console.error('Unexpected error:', error);
		throw new Error('An unexpected error occurred while deleting the snippet.');
	}
}
