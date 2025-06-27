'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CircleX, FolderPlus, LoaderCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { folderSchema } from '@/lib/schemas';
import { createFolder } from '@/data-access/folders';

type FolderFormValues = z.infer<typeof folderSchema>;

export default function CreateFolderForm() {
	const [showForm, setShowForm] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<FolderFormValues>({
		resolver: zodResolver(folderSchema),
		defaultValues: {
			name: '',
		},
	});

	const toggleForm = () => setShowForm((prev) => !prev);

	const onSubmit = async (data: FolderFormValues) => {
		setIsSubmitting(true);
		try {
			await createFolder(data);
			alert('Folder created successfully!');
			form.reset();
			setShowForm(false);
		} catch (error) {
			console.error('Failed to create folder:', error);
			alert('Failed to create folder');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<div className='flex justify-between gap-2 items-center text-muted-foreground font-semibold'>
				<span className='text-sm'>Folders</span>
				<Button onClick={toggleForm} variant='ghost' size='icon' className='p-2 cursor-pointer'>
					{showForm ? <CircleX size='16' /> : <FolderPlus size='16' />}
				</Button>
			</div>
			{showForm && (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex gap-2 mt-2'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input {...field} placeholder='Enter folder name' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className='py-0 px-1 cursor-pointer' type='submit'>
							{isSubmitting ? <LoaderCircle className='w-6 h-6 animate-spin' /> : 'Save'}
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
}
