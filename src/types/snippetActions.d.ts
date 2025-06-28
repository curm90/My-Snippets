type ActionState = {
	id?: string;
	errors?: Record<string, string[]>;
	success: boolean;
};

type ServerAction = (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
type ActionId = 'create' | 'edit';

type SnippetFormProps = {
	action: ServerAction;
	actionId?: ActionId;
	folders?: { id: string; name: string }[];
	defaultValues?: Partial<FormDataType>;
};
