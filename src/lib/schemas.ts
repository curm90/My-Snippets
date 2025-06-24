import { z } from 'zod';
import { langs } from '@uiw/codemirror-extensions-langs';

export const formSchema = z.object({
	title: z.string().min(2).max(50),
	language: z.enum(Object.keys(langs) as [keyof typeof langs, ...Array<keyof typeof langs>]), // Assert as a tuple
	snippet: z.string().min(1, 'Snippet is required'),
});

export type FormDataType = z.infer<typeof formSchema>;
