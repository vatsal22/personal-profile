"use client";

import { useEffect, useRef, useState } from "react";

interface SpaceInvadersProps {
    onClose: () => void;
}

interface Entity {
    x: number;
    y: number;
    width: number;
    height: number;
    speed?: number;
    active: boolean;
    color?: string;
    emoji?: string;
}

export const SpaceInvaders = ({ onClose }: SpaceInvadersProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);

    // Game state
    const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
    const [score, setScore] = useState(0);

    // Refs for mutable game state that doesn't trigger re-renders
    const stateRef = useRef({
        player: { x: 0, y: 0, width: 40, height: 40, active: true, speed: 5, color: "#00ff00", emoji: "🚀" },
        lasers: [] as Entity[],
        invaders: [] as Entity[],
        invaderDirection: 1, // 1 for right, -1 for left
        invaderSpeed: 1,
        keys: { left: false, right: false, space: false },
        lastShotTime: 0,
        gameStatus: "playing" as "playing" | "won" | "lost",
        score: 0,
        screenWidth: 0,
        screenHeight: 0,
    });

    // Initialize game
    useEffect(() => {
        const initGame = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Set canvas to full screen
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stateRef.current.screenWidth = canvas.width;
            stateRef.current.screenHeight = canvas.height;

            // Init player
            stateRef.current.player = {
                ...stateRef.current.player,
                x: canvas.width / 2 - 20,
                y: canvas.height - 60,
            };

            // Init invaders
            const invadersList: Entity[] = [];
            const rows = 4;
            const cols = Math.min(10, Math.floor(canvas.width / 80)); // Responsive columns

            const startX = (canvas.width - cols * 60) / 2;
            const startY = 80;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    invadersList.push({
                        x: startX + c * 60,
                        y: startY + r * 50,
                        width: 30,
                        height: 30,
                        active: true,
                        emoji: r % 2 === 0 ? "👾" : "👽"
                    });
                }
            }
            stateRef.current.invaders = invadersList;
            stateRef.current.gameStatus = "playing";
            stateRef.current.score = 0;
            setGameState("playing");
            setScore(0);
        };

        initGame();

        const handleResize = () => {
            initGame();
        };

        window.addEventListener("resize", handleResize);

        // Keyboard listeners
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") stateRef.current.keys.left = true;
            if (e.key === "ArrowRight") stateRef.current.keys.right = true;
            if (e.key === " ") {
                e.preventDefault(); // Prevent page scroll
                stateRef.current.keys.space = true;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") stateRef.current.keys.left = false;
            if (e.key === "ArrowRight") stateRef.current.keys.right = false;
            if (e.key === " ") {
                e.preventDefault();
                stateRef.current.keys.space = false;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // Lock scroll
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            cancelAnimationFrame(requestRef.current);
            document.body.style.overflow = "unset";
        };
    }, []);

    // Main game loop
    useEffect(() => {
        const loop = (time: number) => {
            update(time);
            draw();
            if (stateRef.current.gameStatus === "playing") {
                requestRef.current = requestAnimationFrame(loop);
            }
        };

        requestRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const update = (time: number) => {
        const state = stateRef.current;
        if (state.gameStatus !== "playing") return;

        // Move Player
        if (state.keys.left && state.player.x > 0) {
            state.player.x -= state.player.speed;
        }
        if (state.keys.right && state.player.x < state.screenWidth - state.player.width) {
            state.player.x += state.player.speed;
        }

        // Shoot Laser
        if (state.keys.space && time - state.lastShotTime > 300) {
            state.lasers.push({
                x: state.player.x + state.player.width / 2 - 2, // Center from ship
                y: state.player.y - 10,
                width: 4,
                height: 15,
                speed: 10,
                active: true,
                color: "#00ff00"
            });
            state.lastShotTime = time;
        }

        // Move Lasers
        state.lasers.forEach(laser => {
            if (laser.active) {
                laser.y -= laser.speed || 10;
                if (laser.y < -20) laser.active = false;
            }
        });

        // Move Invaders
        let hitWall = false;
        const activeInvaders = state.invaders.filter(inv => inv.active);

        // Check win condition
        if (activeInvaders.length === 0) {
            state.gameStatus = "won";
            setGameState("won");
            return;
        }

        activeInvaders.forEach(invader => {
            invader.x += state.invaderDirection * state.invaderSpeed;
            if (invader.x <= 10 || invader.x >= state.screenWidth - invader.width - 10) {
                hitWall = true;
            }
        });

        if (hitWall) {
            state.invaderDirection *= -1; // Reverse direction
            activeInvaders.forEach(invader => {
                invader.y += 20; // Drop down
                // Check lose condition (reached player)
                if (invader.y + invader.height >= state.player.y) {
                    state.gameStatus = "lost";
                    setGameState("lost");
                }
            });
            // Speed up slightly as they drop
            state.invaderSpeed += 0.2;
        }

        // Collision Detection: Lasers vs Invaders
        state.lasers.forEach(laser => {
            if (!laser.active) return;

            activeInvaders.forEach(invader => {
                if (
                    laser.x < invader.x + invader.width &&
                    laser.x + laser.width > invader.x &&
                    laser.y < invader.y + invader.height &&
                    laser.y + laser.height > invader.y
                ) {
                    // Hit!
                    invader.active = false;
                    laser.active = false;
                    state.score += 10;
                    setScore(state.score); // Update UI
                }
            });
        });

        // Clean up inactive entities
        state.lasers = state.lasers.filter(l => l.active);
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const state = stateRef.current;

        // Clear screen
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, state.screenWidth, state.screenHeight);

        // Draw Player Emoji
        ctx.font = "40px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(state.player.emoji || "🚀", state.player.x, state.player.y);

        // Draw Lasers
        state.lasers.forEach(laser => {
            if (laser.active) {
                ctx.fillStyle = laser.color || "#00ff00";
                ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
            }
        });

        // Draw Invaders Emojis
        state.invaders.forEach(invader => {
            if (invader.active) {
                ctx.font = "30px Arial";
                ctx.fillText(invader.emoji || "👾", invader.x, invader.y);
            }
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-auto select-none">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
            />

            {/* Top UI Overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-green-400 font-mono pointer-events-none">
                <div className="text-2xl font-bold tracking-widest">
                    SCORE: <span className="text-white">{score}</span>
                </div>
                <div className="text-sm border border-green-400/50 bg-black/50 px-3 py-1 rounded">
                    [ARROWS] to Move &bull; [SPACE] to Fire &bull; [ESC] to Exit
                </div>
                <button
                    onClick={onClose}
                    className="pointer-events-auto px-4 py-1 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors rounded uppercase text-sm font-bold"
                >
                    Abort Mission
                </button>
            </div>

            {/* Game Over / Win UI */}
            {gameState !== "playing" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 backdrop-blur-sm">
                    <div className="bg-black/90 border-2 border-green-500 p-8 rounded-lg max-w-md text-center shadow-[0_0_30px_rgba(0,255,0,0.3)]">
                        <h2 className={`text-4xl font-bold mb-4 uppercase ${gameState === 'won' ? 'text-green-400' : 'text-red-500'}`}>
                            {gameState === "won" ? "System Defended" : "System Breached"}
                        </h2>
                        <p className="text-xl text-white mb-8 font-mono">
                            Final Score: <span className="font-bold text-green-400">{score}</span>
                        </p>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors rounded uppercase font-bold tracking-widest"
                            >
                                Return to Terminal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
