"use client";

import { useTheme } from "@/context/ThemeContext";
import { useTldr } from "@/context/TldrContext";

export const TldrToggle = () => {
    const { isTldrMode, toggleTldrMode } = useTldr();
    const { colors } = useTheme();

    const handleToggle = () => {
        toggleTldrMode();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleTldrMode();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                className={`group flex items-center px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
                    isTldrMode
                        ? `bg-yellow-500 hover:bg-yellow-600 text-white`
                        : `${colors.background} hover:bg-gray-100`
                }`}
                aria-pressed={isTldrMode}
                aria-label={
                    isTldrMode ? "Show detailed content" : "Show TLDR content"
                }
                tabIndex={0}
            >
                <span className="font-semibold mr-2">
                    {isTldrMode ? "🤪 Serious Mode" : "🧐 TLDR Mode"}
                </span>
                <div
                    className={`relative w-10 h-5 transition-colors duration-200 ease-in-out rounded-full ${
                        isTldrMode ? "bg-yellow-300" : "bg-gray-300"
                    }`}
                >
                    <div
                        className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out transform ${
                            isTldrMode ? "translate-x-5" : ""
                        }`}
                    ></div>
                </div>
            </button>
        </div>
    );
};
