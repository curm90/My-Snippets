'use server';

import prisma from '@/lib/prisma';
import { formSchema } from '@/lib/schemas';

export async function createSnippet(prevState: ActionState | null, data: unknown): Promise<ActionState> {
	if (!(data instanceof FormData)) {
		throw new Error('Invalid data format. Expected FormData.');
	}

	try {
		const formData = Object.fromEntries(data.entries());
		const validatedData = formSchema.safeParse(formData);

		if (!validatedData.success) {
			return {
				errors: validatedData.error.flatten().fieldErrors,
				success: false,
			};
		}

		const snippetData = validatedData.data;
		const { title, language, snippet, folderId } = snippetData;

		const createdSnippet = await prisma.snippet.create({
			data: {
				title,
				language,
				content: snippet,
				folderId: folderId || null,
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
	const validatedData = formSchema.safeParse(formData);

	if (!validatedData.success) {
		return {
			errors: validatedData.error.flatten().fieldErrors,
			success: false,
		};
	}

	const { id, title, language, snippet, folderId } = validatedData.data;

	if (!id) {
		return {
			errors: { message: ['Snippet ID is required'] },
			success: false,
		};
	}

	try {
		const updatedSnippet = await prisma.snippet.update({
			where: { id },
			data: {
				title,
				language,
				content: snippet,
				folderId: folderId || null,
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
