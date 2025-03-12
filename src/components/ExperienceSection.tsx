"use client";

import { themes, ThemeType, useTheme } from "@/context/ThemeContext";
import { useTldr } from "@/context/TldrContext";
import { Experience } from "@/data/profileData";
import { RobloxFeaturePanel } from "./RobloxFeaturePanel";

type ExperienceSectionProps = {
    title: string;
    experiences: Experience[];
    headingId: string;
    showBulletPoints?: boolean;
    showRobloxFeature?: boolean;
    getBorderColor?: (experienceId: string) => string;
};

export const ExperienceSection = ({
    title,
    experiences,
    headingId,
    showBulletPoints = false,
    showRobloxFeature = false,
    getBorderColor,
}: ExperienceSectionProps) => {
    const { setTheme, colors, expandedItem, setExpandedItem } = useTheme();
    const { isTldrMode } = useTldr();

    const handleExperienceClick = (
        experienceId: string,
        themeKey: ThemeType
    ) => {
        if (expandedItem === experienceId) {
            // Collapse if already expanded
            setExpandedItem(null);
            setTheme("default");
        } else {
            // Expand and collapse any other expanded item
            setExpandedItem(experienceId);
            setTheme(themeKey);
        }
    };

    const getDefaultBorderColor = (experienceId: string) => {
        return (
            themes[experienceId as ThemeType]?.borderColor ||
            themes.default.borderColor
        );
    };

    // Use provided border color function or fall back to default
    const borderColorFn = getBorderColor || getDefaultBorderColor;

    return (
        <section
            className={`${colors.cardBg} rounded-lg shadow-md p-8 mb-8`}
            aria-labelledby={headingId}
        >
            <h2
                id={headingId}
                className={`text-2xl font-semibold ${colors.text} mb-6 section-header`}
            >
                {title}
            </h2>

            {experiences.map((experience) => (
                <div
                    key={experience.id}
                    className={`p-4 border rounded-lg mb-4 cursor-pointer transition-all duration-300 ${
                        expandedItem === experience.id
                            ? `border-${borderColorFn(
                                  experience.id
                              )}-400 shadow-md ${colors.background}`
                            : "border-gray-200"
                    } ${
                        colors.cardHoverEffect
                            ? colors.cardHoverEffect
                            : "hover:shadow-md"
                    }`}
                    onClick={() =>
                        handleExperienceClick(
                            experience.id,
                            experience.themeKey
                        )
                    }
                    onKeyDown={(e) =>
                        e.key === "Enter" &&
                        handleExperienceClick(
                            experience.id,
                            experience.themeKey
                        )
                    }
                    tabIndex={0}
                    aria-label={`${experience.company} - ${experience.title}`}
                    role="button"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h3
                                className={`font-medium text-lg ${colors.text} experience-title`}
                            >
                                {experience.company}
                            </h3>
                            <p className={`${colors.secondary}`}>
                                {experience.title} • {experience.period}
                            </p>
                        </div>
                        <div className="text-gray-500">
                            {expandedItem === experience.id ? (
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

                    <p className={`${colors.secondary} mt-3 mb-2`}>
                        {isTldrMode && experience.tldrDescription
                            ? experience.tldrDescription
                            : experience.description}
                    </p>

                    {expandedItem === experience.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 relative">
                            {showBulletPoints &&
                                experience.bulletPoints &&
                                experience.bulletPoints.length > 0 && (
                                    <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200 relative overflow-hidden">
                                        {/* Subtle pattern background */}
                                        <div className="absolute inset-0 opacity-5">
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-transparent"></div>
                                        </div>
                                        <h4
                                            className={`font-medium mb-2 ${colors.text} relative z-10`}
                                        >
                                            Key Responsibilities
                                        </h4>
                                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 relative z-10">
                                            {(isTldrMode &&
                                            experience.tldrBulletPoints
                                                ? experience.tldrBulletPoints
                                                : experience.bulletPoints
                                            ).map((point, index) => (
                                                <li key={index}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                            <h4 className={`font-medium mb-2 ${colors.text}`}>
                                Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${colors.accent}`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Show feature flag panel button only if enabled and this is Roblox experience */}
                            {showRobloxFeature &&
                                experience.id === "roblox" && (
                                    <>
                                        {/* Add extra padding at the bottom for the button */}
                                        <div className="pb-20"></div>
                                        <div
                                            className="absolute bottom-4 right-4 z-20"
                                            onClick={(e) => e.stopPropagation()}
                                            onKeyDown={(e) =>
                                                e.stopPropagation()
                                            }
                                        >
                                            <RobloxFeaturePanel inline={true} />
                                        </div>
                                    </>
                                )}
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};
