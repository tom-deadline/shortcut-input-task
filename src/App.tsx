import { useState } from 'react';

import ShortcutInput from './components/shortcut-input';

function App() {
  const [shortcut, setShortcut] = useState<string | null>(null);

  return (
    <div>
      <ShortcutInput
        value={shortcut}
        modifiers={['Control', 'Alt', 'Shift', 'CapsLock', 'Meta']}
        onChange={setShortcut}
      />
    </div>
  );
}

export default App
