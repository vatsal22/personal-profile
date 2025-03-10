"use client";

import { useTheme } from "@/context/ThemeContext";

type AboutSectionProps = {
    bio: string;
};

export const AboutSection = ({ bio }: AboutSectionProps) => {
    const { colors } = useTheme();

    return (
        <section
            className={`${colors.cardBg} rounded-lg shadow-md p-8 mb-8`}
            aria-labelledby="about-heading"
        >
            <h2
                id="about-heading"
                className={`text-2xl font-semibold ${colors.text} mb-4 section-header`}
            >
                About Me
            </h2>
            <p className={`${colors.secondary} leading-relaxed`}>{bio}</p>
        </section>
    );
};
