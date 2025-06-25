'use server';

import prisma from '@/lib/prisma';
import { formSchema } from '@/lib/schemas';

export async function createSnippet(data: unknown) {
	if (!(data instanceof FormData)) {
		throw new Error('Invalid data format. Expected FormData.');
	}

	try {
		// Validate the data
		const formData = Object.fromEntries(data.entries());
		const validatedData = formSchema.safeParse(formData);

		if (!validatedData.success) {
			const errors = validatedData.error.flatten();
			console.error('Validation failed:', errors);
			throw new Error('Validation failed: ' + JSON.stringify(errors.fieldErrors));
		}

		// Extract validated data
		const snippetData = validatedData.data;

		const { title, language, snippet } = snippetData;

		// Save to the database
		const createdSnippet = await prisma.snippet.create({
			data: {
				title,
				language,
				content: snippet,
			},
		});

		// Return the created snippet
		console.log({ createdSnippet });
	} catch (error) {
		// Log unexpected errors
		console.error('Unexpected error:', error);
		throw new Error('An unexpected error occurred while creating the snippet.');
	}
}

export async function deleteSnippet(snippetId: string) {
	if (!snippetId) {
		throw new Error('Snippet ID is required');
	}

	try {
		// Delete the snippet from the database
		const deletedSnippet = await prisma.snippet.delete({
			where: { id: snippetId },
		});

		// Return the deleted snippet
		console.log({ deletedSnippet });
	} catch (error) {
		// Log unexpected errors
		console.error('Unexpected error:', error);
		throw new Error('An unexpected error occurred while deleting the snippet.');
	}
}

export async function editSnippet(data: unknown, snippetId?: string) {
	if (!snippetId) {
		throw new Error('Snippet ID is required');
	}

	const formData = data instanceof FormData ? Object.fromEntries(data.entries()) : data;

	// Validate the data
	const validatedData = formSchema.safeParse(formData);

	if (!validatedData.success) {
		const errors = validatedData.error.flatten();
		console.error('Validation failed:', errors);
		throw new Error('Validation failed: ' + JSON.stringify(errors.fieldErrors));
	}

	// Extract validated data
	const snippetData = validatedData.data;

	const { title, language, snippet } = snippetData;

	try {
		const updatedSnippet = await prisma.snippet.update({
			where: { id: snippetId },
			data: {
				title,
				language,
				content: snippet,
			},
		});

		if (!updatedSnippet) {
			throw new Error('Snippet not found or update failed');
		}

		console.log('Snippet updated successfully:', updatedSnippet);
	} catch (error) {
		// Log unexpected errors
		console.error('Unexpected error:', error);
		throw new Error('An unexpected error occurred while editing the snippet.');
	}
}
