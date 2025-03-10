"use client";

import { useTheme } from "@/context/ThemeContext";
import { ReactNode, useEffect } from "react";

interface ThemeStyleProviderProps {
    children: ReactNode;
}

export const ThemeStyleProvider = ({ children }: ThemeStyleProviderProps) => {
    const { colors, currentTheme } = useTheme();

    // Apply the font styles only to headers and titles when the theme is Roblox
    useEffect(() => {
        if (currentTheme === "roblox") {
            // Create and add a style element for the Roblox font
            const styleEl = document.createElement("style");
            styleEl.textContent = `
                /* Apply Roblox font to main profile name */
                h1.section-header {
                    font-family: 'Roblox', sans-serif !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.05em !important;
                }
                
                /* Apply Roblox font only to section headers */
                h2.section-header {
                    font-family: 'Roblox', sans-serif !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.05em !important;
                }
                
                /* Apply Roblox font only to experience titles */
                h3.experience-title {
                    font-family: 'Roblox', sans-serif !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.05em !important;
                }
            `;
            styleEl.id = "roblox-font-styles";
            document.head.appendChild(styleEl);
        } else {
            // Remove the style element when theme changes
            const existingStyle = document.getElementById("roblox-font-styles");
            if (existingStyle) {
                document.head.removeChild(existingStyle);
            }
        }

        return () => {
            // Cleanup function to remove the style element when component unmounts
            const existingStyle = document.getElementById("roblox-font-styles");
            if (existingStyle) {
                document.head.removeChild(existingStyle);
            }
        };
    }, [currentTheme]);

    return <>{children}</>;
};
