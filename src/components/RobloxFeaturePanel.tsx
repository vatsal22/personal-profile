'use client';

import { useTheme } from '@/context/ThemeContext';
import { useCallback, useEffect, useState } from 'react';

// Define feature flag types
interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

// Define release channel types
type ReleaseChannel = 'production' | 'beta';

// Add an inline prop to determine if the component should be rendered inline or fixed
interface RobloxFeaturePanelProps {
  inline?: boolean;
}

export const RobloxFeaturePanel = ({
  inline = false,
}: RobloxFeaturePanelProps) => {
  // States
  const [isVisible, setIsVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] =
    useState<ReleaseChannel>('production');
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([
    {
      id: 'enhanced-graphics',
      name: 'Enhanced Graphics',
      description: "⚠️ This feature totally isn't broken or anything",
      enabled: false,
    },
  ]);

  const { currentTheme, expandedItem } = useTheme();

  // Apply feature flag effects to the page
  const applyFeatureFlags = useCallback(() => {
    const styleEl =
      document.getElementById('roblox-feature-flags') ||
      document.createElement('style');
    styleEl.id = 'roblox-feature-flags';

    let css = '';

    // Enhanced graphics - now applies a wacky theme
    if (featureFlags.find((f) => f.id === 'enhanced-graphics')?.enabled) {
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
  }, [featureFlags]);

  // Remove feature flag effects
  const removeFeatureFlags = useCallback(() => {
    const styleEl = document.getElementById('roblox-feature-flags');
    if (styleEl) {
      document.head.removeChild(styleEl);
    }
  }, []);

  // Toggle a feature flag
  const toggleFeatureFlag = (id: string, e?: React.SyntheticEvent) => {
    // Stop propagation if event is provided
    if (e) {
      e.stopPropagation();
    }

    // Since we're always on production (beta is disabled), show warning about enabling features
    if (
      id === 'enhanced-graphics' &&
      !featureFlags.find((f) => f.id === id)?.enabled
    ) {
      const confirmEnable = window.confirm(
        "WARNING: This feature is untested and should not be enabled in production. But hey, what's the worst that can happen?",
      );
      if (!confirmEnable) return;
    }

    setFeatureFlags((flags) =>
      flags.map((flag) =>
        flag.id === id ? { ...flag, enabled: !flag.enabled } : flag,
      ),
    );
  };

  // Handle channel change
  const handleChannelChange = (channel: ReleaseChannel) => {
    setSelectedChannel(channel);

    // Auto-disable enhanced graphics when switching to production
    if (channel === 'production') {
      setFeatureFlags((flags) =>
        flags.map((flag) => ({ ...flag, enabled: false })),
      );
    }
  };

  // Apply theme changes and visibility
  useEffect(() => {
    const isRoblox = currentTheme === 'roblox';
    const isRobloxExpanded = expandedItem === 'roblox';

    // For inline mode, only show when the Roblox section is expanded
    setIsVisible(isRoblox && (inline ? isRobloxExpanded : true));

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
  }, [
    currentTheme,
    expandedItem,
    inline,
    applyFeatureFlags,
    removeFeatureFlags,
  ]);

  // Apply effects when feature flags change
  useEffect(() => {
    if (currentTheme === 'roblox') {
      applyFeatureFlags();
    }
  }, [featureFlags, selectedChannel, applyFeatureFlags, currentTheme]);

  if (!isVisible) return null;

  // Render different button styles based on inline prop
  const buttonClasses = inline
    ? 'mb-2 mr-2 flex items-center justify-center rounded-full bg-white shadow-md border-2 border-gray-400 w-12 h-12 cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-all relative z-20'
    : 'fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-white shadow-lg border-2 border-gray-300 w-12 h-12 cursor-pointer hover:bg-gray-100 transition-all';

  // Adjust icon size based on button size
  const iconSize = inline ? 'w-6 h-6' : 'w-6 h-6';

  const panelClasses = inline
    ? 'absolute bottom-full right-0 mb-2 z-50 bg-white rounded-lg shadow-xl border-2 border-gray-300 w-72 overflow-hidden transition-all'
    : 'fixed bottom-20 right-4 z-50 bg-white rounded-lg shadow-xl border-2 border-gray-300 w-80 overflow-hidden transition-all';

  return (
    <>
      {/* Feature Flag Toggle Button with Click Me text for inline mode */}
      {inline ? (
        <div className="flex flex-col items-center">
          <div
            className={buttonClasses}
            onClick={(e) => {
              e.stopPropagation(); // Stop event propagation
              setIsPanelOpen(!isPanelOpen);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.stopPropagation(); // Stop event propagation
                setIsPanelOpen(!isPanelOpen);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Toggle feature flag panel"
          >
            <div className={iconSize}>
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
          <div
            className="bg-opacity-80 mt-1 animate-pulse rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsPanelOpen(!isPanelOpen);
            }}
          >
            Click Me!
          </div>
        </div>
      ) : (
        <div
          className={buttonClasses}
          onClick={(e) => {
            e.stopPropagation(); // Stop event propagation
            setIsPanelOpen(!isPanelOpen);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.stopPropagation(); // Stop event propagation
              setIsPanelOpen(!isPanelOpen);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Toggle feature flag panel"
        >
          <div className={iconSize}>
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
      )}

      {/* Feature Flag Panel */}
      {isPanelOpen && (
        <div
          className={panelClasses}
          onClick={(e) => e.stopPropagation()} // Stop event propagation for the panel too
        >
          {/* Panel Header */}
          <div className="bg-gradient-to-r from-gray-800 to-black p-4 text-white">
            <h3 className="mb-1 font-['Roblox'] text-lg tracking-wider uppercase">
              Feature Flag Console
            </h3>
            <p className="text-xs opacity-80">Configure your experience!</p>
          </div>

          {/* Release Channel Selector */}
          <div className="border-b border-gray-200 bg-gray-50 p-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Release Channel
            </label>
            <div className="flex space-x-2">
              <button
                className={`rounded-full px-3 py-1 text-xs ${
                  selectedChannel === 'production'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => handleChannelChange('production')}
              >
                Production
              </button>
              <button
                className="cursor-not-allowed rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-400 opacity-60"
                aria-disabled="true"
                title="Coming soon - this channel is not yet available"
              >
                Beta
              </button>
            </div>
            {/* Beta unavailable message */}
            <div className="mt-2 text-xs text-amber-600">
              Beta channel access coming soon!
            </div>
          </div>

          {/* Feature Flags */}
          <div className="max-h-80 overflow-y-auto p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              Feature Flags
            </h4>
            <div className="space-y-3">
              {featureFlags.map((flag) => (
                <div key={flag.id} className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id={flag.id}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                      checked={flag.enabled}
                      onChange={(e) => toggleFeatureFlag(flag.id, e)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor={flag.id}
                      className="font-medium text-gray-700"
                    >
                      {flag.name}
                    </label>
                    <p className="text-xs text-gray-500">{flag.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-3 text-center text-xs text-gray-500">
            Production Channel: Stable experience
          </div>
        </div>
      )}
    </>
  );
};
