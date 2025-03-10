"use client";

import { ThemeType, useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

// Create dummy data for the EyeFly gallery
const eyeFlyGalleryImages = [
    {
        id: 1,
        src: "/eyefly/eyefly_assembled_drone.webp",
        alt: "EyeFly Assembled Drone",
        caption: "Fully assembled EyeFly drone prototype with camera module",
    },
    {
        id: 2,
        src: "/eyefly/eyeflye_person_detected_flying.png",
        alt: "Person Detection System in Action",
        caption:
            "EyeFly's AI detection system identifying a person, seen from real-time monitoring dashboard. ",
    },

    {
        id: 3,
        src: "/eyefly/eyefly_dashboard.webp",
        alt: "EyeFly Control Dashboard",
        caption:
            "Real-time monitoring dashboard for monitoring drone vitals and status.",
    },
    {
        id: 4,
        src: "/eyefly/eyefly_drone_pdb_component.webp",
        alt: "EyeFly PDB Component",
        caption:
            "Central power distribution board (PDB) component for prototype drone.",
    },
    {
        id: 5,
        src: "/eyefly/eyefly_system_block_diagram.webp",
        alt: "EyeFly System Architecture",
        caption:
            "System block diagram showing the drone's communication architecture",
    },
];

type EducationSectionProps = {
    education: {
        university: string;
        degree: string;
        period: string;
        themeKey: ThemeType;
    };
};

export const EducationSection = ({ education }: EducationSectionProps) => {
    const { setTheme, colors, expandedItem, setExpandedItem } = useTheme();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality for the carousel
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === eyeFlyGalleryImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleEducationClick = () => {
        if (expandedItem === "education") {
            // Collapse if already expanded
            setExpandedItem(null);
            setTheme("default");
        } else {
            // Expand and collapse any other expanded item
            setExpandedItem("education");
            setTheme(education.themeKey);
        }
    };

    const handlePrevImage = () => {
        setIsAutoPlaying(false);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? eyeFlyGalleryImages.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setIsAutoPlaying(false);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === eyeFlyGalleryImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleThumbnailClick = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentImageIndex(index);
    };

    const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
        if (e.key === "Enter" || e.key === " ") {
            action();
            e.preventDefault();
        }
    };

    const isExpanded = expandedItem === "education";
    const isUWaterloo = education.university.toLowerCase().includes("waterloo");

    // Special UWaterloo Engineering style - removed border-related styles
    const waterlooPurpleStyle =
        isUWaterloo && isExpanded ? "shadow-lg relative overflow-hidden" : "";

    // Custom heading style for education heading
    const educationHeadingStyle = isExpanded
        ? "text-[#5D0096] border-b-2 border-[#5D0096] pb-2"
        : "text-gray-900";

    return (
        <section
            className={`${colors.cardBg} rounded-lg shadow-md p-8 mb-8 transition-all duration-300 relative`}
            aria-labelledby="education-heading"
        >
            {/* UWaterloo purple PCB pattern overlay */}
            {isUWaterloo && isExpanded && (
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="w-full h-full bg-[url('/pcb-pattern.svg')] bg-repeat"></div>
                </div>
            )}

            {/* UWaterloo purple accent - removed right and bottom accents */}
            {isUWaterloo && isExpanded && (
                <div className="absolute top-0 left-0 w-full h-2 bg-[#5D0096] opacity-50"></div>
            )}

            <h2
                id="education-heading"
                className={`text-2xl font-semibold mb-6 ${
                    isUWaterloo && isExpanded
                        ? educationHeadingStyle
                        : colors.text
                } relative z-10`}
            >
                Education
            </h2>

            <div
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 relative z-10
                    ${
                        isExpanded
                            ? `border shadow-md ${colors.background}`
                            : "border-gray-200"
                    }
                    ${
                        isUWaterloo && colors.cardHoverEffect
                            ? colors.cardHoverEffect
                            : "hover:shadow-md"
                    }
                    ${waterlooPurpleStyle}`}
                onClick={handleEducationClick}
                onKeyDown={(e) => e.key === "Enter" && handleEducationClick()}
                tabIndex={0}
                aria-label={`${education.university} - ${education.degree}`}
                role="button"
            >
                {/* UWaterloo engineering PCB component label - removed */}

                <div className="flex justify-between items-center">
                    <div>
                        <h3
                            className={`font-medium text-lg ${
                                isUWaterloo && isExpanded
                                    ? "text-[#5D0096]"
                                    : colors.text
                            }`}
                        >
                            {education.university}
                        </h3>
                        <p
                            className={`${
                                isUWaterloo && isExpanded
                                    ? "text-[#A05DCB]"
                                    : colors.secondary
                            }`}
                        >
                            {education.degree} • {education.period}
                        </p>
                    </div>
                    <div
                        className={`${
                            isUWaterloo && isExpanded && colors.iconStyle
                                ? colors.iconStyle
                                : "text-gray-500"
                        }`}
                    >
                        {isExpanded ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        )}
                    </div>
                </div>

                {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p
                            className={`${
                                isUWaterloo
                                    ? "text-[#A05DCB]"
                                    : colors.secondary
                            } mb-4`}
                        >
                            Computer engineering elective focus on systems
                            programming and infrastructure development, with
                            co-op experience across operating systems
                            (WinDriver), security systems (Escrypt), and trading
                            platforms (Oanda).
                        </p>

                        {isUWaterloo && (
                            <>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-[#C2A8F0] relative overflow-hidden">
                                    {/* Subtle PCB pattern in the box */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="w-full h-full bg-[url('/pcb-pattern.svg')] bg-repeat"></div>
                                    </div>
                                    <h4 className="font-medium text-[#A05DCB] mb-2 relative z-10">
                                        Notable Coursework
                                    </h4>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 relative z-10">
                                        <li>
                                            Real-Time Operating Systems: Core
                                            systems architecture and concurrency
                                            management
                                        </li>
                                        <li>
                                            Distributed Computing: Large-scale
                                            service deployment and coordination
                                        </li>
                                        <li>
                                            Programming for Performance:
                                            Optimization techniques for
                                            high-performance systems
                                        </li>
                                        <li>
                                            Computer Networks: Design and
                                            implementation of networked systems
                                        </li>
                                        <li>
                                            Computer Security: Security
                                            engineering for platform
                                            infrastructure
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-[#C2A8F0] relative overflow-hidden">
                                    {/* Subtle PCB pattern in the box */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="w-full h-full bg-[url('/pcb-pattern.svg')] bg-repeat"></div>
                                    </div>
                                    <h4 className="font-medium text-[#A05DCB] mb-2 relative z-10">
                                        Capstone Project: EyeFly
                                    </h4>
                                    <p className="text-sm text-gray-700 relative z-10 mb-4">
                                        Led development of a search and rescue
                                        drone system featuring real-time
                                        computer vision for person detection,
                                        monitoring dashboard powered by a robust
                                        communication infrastructure, and
                                        custom-designed hardware components.
                                    </p>

                                    {/* Image Gallery/Carousel for EyeFly */}
                                    <div className="mt-4 relative">
                                        <div className="relative overflow-hidden rounded-lg shadow-md">
                                            {/* Main image display - Increasing height from 56.25% (16:9) to 75% (4:3) */}
                                            <div className="relative pb-[75%] bg-gray-200 rounded-lg overflow-hidden">
                                                {/* Using actual images instead of placeholders */}
                                                <img
                                                    src={
                                                        eyeFlyGalleryImages[
                                                            currentImageIndex
                                                        ].src
                                                    }
                                                    alt={
                                                        eyeFlyGalleryImages[
                                                            currentImageIndex
                                                        ].alt
                                                    }
                                                    className="absolute inset-0 w-full h-full object-contain bg-gray-100"
                                                />
                                            </div>

                                            {/* Image caption */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm text-center">
                                                {
                                                    eyeFlyGalleryImages[
                                                        currentImageIndex
                                                    ].caption
                                                }
                                            </div>

                                            {/* Navigation arrows - adjusted positioning */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePrevImage();
                                                }}
                                                onKeyDown={(e) => {
                                                    e.stopPropagation();
                                                    handleKeyDown(
                                                        e,
                                                        handlePrevImage
                                                    );
                                                }}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                aria-label="Previous image"
                                                tabIndex={0}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-5 h-5"
                                                >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleNextImage();
                                                }}
                                                onKeyDown={(e) => {
                                                    e.stopPropagation();
                                                    handleKeyDown(
                                                        e,
                                                        handleNextImage
                                                    );
                                                }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                aria-label="Next image"
                                                tabIndex={0}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-5 h-5"
                                                >
                                                    <polyline points="9 18 15 12 9 6"></polyline>
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Thumbnails - increased height */}
                                        <div className="flex mt-2 space-x-2 overflow-x-auto pb-1">
                                            {eyeFlyGalleryImages.map(
                                                (image, index) => (
                                                    <button
                                                        key={image.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleThumbnailClick(
                                                                index
                                                            );
                                                        }}
                                                        onKeyDown={(e) => {
                                                            e.stopPropagation();
                                                            handleKeyDown(
                                                                e,
                                                                () =>
                                                                    handleThumbnailClick(
                                                                        index
                                                                    )
                                                            );
                                                        }}
                                                        className={`flex-shrink-0 w-16 h-14 rounded overflow-hidden focus:outline-none ${
                                                            currentImageIndex ===
                                                            index
                                                                ? "ring-2 ring-purple-600"
                                                                : "opacity-70 hover:opacity-100"
                                                        }`}
                                                        aria-label={`View image ${
                                                            index + 1
                                                        }: ${image.alt}`}
                                                        aria-current={
                                                            currentImageIndex ===
                                                            index
                                                                ? "true"
                                                                : "false"
                                                        }
                                                        tabIndex={0}
                                                    >
                                                        <img
                                                            src={image.src}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2">
                            {[
                                "Systems Programming",
                                "Distributed Systems",
                                "Performance Optimization",
                                "Embedded Systems",
                                "Computer Networks",
                            ].map((skill) => (
                                <span
                                    key={skill}
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        isUWaterloo
                                            ? "bg-purple-100 text-purple-800"
                                            : colors.accent
                                    }`}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {isUWaterloo && (
                            <div className="mt-6">
                                <button className="bg-[#5D0096] text-white px-4 py-2 rounded">
                                    View Transcript
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
