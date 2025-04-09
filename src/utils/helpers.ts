import { KeyState } from '../shared/types/keys';

// Convert pressed keys to shortcut string
export const getShortcutString = (keys: KeyState): string => {

	const shortcut = [...keys.modifiersKeys];

	if (keys.nonModifierKey) {
		shortcut.push(keys.nonModifierKey)
	}

	return shortcut.join('+');
};

// Validate shortcut
export const isValidShortcut = (shortcut: string, modifiers: string[]): boolean => {
	if (!shortcut) return false;

	const parts = shortcut.split('+');
	const hasModifier = parts.some(part => modifiers.includes(part));
	const hasRegularKey = parts.some(part => !modifiers.includes(part));

	return hasModifier && hasRegularKey && parts.length >= 2;
};
