'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type TagInputProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
};

export default function TagInput({ value, onChange, placeholder, className }: TagInputProps) {
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	// Parse tags from the comma-separated string
	const tags = value
		? value
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0)
		: [];

	const addTag = (tagToAdd: string) => {
		const trimmedTag = tagToAdd.trim();
		if (trimmedTag && !tags.includes(trimmedTag)) {
			const newTags = [...tags, trimmedTag];
			onChange(newTags.join(', '));
		}
		setInputValue('');
	};

	const removeTag = (tagToRemove: string) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove);
		onChange(newTags.join(', '));
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			if (inputValue.trim()) {
				addTag(inputValue);
			}
		} else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
			// Remove last tag when backspace is pressed on empty input
			removeTag(tags[tags.length - 1]);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		// Handle comma input
		if (newValue.includes(',')) {
			const newTag = newValue.replace(',', '').trim();
			if (newTag) {
				addTag(newTag);
			}
		} else {
			setInputValue(newValue);
		}
	};

	return (
		<div className={cn('min-h-10 w-full', className)}>
			<div className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] flex-wrap gap-2'>
				{tags.map((tag, index) => (
					<div
						key={index}
						className='flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-300 rounded-sm'
					>
						<span>{tag}</span>
						<button
							type='button'
							onClick={() => removeTag(tag)}
							className='flex items-center justify-center w-4 h-4 rounded-sm hover:bg-blue-500/20 transition-colors'
						>
							<X className='w-3 h-3' />
						</button>
					</div>
				))}
				<input
					ref={inputRef}
					type='text'
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder={tags.length === 0 ? placeholder : 'Add another tag...'}
					className='flex-1 min-w-[120px] border-0 bg-transparent outline-none placeholder:text-muted-foreground'
				/>
			</div>
		</div>
	);
}
