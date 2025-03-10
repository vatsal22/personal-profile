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

    return (
        <section
            className={`${colors.cardBg} rounded-lg shadow-md p-8 mb-8`}
            aria-labelledby="education-heading"
        >
            <h2
                id="education-heading"
                className={`text-2xl font-semibold ${colors.text} mb-6`}
            >
                Education
            </h2>

            <div
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                    isExpanded
                        ? `border-yellow-400 shadow-md ${colors.background}`
                        : "border-gray-200"
                }`}
                onClick={handleEducationClick}
                onKeyDown={(e) => e.key === "Enter" && handleEducationClick()}
                tabIndex={0}
                aria-label={`${education.university} - ${education.degree}`}
                role="button"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className={`font-medium text-lg ${colors.text}`}>
                            {education.university}
                        </h3>
                        <p className={`${colors.secondary}`}>
                            {education.degree} • {education.period}
                        </p>
                    </div>
                    <div className="text-gray-500">
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
                        <p className={`${colors.secondary} mb-2`}>
                            Computer engineering education with focus on
                            software development and systems programming.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${colors.accent}`}
                            >
                                Computer Engineering
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${colors.accent}`}
                            >
                                Software Development
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${colors.accent}`}
                            >
                                Systems Programming
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
