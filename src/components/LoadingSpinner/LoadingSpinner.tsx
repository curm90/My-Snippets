export default function LoadingSpinner() {
	return (
		<div className='flex items-center justify-center min-h-[calc(100vh-var(--navbar-height))]'>
			<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75'></div>
		</div>
	);
}
