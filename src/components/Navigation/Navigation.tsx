import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
	return (
		<nav className='flex items-center justify-between py-4 px-8 bg-gray-800 text-white'>
			<div className='flex items-center space-x-6'>
				<Link href='/'>
					<Image src='/logo.png' alt='code tags' width={30} height={30} className='rounded-full' />
				</Link>
				<Link href='/'>Dashboard</Link>
			</div>
			<div className='flex items-center space-x-4 flex-1 justify-end px-6'>
				<div className='max-w-sm w-full'>
					<input
						className='border border-slate-200 rounded-md px-3 py-1 outline-none bg-[#465263] w-full placeholder:text-sm focus:bg-slate-200 focus:text-slate-950'
						type='search'
						placeholder='Search snippets'
					/>
				</div>
			</div>
			<div className='flex items-center space-x-6'>
				<button>Register</button>
				<button>Sign in</button>
			</div>
		</nav>
	);
}
