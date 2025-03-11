"use client";

import { themes, ThemeType } from "@/context/ThemeContext";
import { Experience } from "@/data/profileData";
import { ExperienceSection } from "./ExperienceSection";

type ProfessionalExperienceSectionProps = {
    experiences: Experience[];
};

export const ProfessionalExperienceSection = ({
    experiences,
}: ProfessionalExperienceSectionProps) => {
    const getBorderColor = (experienceId: string): string => {
        return (
            themes[experienceId as ThemeType]?.borderColor ||
            themes.default.borderColor
        );
    };

    return (
        <ExperienceSection
            title="Professional Experience"
            experiences={experiences}
            headingId="professional-experience-heading"
            showBulletPoints={true}
            showRobloxFeature={true}
            getBorderColor={getBorderColor}
        />
    );
};
