import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getLanguageColors } from '@/lib/languageColors';

export default function LanguageSelect({
	onChange,
	value,
	options,
}: {
	onChange: (value: string) => void;
	value: string;
	options: string[];
}) {
	const sortedOptions = options?.sort((a, b) => a.localeCompare(b));

	return (
		<Select name='language' onValueChange={onChange} value={value} defaultValue={value}>
			<SelectTrigger className='w-full'>
				<SelectValue placeholder='Select Language' />
			</SelectTrigger>
			<SelectContent>
				{sortedOptions?.map((lang) => {
					const colors = getLanguageColors(lang);
					return (
						<SelectItem key={lang} value={lang}>
							<div className='flex items-center gap-2'>
								<div className={`w-3 h-3 rounded-full ${colors.bg} ${colors.border} border`} />
								{lang.charAt(0).toUpperCase() + lang.slice(1)}
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
