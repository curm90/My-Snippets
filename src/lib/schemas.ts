import { z } from 'zod';

// Form schema for input handling (tags as string)
export const formSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(2).max(50),
	language: z.string().min(1, 'Language is required'),
	snippet: z.string().min(1, 'Snippet is required'),
	folderId: z.string().optional(),
	tags: z.string().optional(),
});

// Processing schema that transforms tags string to array and handles empty folderId
export const processedFormSchema = formSchema.transform((data) => ({
	...data,
	folderId: data.folderId && data.folderId.trim() !== '' && data.folderId !== 'none' ? data.folderId : null,
	tags: data.tags
		? data.tags
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0)
		: [],
}));

export type FormDataType = z.infer<typeof formSchema>;
export type ProcessedFormDataType = z.infer<typeof processedFormSchema>;

export const folderSchema = z.object({
	name: z.string().min(1, 'Folder name is required').max(50, 'Folder name must be less than 50 characters'),
});

export type FolderDataType = z.infer<typeof folderSchema>;
