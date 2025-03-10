"use client";

import { ThemeType, useTheme } from "@/context/ThemeContext";

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
                {/* UWaterloo engineering PCB component label - modified to match mockup better */}
                {isUWaterloo && isExpanded && (
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                        <div className="bg-[#5D0096] text-white transform rotate-45 text-xs font-bold py-1 px-6 text-center absolute top-2 right-[-20px]">
                            ENG 2020
                        </div>
                    </div>
                )}

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
                            Computer engineering education with focus on
                            software development and systems programming. Gained
                            comprehensive knowledge in circuit design, embedded
                            systems, and software architecture.
                        </p>

                        {isUWaterloo && (
                            <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-[#C2A8F0] relative overflow-hidden">
                                {/* Subtle PCB pattern in the box */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="w-full h-full bg-[url('/pcb-pattern.svg')] bg-repeat"></div>
                                </div>
                                <h4 className="font-medium text-[#A05DCB] mb-2 relative z-10">
                                    Co-operative Education Program
                                </h4>
                                <p className="text-sm text-gray-700 mb-2 relative z-10">
                                    Completed 6 diverse co-op terms across
                                    various industries, gaining hands-on
                                    experience in operating systems, security,
                                    and enterprise software development.
                                </p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2">
                            {[
                                "Computer Engineering",
                                "Software Development",
                                "Systems Programming",
                                "Circuit Design",
                                "Embedded Systems",
                                "PCB Layout",
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
