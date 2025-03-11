"use client";

import { createContext, ReactNode, useContext, useState } from "react";

// Define theme types based on experiences
export type ThemeType =
    | "default"
    | "uwaterloo"
    | "windriver"
    | "hubhead"
    | "thomson"
    | "escrypt"
    | "imagine"
    | "oanda"
    | "roblox";

// Define theme properties
export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    cardBg: string;
    accent: string;
    borderColor: string; // Base color name for borders (without the intensity)
    // Enhanced theme properties
    specialBackground?: string; // For special background patterns/effects
    headerStyle?: string; // Style for headers
    borderStyle?: string; // Style for borders
    cardHoverEffect?: string; // Hover effects for cards
    iconStyle?: string; // Style for icons
    buttonStyle?: string; // Style for buttons
    fontFamily?: string; // Font family to use for this theme
}

// Theme definitions for each experience
export const themes: Record<ThemeType, ThemeColors> = {
    default: {
        primary: "from-gray-50 to-gray-100",
        secondary: "text-gray-600",
        background: "bg-white",
        text: "text-gray-900",
        cardBg: "bg-white",
        accent: "bg-blue-100 text-blue-700",
        borderColor: "blue",
    },
    uwaterloo: {
        // UWaterloo Engineering official purple color theme
        primary: "from-purple-50 to-purple-100",
        secondary: "text-purple-700",
        background: "bg-purple-50",
        text: "text-purple-900",
        cardBg: "bg-white",
        accent: "bg-purple-100 text-purple-800",
        borderColor: "purple",

        // Enhanced theme elements with PCB pattern - removing border styles
        specialBackground:
            "bg-[url('/pcb-pattern.svg')] bg-repeat bg-opacity-10", // Purple PCB pattern
        headerStyle: "text-[#5D0096] border-b-2 border-[#5D0096] pb-2", // UWaterloo Engineering Level 4 color
        borderStyle: "border border-gray-200", // Removing purple borders
        cardHoverEffect: "hover:shadow-md transition-all duration-300", // Simple hover effect without purple glow
        iconStyle: "text-[#A05DCB]", // UWaterloo Engineering Level 2 color
        buttonStyle: "bg-[#5D0096] text-white px-4 py-2 rounded-md", // Simple purple button
    },
    windriver: {
        primary: "from-teal-50 to-teal-100",
        secondary: "text-teal-700",
        background: "bg-teal-50",
        text: "text-teal-900",
        cardBg: "bg-white",
        accent: "bg-teal-100 text-teal-700",
        borderColor: "teal",
    },
    hubhead: {
        primary: "from-green-50 to-green-100",
        secondary: "text-green-700",
        background: "bg-green-50",
        text: "text-green-900",
        cardBg: "bg-white",
        accent: "bg-green-100 text-green-700",
        borderColor: "green",
    },
    thomson: {
        primary: "from-orange-50 to-orange-100",
        secondary: "text-orange-700",
        background: "bg-orange-50",
        text: "text-orange-900",
        cardBg: "bg-white",
        accent: "bg-orange-100 text-orange-700",
        borderColor: "orange",
    },
    escrypt: {
        primary: "from-purple-50 to-purple-100",
        secondary: "text-purple-700",
        background: "bg-purple-50",
        text: "text-purple-900",
        cardBg: "bg-white",
        accent: "bg-purple-100 text-purple-700",
        borderColor: "purple",
    },
    imagine: {
        primary: "from-pink-50 to-pink-100",
        secondary: "text-pink-700",
        background: "bg-pink-50",
        text: "text-pink-900",
        cardBg: "bg-white",
        accent: "bg-pink-100 text-pink-700",
        borderColor: "pink",
    },
    oanda: {
        primary: "from-indigo-50 to-indigo-100",
        secondary: "text-indigo-700",
        background: "bg-indigo-50",
        text: "text-indigo-900",
        cardBg: "bg-white",
        accent: "bg-indigo-100 text-indigo-700",
        borderColor: "indigo",
    },
    roblox: {
        primary: "from-gray-200 to-gray-300",
        secondary: "text-gray-800",
        background: "bg-gray-100",
        text: "text-gray-900",
        cardBg: "bg-white",
        accent: "bg-black text-white",
        borderColor: "gray-400",

        // Enhanced theme elements
        specialBackground: "bg-gradient-to-br from-gray-100 to-gray-300",
        headerStyle: "text-black border-b-2 border-gray-400 pb-2",
        borderStyle: "border border-gray-300",
        cardHoverEffect:
            "hover:shadow-lg hover:rotate-1 transition-all duration-300",
        iconStyle: "text-black",
        buttonStyle:
            "bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-black",
        fontFamily: "font-['Roblox']",
    },
};

export type ExpandedItemType = "education" | string | null;

interface ThemeContextProps {
    currentTheme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    colors: ThemeColors;
    expandedItem: ExpandedItemType;
    setExpandedItem: (item: ExpandedItemType) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>("default");
    const [expandedItem, setExpandedItem] = useState<ExpandedItemType>(null);

    const setTheme = (theme: ThemeType) => {
        setCurrentTheme(theme);
    };

    const value = {
        currentTheme,
        setTheme,
        colors: themes[currentTheme],
        expandedItem,
        setExpandedItem,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
