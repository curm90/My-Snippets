import { getCurrentUser } from '@/lib/session';

export default async function ProfilePage() {
	const user = await getCurrentUser();

	return (
		<section className='py-4 px-6'>
			<div className='max-w-2xl mx-auto'>
				<h1 className='text-3xl font-bold mb-6'>Profile Settings</h1>
				<div className='bg-card rounded-lg border p-6'>
					<h2 className='text-xl font-semibold mb-4'>Account Information</h2>
					<div className='space-y-4'>
						<div>
							<label className='text-sm font-medium text-muted-foreground'>Name</label>
							<p className='text-lg'>{user.name || 'Not set'}</p>
						</div>
						<div>
							<label className='text-sm font-medium text-muted-foreground'>Email</label>
							<p className='text-lg'>{user.email}</p>
						</div>
					</div>
				</div>
				<div className='mt-6 text-muted-foreground'>
					<p className='text-sm'>Settings functionality coming soon...</p>
				</div>
			</div>
		</section>
	);
}
