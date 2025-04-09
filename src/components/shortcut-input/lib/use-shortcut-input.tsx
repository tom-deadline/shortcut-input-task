import { KeyboardEvent, useRef, useState } from 'react';

import { KeyState } from '../../../shared/types/keys';
import { MODIFIER_KEYS_MAP } from '../../../shared/const/modifiers';
import { getShortcutString, isValidShortcut } from '../../../utils/helpers';

export const useShortcutInput = (value,modifiers, onChange) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [currentKeys, setCurrentKeys] = useState<KeyState>({
		modifiersKeys: []
	});
	const inputRef = useRef<HTMLDivElement | null>(null);

	const handleFocus = () => {
		setIsFocused(true);
		setCurrentKeys({
			modifiersKeys: [],
		});
	};

	const handleBlur = () => {
		setIsFocused(false);
		setCurrentKeys({
			modifiersKeys: [],
		});
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		e.preventDefault();

		const key = e.code === 'Space' ? 'Space' : e.key;
		const newModifierKey = MODIFIER_KEYS_MAP[key];

		if (newModifierKey) {
			setCurrentKeys(prev => ({
				...prev,
				modifiersKeys: [...prev.modifiersKeys, newModifierKey]
			}));

		} else if (currentKeys.nonModifierKey !== key) {
			setCurrentKeys(prev => ({
				...prev,
				nonModifierKey: key,
			}));
		}
	};

	const handleKeyUp = (e: KeyboardEvent) => {
		const key = e.code === ' ' ? 'Space' : e.key;
		const modifierKey = MODIFIER_KEYS_MAP[key];

		if (modifierKey) {
			setCurrentKeys(prev => ({
				...prev,
				modifiersKeys: [...prev.modifiersKeys.filter(modifier => modifier !== modifierKey)]
			}));
		} else {
			const newShortcut = getShortcutString({
				...currentKeys,
			});

			if (isValidShortcut(newShortcut, modifiers)) {
				onChange(newShortcut);
			}

			setCurrentKeys({
				modifiersKeys: [],
			});
		}
	};

	const renderContent = () => {
		if (!value) {
			const shortcut = getShortcutString(currentKeys);

			if (!shortcut) {
				return <span className="placeholder">Press Shortcut</span>
			}

			return <span className="placeholder">{shortcut}</span>
		}

		return value;
	};

	return {
		isFocused,
		inputRef,
		handleFocus,
		handleBlur,
		handleKeyDown,
		handleKeyUp,
		renderContent
	}
};
