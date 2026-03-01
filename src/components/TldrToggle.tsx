'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTldr } from '@/context/TldrContext';

export const TldrToggle = () => {
  const { isTldrMode, toggleTldrMode } = useTldr();
  const { colors } = useTheme();

  const handleToggle = () => {
    toggleTldrMode();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTldrMode();
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <button
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`group flex items-center rounded-full px-4 py-2 shadow-lg transition-all duration-300 ${
          isTldrMode
            ? `bg-yellow-500 text-white hover:bg-yellow-600`
            : `${colors.background} hover:bg-gray-100`
        }`}
        aria-pressed={isTldrMode}
        aria-label={isTldrMode ? 'Show detailed content' : 'Show TLDR content'}
        tabIndex={0}
      >
        <span className="mr-2 font-semibold">
          {isTldrMode && '🔥 '} TLDR Mode
        </span>
        <div
          className={`relative h-5 w-10 rounded-full transition-colors duration-200 ease-in-out ${
            isTldrMode ? 'bg-yellow-300' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-0.5 left-0.5 h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
              isTldrMode ? 'translate-x-5' : ''
            }`}
          ></div>
        </div>
      </button>
    </div>
  );
};
