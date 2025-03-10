"use client";

import { ThemeType, useTheme } from "@/context/ThemeContext";
import { Experience } from "@/data/profileData";

type CoopExperienceSectionProps = {
    experiences: Experience[];
};

export const CoopExperienceSection = ({
    experiences,
}: CoopExperienceSectionProps) => {
    const { setTheme, colors, expandedItem, setExpandedItem } = useTheme();

    // No need to filter experiences, they're already filtered in profileData

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

    return (
        <section
            className={`${colors.cardBg} rounded-lg shadow-md p-8 mb-8`}
            aria-labelledby="coop-experience-heading"
        >
            <h2
                id="coop-experience-heading"
                className={`text-2xl font-semibold ${colors.text} mb-6 section-header`}
            >
                Co-op Experience
            </h2>

            {/* Co-op Work Experiences */}
            {experiences.map((experience) => (
                <div
                    key={experience.id}
                    className={`p-4 border rounded-lg mb-4 cursor-pointer transition-all duration-300 ${
                        expandedItem === experience.id
                            ? `border-${
                                  experience.id === "roblox"
                                      ? "gray-400"
                                      : experience.id === "oanda"
                                      ? "indigo"
                                      : experience.id === "imagine"
                                      ? "pink"
                                      : experience.id === "escrypt"
                                      ? "purple"
                                      : experience.id === "thomson"
                                      ? "orange"
                                      : experience.id === "hubhead"
                                      ? "green"
                                      : "blue"
                              }-400 shadow-md ${colors.background}`
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

                    {expandedItem === experience.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className={`${colors.secondary} mb-4`}>
                                {experience.description}
                            </p>
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
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};
