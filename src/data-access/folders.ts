'use server';

import prisma from '@/lib/prisma';
import { folderSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/session';

export async function getFoldersForCurrentUser() {
	const user = await getCurrentUser();

	return await prisma.folder.findMany({
		where: { userId: user.id },
		orderBy: { createdAt: 'desc' },
	});
}

export async function createFolder(formData: unknown): Promise<Folder> {
	try {
		const user = await getCurrentUser();
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
				userId: user.id,
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
		const user = await getCurrentUser();

		if (!folderId) {
			throw new Error('Folder ID is required');
		}

		await prisma.folder.delete({
			where: {
				id: folderId,
				userId: user.id, // Only allow deleting own folders
			},
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
		const user = await getCurrentUser();

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
			where: {
				id: folderId,
				userId: user.id, // Only allow updating own folders
			},
			data: { name: validatedName },
		});

		revalidatePath('/');
		return updatedFolder;
	} catch (error) {
		console.log('Error updating folder:', error);
		throw new Error('Failed to update folder');
	}
}
