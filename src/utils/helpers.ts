import { KeyState } from '../shared/types/keys';

// Convert pressed keys to shortcut string
export const getShortcutString = (keys: KeyState): string => {
	const shortcut = [...keys.modifiersKeys, ...keys.nonModifierKey];
	return shortcut.join('+');
};

// Validate shortcut
export const isValidShortcut = (keys: KeyState): boolean => {
	if (!keys) return false;
	
	const hasModifier = keys.modifiersKeys.size > 0;
	const hasOneRegularKey = keys.nonModifierKey.size === 1;

	return hasModifier && hasOneRegularKey;
};
