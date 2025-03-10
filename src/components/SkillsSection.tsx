"use client";

import { useTheme } from "@/context/ThemeContext";

type SkillsSectionProps = {
    skills: string[];
};

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
    const { colors } = useTheme();

    return (
        <section
            className={`${colors.cardBg} rounded-lg shadow-md p-8 mb-8`}
            aria-labelledby="skills-heading"
        >
            <h2
                id="skills-heading"
                className={`text-2xl font-semibold ${colors.text} mb-4 section-header`}
            >
                Skills
            </h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className={`px-4 py-2 ${colors.accent} rounded-full text-sm font-medium`}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
};
