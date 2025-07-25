'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useActionState, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { nord } from '@uiw/codemirror-theme-nord';
import { githubLight } from '@uiw/codemirror-theme-github';
import { loadLanguage, langNames } from '@uiw/codemirror-extensions-langs';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LanguageSelect from '@/components/LanguageSelect/LanguageSelect';
import FolderSelect from '@/components/FolderSelect/FolderSelect';
import TagInput from '@/components/TagInput/TagInput';
import { FormDataType, formSchema } from '@/lib/schemas';
import { toastMessages } from '@/constants/toastMessages';

export default function SnippetForm({ action, folders, defaultValues, actionId = 'create' }: SnippetFormProps) {
	const [state, formAction, pending] = useActionState(action, null);
	const { theme } = useTheme();

	const router = useRouter();

	const form = useForm<FormDataType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: defaultValues?.id || '',
			title: defaultValues?.title || '',
			language: defaultValues?.language || '',
			snippet: defaultValues?.snippet || '',
			folderId: defaultValues?.folderId || 'none',
			// Convert array of tags to comma-separated string for form display
			tags: defaultValues?.tags
				? Array.isArray(defaultValues.tags)
					? defaultValues.tags.join(', ')
					: defaultValues.tags
				: '',
		},
	});

	useEffect(() => {
		if (!state) return;

		if (state.success && state.id) {
			router.push(`/snippet/${state.id}`);
			toast.success(toastMessages[actionId].success);
		} else if (state.errors) {
			toast.error(toastMessages[actionId].error);
			// Handle form errors...
		}
	}, [state, router, actionId]);

	return (
		<Form {...form}>
			<form action={formAction} className='space-y-8'>
				<div className='grid sm:grid-cols-2 gap-4 grid-cols-1'>
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
									<LanguageSelect options={langNames} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				{actionId === 'edit' ? (
					<FormField
						control={form.control}
						name='id'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-semibold'>Snippet id</FormLabel>
								<FormControl>
									<Input placeholder='Id' readOnly className='pointer-events-none text-gray-500' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				) : null}
				<FormField
					control={form.control}
					name='snippet'
					render={({ field }) => {
						const selectedLang = form.getValues('language');
						const languageExtension = loadLanguage(selectedLang as Parameters<typeof loadLanguage>[0]) || [];
						const codeTheme = theme === 'dark' ? nord : githubLight;

						return (
							<FormItem>
								<FormLabel className='font-semibold'>Snippet</FormLabel>
								<FormControl>
									<div className='border border-input bg-transparent rounded-md overflow-hidden py-1 min-h-24'>
										<CodeMirror extensions={[languageExtension]} theme={codeTheme} {...field} />
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
				<FormField
					control={form.control}
					name='folderId'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='font-semibold'>Folder</FormLabel>
							<FormControl>
								<FolderSelect {...field} folders={folders} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='tags'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='font-semibold'>Tags</FormLabel>
							<FormControl>
								<div>
									<TagInput
										value={field.value || ''}
										onChange={field.onChange}
										placeholder='Enter tags separated by commas (e.g., react, javascript, hooks)'
									/>
									<input
										name='tags'
										value={field.value || ''}
										onChange={(e) => field.onChange(e.target.value)}
										className='hidden'
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex items-center justify-end space-x-2'>
					<Button type='button' variant='outline' className='cursor-pointer' onClick={() => form.reset()}>
						Cancel
					</Button>
					<Button
						type='submit'
						className='bg-action text-action-foreground hover:bg-action/90 cursor-pointer w-[65px]'
						disabled={pending || !form.formState.isValid}
					>
						{pending ? <LoaderCircle className='w-6 h-6 animate-spin' /> : 'Save'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
