"use client";

import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const CanadaGoose = () => {
    const { currentTheme } = useTheme();
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [velocity, setVelocity] = useState({ x: 2, y: 3 });
    const [isVisible, setIsVisible] = useState(false);
    const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
    const gooseRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Only show the goose when the UWaterloo theme is active
    useEffect(() => {
        const isUWaterloo = currentTheme === "uwaterloo";

        if (isUWaterloo && !hasEnteredViewport) {
            // If theme becomes UWaterloo, start with the goose off-screen
            const side = Math.random() > 0.5 ? "left" : "right";
            const yPos = Math.random() * (window.innerHeight - 100);

            if (side === "left") {
                setPosition({ x: -100, y: yPos });
                setVelocity({
                    x: Math.random() * 2 + 2,
                    y: Math.random() * 2 - 1,
                });
            } else {
                setPosition({ x: window.innerWidth + 100, y: yPos });
                setVelocity({
                    x: -(Math.random() * 2 + 2),
                    y: Math.random() * 2 - 1,
                });
            }

            // Slight delay before showing the goose
            setTimeout(() => {
                setIsVisible(true);
                setHasEnteredViewport(true);
            }, 500);
        } else {
            setIsVisible(isUWaterloo);

            // Reset the position when theme changes from UWaterloo to something else
            if (!isUWaterloo) {
                setHasEnteredViewport(false);
            }
        }
    }, [currentTheme, hasEnteredViewport]);

    // Animation logic for the bouncing goose
    useEffect(() => {
        if (!isVisible) return;

        const gooseSize = { width: 80, height: 80 };
        let frameId: number;

        const updatePosition = () => {
            // Update position based on velocity
            setPosition((prev) => {
                const newPos = {
                    x: prev.x + velocity.x,
                    y: prev.y + velocity.y,
                };

                // Check for collisions with window boundaries and bounce
                const newVelocity = { ...velocity };
                let didCollide = false;

                // Right and left boundaries
                if (
                    newPos.x > window.innerWidth - gooseSize.width ||
                    newPos.x < 0
                ) {
                    newVelocity.x = -velocity.x;
                    didCollide = true;
                }

                // Bottom and top boundaries
                if (
                    newPos.y > window.innerHeight - gooseSize.height ||
                    newPos.y < 0
                ) {
                    newVelocity.y = -velocity.y;
                    didCollide = true;
                }

                // Update velocity if there was a collision
                if (didCollide) {
                    setVelocity(newVelocity);
                }

                // Make sure the goose stays within the screen
                return {
                    x: Math.max(
                        0,
                        Math.min(window.innerWidth - gooseSize.width, newPos.x)
                    ),
                    y: Math.max(
                        0,
                        Math.min(
                            window.innerHeight - gooseSize.height,
                            newPos.y
                        )
                    ),
                };
            });

            frameId = requestAnimationFrame(updatePosition);
        };

        frameId = requestAnimationFrame(updatePosition);

        // Clean up animation frame on unmount or when visibility changes
        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [isVisible, velocity]);

    // Handle click on the goose to play sound and then disappear
    const handleClick = () => {
        // Play the honk sound
        if (audioRef.current) {
            audioRef.current.currentTime = 0; // Reset audio to start

            // Set up the onended event handler before playing
            audioRef.current.onended = () => {
                setIsVisible(false);
            };

            audioRef.current.play().catch((error) => {
                console.error("Error playing sound:", error);
                setIsVisible(false); // Hide anyway if sound fails
            });
        } else {
            setIsVisible(false); // Fallback if audio ref is not available
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={gooseRef}
            className="fixed z-50 cursor-pointer transition-opacity duration-300 select-none"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: velocity.x > 0 ? "scaleX(-1)" : "scaleX(1)", // Flipped logic so goose faces opposite direction
            }}
            onMouseDown={handleClick}
            onTouchStart={handleClick}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            tabIndex={0}
            aria-label="Interactive Canada Goose"
            role="button"
        >
            <div className="relative w-20 h-20">
                {/* Canada Goose image */}
                <Image
                    src="/canada_goose_transparent_bg.png"
                    alt="Canada Goose"
                    width={80}
                    height={80}
                    priority
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                    className="pointer-events-auto"
                />

                {/* Audio element for honk sound */}
                <audio
                    ref={audioRef}
                    src="/honk-sound.mp3"
                    preload="auto"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
};
