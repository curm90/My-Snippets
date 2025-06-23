'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
	title: z.string().min(2).max(50),
});

export default function CreateSnippetForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
				</div>
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
