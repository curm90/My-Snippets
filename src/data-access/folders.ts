'use server';

import prisma from '@/lib/prisma';
import { folderSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

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

		revalidatePath('/');
		return createdFolder;
	} catch (error) {
		console.log('Error creating folder:', error);
		throw new Error('Failed to create folder');
	}
}

export async function deleteFolder(folderId: string): Promise<void> {
	try {
		if (!folderId) {
			throw new Error('Folder ID is required');
		}

		await prisma.folder.delete({
			where: { id: folderId },
		});

		console.log(`Folder with ID ${folderId} deleted successfully`);
		revalidatePath('/');
	} catch (error) {
		console.log('Error deleting folder:', error);
		throw new Error('Failed to delete folder');
	}
}

export async function updateFolder(folderId: string, name: string): Promise<Folder> {
	try {
		if (!folderId) {
			throw new Error('Folder ID is required');
		}

		const validatedData = folderSchema.safeParse({ name });

		if (!validatedData.success) {
			console.log('Validation failed:', validatedData.error);
			throw new Error('Invalid folder data');
		}

		const { name: validatedName } = validatedData.data;

		if (!validatedName || validatedName.length < 1 || validatedName.length > 50) {
			throw new Error('Folder name must be between 1 and 50 characters');
		}

		const updatedFolder = await prisma.folder.update({
			where: { id: folderId },
			data: { name: validatedName },
		});

		revalidatePath('/');
		return updatedFolder;
	} catch (error) {
		console.log('Error updating folder:', error);
		throw new Error('Failed to update folder');
	}
}
