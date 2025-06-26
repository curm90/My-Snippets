import { z } from 'zod';

export const formSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(2).max(50),
	language: z.string().min(1, 'Language is required'),
	snippet: z.string().min(1, 'Snippet is required'),
});

export type FormDataType = z.infer<typeof formSchema>;
