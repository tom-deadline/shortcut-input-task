export interface ShortcutInputProps {
	value: string | null;
	modifiers: string[];
	onChange: (value: string) => void;
}

export interface UseShortcutInput {
	value: string | null;
	modifiers: string[];
	onChange: (value: string) => void;
}