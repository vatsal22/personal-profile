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
    },
    uwaterloo: {
        primary: "from-yellow-50 to-yellow-100",
        secondary: "text-yellow-800",
        background: "bg-yellow-50",
        text: "text-yellow-900",
        cardBg: "bg-white",
        accent: "bg-yellow-100 text-yellow-800",
    },
    windriver: {
        primary: "from-blue-50 to-blue-100",
        secondary: "text-blue-700",
        background: "bg-blue-50",
        text: "text-blue-900",
        cardBg: "bg-white",
        accent: "bg-blue-100 text-blue-700",
    },
    hubhead: {
        primary: "from-green-50 to-green-100",
        secondary: "text-green-700",
        background: "bg-green-50",
        text: "text-green-900",
        cardBg: "bg-white",
        accent: "bg-green-100 text-green-700",
    },
    thomson: {
        primary: "from-orange-50 to-orange-100",
        secondary: "text-orange-700",
        background: "bg-orange-50",
        text: "text-orange-900",
        cardBg: "bg-white",
        accent: "bg-orange-100 text-orange-700",
    },
    escrypt: {
        primary: "from-purple-50 to-purple-100",
        secondary: "text-purple-700",
        background: "bg-purple-50",
        text: "text-purple-900",
        cardBg: "bg-white",
        accent: "bg-purple-100 text-purple-700",
    },
    imagine: {
        primary: "from-pink-50 to-pink-100",
        secondary: "text-pink-700",
        background: "bg-pink-50",
        text: "text-pink-900",
        cardBg: "bg-white",
        accent: "bg-pink-100 text-pink-700",
    },
    oanda: {
        primary: "from-indigo-50 to-indigo-100",
        secondary: "text-indigo-700",
        background: "bg-indigo-50",
        text: "text-indigo-900",
        cardBg: "bg-white",
        accent: "bg-indigo-100 text-indigo-700",
    },
    roblox: {
        primary: "from-red-50 to-red-100",
        secondary: "text-red-700",
        background: "bg-red-50",
        text: "text-red-900",
        cardBg: "bg-white",
        accent: "bg-red-100 text-red-700",
    },
};

interface ThemeContextProps {
    currentTheme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>("default");

    const setTheme = (theme: ThemeType) => {
        setCurrentTheme(theme);
    };

    const value = {
        currentTheme,
        setTheme,
        colors: themes[currentTheme],
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
