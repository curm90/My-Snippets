'use server';

import prisma from '@/lib/prisma';
import { formSchema } from '@/lib/schemas';
import { redirect } from 'next/navigation';

export async function createSnippet(data: unknown) {
	if (!(data instanceof FormData)) {
		throw new Error('Invalid data format. Expected FormData.');
	}

	let snippetId: string | null = null;

	try {
		// Validate the data
		const formData = Object.fromEntries(data.entries());
		const validatedData = formSchema.safeParse(formData);
		console.log({ data, formData, validatedData });

		if (!validatedData.success) {
			const errors = validatedData.error.flatten();
			console.error('Validation failed:', errors);
			throw new Error('Validation failed: ' + JSON.stringify(errors.fieldErrors));
		}

		// Extract validated data
		const snippetData = validatedData.data;
		console.log({ snippetData });

		const { title, language, snippet } = snippetData;

		// Save to the database
		const createdSnippet = await prisma.snippet.create({
			data: {
				title,
				language,
				content: snippet,
			},
		});

		snippetId = createdSnippet.id;

		// Return the created snippet
		console.log({ createdSnippet });
	} catch (error) {
		// Log unexpected errors
		console.error('Unexpected error:', error);
		throw new Error('An unexpected error occurred while creating the snippet.');
	}

	redirect(`/snippet/${snippetId}`);
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
		return deletedSnippet;
	} catch (error) {
		// Log unexpected errors
		console.error('Unexpected error:', error);
		throw new Error('An unexpected error occurred while deleting the snippet.');
	}
}
