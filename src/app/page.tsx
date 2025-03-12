"use client";

import { AboutSection } from "@/components/AboutSection";
import { CanadaGoose } from "@/components/CanadaGoose";
import { ContactSection } from "@/components/ContactSection";
import { CoopExperienceSection } from "@/components/CoopExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { ProfessionalExperienceSection } from "@/components/ProfessionalExperienceSection";
import { ProfileHero } from "@/components/ProfileHero";
import { SkillsSection } from "@/components/SkillsSection";
import { ThemeStyleProvider } from "@/components/ThemeStyleProvider";
import { TimelineSidebar } from "@/components/TimelineSidebar";
import { TldrToggle } from "@/components/TldrToggle";
import { useTheme } from "@/context/ThemeContext";
import { useTldr } from "@/context/TldrContext";
import { Experience, profileData } from "@/data/profileData";

export default function Home() {
    const { colors, currentTheme, expandedItem } = useTheme();
    const { isTldrMode } = useTldr();

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
        <ThemeStyleProvider>
            {/* UWaterloo purple PCB background overlay */}
            {waterlooPurplePCB}

            {/* Canada Goose that bounces around when UWaterloo theme is active */}
            <CanadaGoose />

            {/* Timeline Sidebar */}
            <TimelineSidebar />

            {/* TLDR Mode Toggle */}
            <TldrToggle />

            <main
                className={`relative z-10 min-h-screen bg-gradient-to-b ${colors.primary} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500`}
            >
                <div className="max-w-4xl mx-auto">
                    <ProfileHero
                        name={profileData.name}
                        title={profileData.title}
                        themeTitles={profileData.themeTitles}
                        avatar={profileData.avatar}
                        location={profileData.location}
                    />
                    <section id="about">
                        <AboutSection bio={profileData.bio} />
                    </section>
                    <section id="skills">
                        <SkillsSection skills={profileData.skills} />
                    </section>
                    <section id="education">
                        <EducationSection education={profileData.education} />
                    </section>
                    <section id="professional">
                        <ProfessionalExperienceSection
                            experiences={
                                profileData.professionalExperiences as Experience[]
                            }
                        />
                    </section>
                    {!isTldrMode && (
                        <section id="coop">
                            <CoopExperienceSection
                                experiences={
                                    profileData.coopExperiences as Experience[]
                                }
                            />
                        </section>
                    )}
                    <section id="contact">
                        <ContactSection
                            email={profileData.email}
                            socialLinks={profileData.socialLinks}
                        />
                    </section>
                </div>
            </main>
        </ThemeStyleProvider>
    );
}
