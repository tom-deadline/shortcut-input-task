export interface ShortcutInputProps {
	value: string | null;
	modifiers: string[];
	onChange: (value: string) => void;
}