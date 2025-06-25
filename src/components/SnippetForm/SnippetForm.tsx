'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CodeMirror from '@uiw/react-codemirror';
import { nord } from '@uiw/codemirror-theme-nord';
import { loadLanguage, langNames } from '@uiw/codemirror-extensions-langs';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LanguageSelect from '@/components/LanguageSelect/LanguageSelect';
import { FormDataType, formSchema } from '@/lib/schemas';
// import { createSnippet } from '@/data-access/snippets';

export default function SnippetForm({
	action,
	defaultValues,
	snippetId,
}: {
	action: (data: unknown, snippetId?: string) => Promise<void>;
	defaultValues?: Partial<FormDataType>;
	snippetId?: string; // Optional for edit mode
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			language: '',
			snippet: '',
			...defaultValues,
		},
	});

	async function handleSubmit(data: FormDataType) {
		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('language', data.language);
		formData.append('snippet', data.snippet);

		await action(formData, snippetId);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<div className='grid grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-semibold'>Title</FormLabel>
								<FormControl>
									<Input placeholder='Title' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='language'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-semibold'>Language</FormLabel>
								<FormControl>
									<LanguageSelect onChange={field.onChange} value={field.value} options={langNames} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='snippet'
					render={({ field }) => {
						const selectedLang = form.getValues('language');
						const languageExtension = loadLanguage(selectedLang as Parameters<typeof loadLanguage>[0]) || [];

						return (
							<FormItem>
								<FormLabel className='font-semibold'>Snippet</FormLabel>
								<FormControl>
									<div className='border border-input bg-transparent rounded-md overflow-hidden py-1 min-h-24'>
										<CodeMirror extensions={[languageExtension]} theme={nord} {...field} />
										<textarea
											name='snippet'
											value={field.value || ''}
											onChange={(e) => field.onChange(e.target.value)} // Sync changes back to react-hook-form
											className='hidden'
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<div className='flex items-center justify-end space-x-2'>
					<Button type='button' variant='outline' className='cursor-pointer' onClick={() => form.reset()}>
						Cancel
					</Button>
					<Button type='submit' className='bg-action text-foreground hover:bg-action/90 cursor-pointer'>
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
}
