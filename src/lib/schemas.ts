import { z } from 'zod';

export const formSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(2).max(50),
	language: z.string().min(1, 'Language is required'),
	snippet: z.string().min(1, 'Snippet is required'),
	folderId: z.string().optional(),
});

export type FormDataType = z.infer<typeof formSchema>;

export const folderSchema = z.object({
	name: z.string().min(1, 'Folder name is required').max(50, 'Folder name must be less than 50 characters'),
});

export type FolderDataType = z.infer<typeof folderSchema>;
