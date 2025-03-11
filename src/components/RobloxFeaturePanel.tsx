"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

// Define feature flag types
interface FeatureFlag {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
}

// Define release channel types
type ReleaseChannel = "production" | "beta";

export const RobloxFeaturePanel = () => {
    const { currentTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedChannel, setSelectedChannel] =
        useState<ReleaseChannel>("production");
    const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([
        {
            id: "enhanced-graphics",
            name: "Enhanced Graphics",
            description: "⚠️ Warning: Not tested. Don't enable on prod!",
            enabled: false,
        },
    ]);

    // Only show when Roblox theme is active
    useEffect(() => {
        const isRoblox = currentTheme === "roblox";
        setIsVisible(isRoblox);

        // Reset panel state when theme changes
        if (!isRoblox) {
            setIsPanelOpen(false);
        }

        // Apply feature flag effects
        if (isRoblox) {
            applyFeatureFlags();
        } else {
            // Remove any applied effects when theme changes
            removeFeatureFlags();
        }
    }, [currentTheme]);

    // Apply effects when feature flags change
    useEffect(() => {
        if (currentTheme === "roblox") {
            applyFeatureFlags();
        }
    }, [featureFlags, selectedChannel]);

    // Toggle a feature flag
    const toggleFeatureFlag = (id: string) => {
        // Since we're always on production (beta is disabled), show warning about enabling features
        if (
            id === "enhanced-graphics" &&
            !featureFlags.find((f) => f.id === id)?.enabled
        ) {
            const confirmEnable = window.confirm(
                "WARNING: This feature is not ready for production use. Enable anyway for testing?"
            );
            if (!confirmEnable) return;
        }

        setFeatureFlags((flags) =>
            flags.map((flag) =>
                flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
            )
        );
    };

    // Change release channel
    const handleChannelChange = (channel: ReleaseChannel) => {
        setSelectedChannel(channel);

        // Auto-disable enhanced graphics when switching to production
        if (channel === "production") {
            setFeatureFlags((flags) =>
                flags.map((flag) => ({ ...flag, enabled: false }))
            );
        }
    };

    // Apply feature flag effects to the page
    const applyFeatureFlags = () => {
        const styleEl =
            document.getElementById("roblox-feature-flags") ||
            document.createElement("style");
        styleEl.id = "roblox-feature-flags";

        let css = "";

        // Enhanced graphics - now applies a wacky theme
        if (featureFlags.find((f) => f.id === "enhanced-graphics")?.enabled) {
            css += `
                /* Wacky rotations for sections */
                section, .card {
                    transform: rotate(${Math.random() * 2 - 1}deg) !important;
                    transition: all 0.5s ease !important;
                    animation: wobble 5s infinite ease-in-out !important;
                }
                
                /* Rainbow borders */
                section, .card {
                    border: 2px solid transparent !important;
                    background-clip: padding-box !important;
                    position: relative !important;
                    overflow: hidden !important;
                }
                
                section::before, .card::before {
                    content: '' !important;
                    position: absolute !important;
                    top: -2px !important;
                    left: -2px !important;
                    right: -2px !important;
                    bottom: -2px !important;
                    background: linear-gradient(45deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee) !important;
                    z-index: -1 !important;
                    animation: rainbow-border 3s linear infinite !important;
                    background-size: 400% !important;
                }
                
                /* Wacky fonts */
                h1, h2, h3 {
                    transform: skew(-3deg, 1deg) !important;
                    display: inline-block !important;
                }
                
                /* Wacky animations */
                @keyframes wobble {
                    0%, 100% { transform: rotate(${
                        Math.random() * 2 - 1
                    }deg) translateX(0); }
                    15% { transform: rotate(${
                        Math.random() * 3 - 1.5
                    }deg) translateX(-5px); }
                    30% { transform: rotate(${
                        Math.random() * 2 - 1
                    }deg) translateX(5px); }
                    45% { transform: rotate(${
                        Math.random() * 3 - 1.5
                    }deg) translateX(-5px); }
                    60% { transform: rotate(${
                        Math.random() * 2 - 1
                    }deg) translateX(5px); }
                    75% { transform: rotate(${
                        Math.random() * 3 - 1.5
                    }deg) translateX(-5px); }
                }
                
                @keyframes rainbow-border {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 100% 50%; }
                }
                
                /* Wacky effects for interactive elements */
                button, a {
                    transition: transform 0.3s ease !important;
                }
                
                button:hover, a:hover {
                    transform: scale(1.1) rotate(${
                        Math.random() * 6 - 3
                    }deg) !important;
                }
                
                /* Comic Sans for text - the ultimate wacky font */
                p, span, a {
                    font-family: "Comic Sans MS", cursive, sans-serif !important;
                }
                
                /* Mouse cursor effect */
                html {
                    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23000000"><circle cx="12" cy="12" r="8" fill="%23FF5555"/></svg>') 12 12, auto !important;
                }
            `;
        }

        styleEl.textContent = css;
        document.head.appendChild(styleEl);
    };

    // Remove all feature flag effects
    const removeFeatureFlags = () => {
        const styleEl = document.getElementById("roblox-feature-flags");
        if (styleEl) {
            document.head.removeChild(styleEl);
        }
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Feature Flag Toggle Button */}
            <div
                className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-white shadow-lg border-2 border-gray-300 w-12 h-12 cursor-pointer hover:bg-gray-100 transition-all"
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                onKeyDown={(e) =>
                    e.key === "Enter" && setIsPanelOpen(!isPanelOpen)
                }
                tabIndex={0}
                role="button"
                aria-label="Toggle feature flag panel"
            >
                <div className="w-6 h-6 relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="text-black"
                    >
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                        <line x1="4" y1="22" x2="4" y2="15" />
                    </svg>
                </div>
            </div>

            {/* Feature Flag Panel */}
            {isPanelOpen && (
                <div className="fixed bottom-20 right-4 z-50 bg-white rounded-lg shadow-xl border-2 border-gray-300 w-80 overflow-hidden transition-all">
                    {/* Panel Header */}
                    <div className="bg-gradient-to-r from-gray-800 to-black text-white p-4">
                        <h3 className="font-['Roblox'] text-lg uppercase tracking-wider mb-1">
                            Feature Flag Console
                        </h3>
                        <p className="text-xs opacity-80">
                            Configure your experience
                        </p>
                    </div>

                    {/* Release Channel Selector */}
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Release Channel
                        </label>
                        <div className="flex space-x-2">
                            <button
                                className={`px-3 py-1 text-xs rounded-full ${
                                    selectedChannel === "production"
                                        ? "bg-gray-800 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                                onClick={() =>
                                    handleChannelChange("production")
                                }
                            >
                                Production
                            </button>
                            <button
                                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                                aria-disabled="true"
                                title="Coming soon - this channel is not yet available"
                            >
                                Beta
                            </button>
                        </div>
                        {/* Beta unavailable message */}
                        <div className="mt-2 text-xs text-amber-600">
                            Beta channel only for internal users!
                        </div>
                    </div>

                    {/* Feature Flags */}
                    <div className="p-4 max-h-80 overflow-y-auto">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Feature Flags
                        </h4>
                        <div className="space-y-3">
                            {featureFlags.map((flag) => (
                                <div key={flag.id} className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id={flag.id}
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                            checked={flag.enabled}
                                            onChange={() =>
                                                toggleFeatureFlag(flag.id)
                                            }
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor={flag.id}
                                            className="font-medium text-gray-700"
                                        >
                                            {flag.name}
                                        </label>
                                        <p className="text-gray-500 text-xs">
                                            {flag.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Panel Footer */}
                    <div className="bg-gray-50 p-3 border-t border-gray-200 text-xs text-center text-gray-500">
                        Production Channel: Stable experience
                    </div>
                </div>
            )}
        </>
    );
};
