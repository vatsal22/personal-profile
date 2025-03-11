"use client";

import { Experience } from "@/data/profileData";
import { ExperienceSection } from "./ExperienceSection";

type ProfessionalExperienceSectionProps = {
    experiences: Experience[];
};

export const ProfessionalExperienceSection = ({
    experiences,
}: ProfessionalExperienceSectionProps) => {
    return (
        <ExperienceSection
            title="Professional Experience"
            experiences={experiences}
            headingId="professional-experience-heading"
            showBulletPoints={true}
            showRobloxFeature={true}
        />
    );
};
