import { useEffect, FC } from 'react';

import type { ShortcutInputProps } from './shortcut-input.types';
import { useShortcutInput } from './lib/use-shortcut-input';
import './shortcut-input.styles.css';

const ShortcutInput: FC<ShortcutInputProps> = ({value, modifiers, onChange}) => {
	const {
		isFocused,
		inputRef,
		handleFocus,
		handleBlur,
		handleKeyDown,
		handleKeyUp,
		renderContent
	} = useShortcutInput(value, modifiers, onChange);

	useEffect(() => {
		if (isFocused && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isFocused]);

	return (
		<div
			ref={inputRef}
			className={`shortcut-input ${isFocused ? 'focused' : ''}`}
			tabIndex={0}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
		>
			{renderContent()}
		</div>
	);
};

export default ShortcutInput;