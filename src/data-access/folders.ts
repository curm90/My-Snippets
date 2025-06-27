'use server';

import prisma from '@/lib/prisma';
import { folderSchema } from '@/lib/schemas';

export async function createFolder(formData: unknown): Promise<Folder> {
	try {
		const validatedData = folderSchema.safeParse(formData);

		if (!validatedData.success) {
			console.log('Validation failed:', validatedData.error);
			throw new Error('Invalid folder data');
		}

		const { name } = validatedData.data;

		if (!name || name.length < 1 || name.length > 50) {
			throw new Error('Folder name must be between 1 and 50 characters');
		}

		const createdFolder = await prisma.folder.create({
			data: {
				name,
			},
		});

		console.log({ createdFolder });
		return createdFolder;
	} catch (error) {
		console.log('Error creating folder:', error);
		throw new Error('Failed to create folder');
	}
}
