"use client";

import { AboutSection } from "@/components/AboutSection";
import { CanadaGoose } from "@/components/CanadaGoose";
import { ContactSection } from "@/components/ContactSection";
import { CoopExperienceSection } from "@/components/CoopExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { ProfessionalExperienceSection } from "@/components/ProfessionalExperienceSection";
import { ProfileHero } from "@/components/ProfileHero";
import { SkillsSection } from "@/components/SkillsSection";
import { useTheme } from "@/context/ThemeContext";
import { Experience, profileData } from "@/data/profileData";

export default function Home() {
    const { colors, currentTheme, expandedItem } = useTheme();

    // Special background styling for UWaterloo Engineering theme with PCB pattern
    const isUWaterloo = currentTheme === "uwaterloo";
    const waterlooPurplePCB =
        isUWaterloo && expandedItem === "education" ? (
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* PCB pattern background */}
                <div className="absolute inset-0 bg-[url('/pcb-pattern.svg')] bg-repeat opacity-10"></div>

                {/* Subtle top border only - removing right and bottom borders */}
                <div className="absolute top-0 w-full h-4 bg-[#5D0096] opacity-30"></div>
            </div>
        ) : null;

    return (
        <>
            {/* UWaterloo purple PCB background overlay */}
            {waterlooPurplePCB}

            {/* Canada Goose that bounces around when UWaterloo theme is active */}
            <CanadaGoose />

            <main
                className={`relative z-10 min-h-screen bg-gradient-to-b ${colors.primary} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500`}
            >
                <div className="max-w-4xl mx-auto">
                    <ProfileHero
                        name={profileData.name}
                        title={profileData.title}
                        avatar={profileData.avatar}
                        location={profileData.location}
                    />
                    <AboutSection bio={profileData.bio} />
                    <EducationSection education={profileData.education} />
                    <ProfessionalExperienceSection
                        experiences={
                            profileData.professionalExperiences as Experience[]
                        }
                    />
                    <CoopExperienceSection
                        experiences={
                            profileData.coopExperiences as Experience[]
                        }
                    />
                    <SkillsSection skills={profileData.skills} />
                    <ContactSection
                        email={profileData.email}
                        socialLinks={profileData.socialLinks}
                    />
                </div>
            </main>
        </>
    );
}
