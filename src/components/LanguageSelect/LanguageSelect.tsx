import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
		<Select onValueChange={onChange} value={value} defaultValue={value}>
			<SelectTrigger className='w-full'>
				<SelectValue placeholder='Select Language' />
			</SelectTrigger>
			<SelectContent>
				{sortedOptions?.map((lang) => (
					<SelectItem key={lang} value={lang}>
						{lang.charAt(0).toUpperCase() + lang.slice(1)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
