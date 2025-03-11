"use client";

import { Experience } from "@/data/profileData";
import { ExperienceSection } from "./ExperienceSection";

type CoopExperienceSectionProps = {
    experiences: Experience[];
};

export const CoopExperienceSection = ({
    experiences,
}: CoopExperienceSectionProps) => {
    // Custom border color function for co-op experiences
    const getCoopBorderColor = (experienceId: string): string => {
        switch (experienceId) {
            case "roblox":
                return "gray-400";
            case "oanda":
                return "indigo";
            case "imagine":
                return "pink";
            case "escrypt":
                return "purple";
            case "thomson":
                return "orange";
            case "hubhead":
                return "green";
            default:
                return "blue";
        }
    };

    return (
        <ExperienceSection
            title="Co-op Experience"
            experiences={experiences}
            headingId="coop-experience-heading"
            getBorderColor={getCoopBorderColor}
            showBulletPoints={true}
        />
    );
};
