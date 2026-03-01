"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { SpaceInvaders } from "./SpaceInvaders";

// Konami Code sequence
const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

export const EasterEgg = () => {
    const [, setKeySequence] = useState<string[]>([]);
    const [isGameActive, setIsGameActive] = useState(false);
    const hasPrintedHint = useRef(false);

    useEffect(() => {
        // Only print the hint once
        if (!hasPrintedHint.current) {
            console.log(
                "%c🛸 Warning: Incoming transmission... Use the ancient code to activate planetary defense. ⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ 🅱️ 🅰️",
                "color: #00ff00; font-size: 14px; font-weight: bold; background: #000; padding: 10px; border-radius: 5px; border: 1px solid #00ff00;"
            );
            hasPrintedHint.current = true;
        }
    }, []);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (isGameActive) return; // Ignore input if game is already running

            const key = e.key;

            setKeySequence((prev) => {
                // Add the new key to the sequence
                const newSequence = [...prev, key];

                // If sequence is longer than the code, remove the oldest keys
                if (newSequence.length > KONAMI_CODE.length) {
                    newSequence.splice(0, newSequence.length - KONAMI_CODE.length);
                }

                // Check if the current sequence matches the Konami code
                if (newSequence.length === KONAMI_CODE.length) {
                    const isMatch = newSequence.every(
                        (k, index) =>
                            k.toLowerCase() === KONAMI_CODE[index].toLowerCase()
                    );

                    if (isMatch) {
                        setIsGameActive(true);
                        return []; // Reset the sequence
                    }
                }

                return newSequence;
            });
        },
        [isGameActive]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
        <>
            {isGameActive && (
                <SpaceInvaders onClose={() => setIsGameActive(false)} />
            )}
        </>
    );
};
