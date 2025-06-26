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
	defaultValues?: Partial<FormDataType>;
};
