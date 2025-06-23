import CreateSnippetForm from '@/components/CreateSnippetForm/CreateSnippetForm';

export default function Page() {
	return (
		<div className='py-6 px-8'>
			<h1 className='font-semibold text-xl'>Create a Snippet</h1>
			<p className='text-sm text-muted-foreground mt-1'>
				This information will be visible to others—please avoid sharing sensitive or private
				details.
			</p>
			<div className='mt-8'>
				<CreateSnippetForm />
			</div>
		</div>
	);
}
