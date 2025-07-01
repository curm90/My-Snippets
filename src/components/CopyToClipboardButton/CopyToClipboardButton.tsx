'use client';

import { MouseEvent as ReactMouseEvent, useState } from 'react';
import { toast } from 'sonner';
import { Clipboard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CopyButton({ text, disabled }: { text: string; disabled?: boolean }) {
	const [copied, setCopied] = useState(false);

	const copy = async (e: ReactMouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();

		try {
			// Check if Clipboard API is available
			if (navigator.clipboard && navigator.clipboard.writeText) {
				// Attempt to copy text using the Clipboard API
				await navigator.clipboard.writeText(text);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} else {
				throw new Error('Clipboard API is not available');
			}
		} catch (err) {
			console.error('Failed to copy text using Clipboard API:', err);

			// Fallback for older browsers or if Clipboard API fails
			try {
				const textarea = document.createElement('textarea');
				textarea.value = text;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand('copy');
				document.body.removeChild(textarea);
				setCopied(true);
				toast.success('Copied to clipboard!');
				setTimeout(() => setCopied(false), 2000);
			} catch (fallbackErr) {
				console.error('Fallback copy method also failed:', fallbackErr);
				toast.error('Failed to copy text. Please try again.');
			}
		}
	};

	return (
		<Button variant='outline' size='icon' className='cursor-pointer' disabled={disabled} onClick={(e) => copy(e)}>
			{copied ? <Check className='h-4 w-4' /> : <Clipboard className='h-4 w-4' />}
		</Button>
	);
}
