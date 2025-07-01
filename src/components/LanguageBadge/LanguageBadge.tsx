import { getLanguageColors } from '@/lib/languageColors';
import { cn } from '@/lib/utils';

type LanguageBadgeProps = {
	language: string;
	className?: string;
	size?: 'sm' | 'md' | 'lg';
};

export default function LanguageBadge({ language, className, size = 'md' }: LanguageBadgeProps) {
	const colors = getLanguageColors(language);

	const sizeClasses = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-sm',
		lg: 'px-4 py-1.5 text-base',
	};

	const displayName = language.charAt(0).toUpperCase() + language.slice(1);

	return (
		<div
			className={cn(
				'rounded-md font-medium transition-colors',
				colors.bg,
				colors.border,
				colors.text,
				'border',
				sizeClasses[size],
				className,
			)}
		>
			{displayName}
		</div>
	);
}
