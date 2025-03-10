"use client";

import { ThemeType, useTheme } from "@/context/ThemeContext";
import { Experience } from "@/data/profileData";
import { useState } from "react";

type ExperienceSectionProps = {
    experiences: Experience[];
    education: {
        university: string;
        degree: string;
        period: string;
        themeKey: ThemeType;
    };
};

export const ExperienceSection = ({
    experiences,
    education,
}: ExperienceSectionProps) => {
    const { setTheme, colors, currentTheme } = useTheme();
    const [expandedExperience, setExpandedExperience] = useState<string | null>(
        null
    );

    const handleExperienceClick = (
        experienceId: string,
        themeKey: ThemeType
    ) => {
        if (expandedExperience === experienceId) {
            setExpandedExperience(null);
            setTheme("default");
        } else {
            setExpandedExperience(experienceId);
            setTheme(themeKey);
        }
    };

    const handleEducationClick = () => {
        if (expandedExperience === "education") {
            setExpandedExperience(null);
            setTheme("default");
        } else {
            setExpandedExperience("education");
            setTheme(education.themeKey);
        }
    };

    return (
        <section
            className={`${colors.background} rounded-lg shadow-md p-8 mb-8`}
            aria-labelledby="experience-heading"
        >
            <h2
                id="experience-heading"
                className={`text-2xl font-semibold ${colors.text} mb-6`}
            >
                Experience
            </h2>

            {/* Education Card */}
            <div
                className={`p-4 border rounded-lg mb-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                    expandedExperience === "education"
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
                        {expandedExperience === "education" ? (
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

                {expandedExperience === "education" && (
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

            {/* Work Experiences */}
            {experiences.map((experience) => (
                <div
                    key={experience.id}
                    className={`p-4 border rounded-lg mb-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                        expandedExperience === experience.id
                            ? `border-${
                                  experience.id === "roblox"
                                      ? "red"
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
                                className={`font-medium text-lg ${colors.text}`}
                            >
                                {experience.company}
                            </h3>
                            <p className={`${colors.secondary}`}>
                                {experience.title} • {experience.period}
                            </p>
                        </div>
                        <div className="text-gray-500">
                            {expandedExperience === experience.id ? (
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

                    {expandedExperience === experience.id && (
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
