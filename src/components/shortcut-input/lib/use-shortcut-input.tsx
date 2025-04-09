import { KeyboardEvent, useRef, useState } from 'react';

import { KeyState } from '../../../shared/types/keys';
import { getShortcutString, isValidShortcut } from '../../../utils/helpers';
import { UseShortcutInput } from '../shortcut-input.types';

export const useShortcutInput = ({ value, onChange, modifiers } : UseShortcutInput) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [currentKeys, setCurrentKeys] = useState<KeyState>({
		modifiersKeys: new Set([]),
		nonModifierKey: new Set([]),
	});
	const inputRef = useRef<HTMLDivElement | null>(null);

	const handleFocus = () => {
		setIsFocused(true);
		setCurrentKeys({
			modifiersKeys: new Set([]),
			nonModifierKey: new Set([]),
		});
	};

	const handleBlur = () => {
		setIsFocused(false);
		setCurrentKeys({
			modifiersKeys: new Set([]),
			nonModifierKey: new Set([]),
		});
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		e.preventDefault();

		if (e.repeat) {
			return;
		}

		const key = e.code === 'Space' ? 'Space' : e.key;
		const newModifierKey = modifiers.includes(key) ? key : null;

		if (newModifierKey) {
			setCurrentKeys(prev => ({
				...prev,
				modifiersKeys: new Set([...prev.modifiersKeys, newModifierKey])
			}));

		} else {
			setCurrentKeys(prev => ({
				...prev,
				nonModifierKey: new Set([...prev.nonModifierKey, key])
			}));
		}
	};

	const handleKeyUp = (e: KeyboardEvent) => {
		e.preventDefault();

		if (isValidShortcut(currentKeys)) {

			const newShortcut = getShortcutString({
				...currentKeys,
			});

			onChange(newShortcut);
		}

		setCurrentKeys({
			modifiersKeys: new Set([]),
			nonModifierKey: new Set([]),
		});
	};

	const renderContent = () => {
		const shortcut = value || getShortcutString(currentKeys);
		return <span className={value || "placeholder"}>{shortcut || 'Press Shortcut'}</span>;
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
