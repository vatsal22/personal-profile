"use client";

import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProfileHero } from "@/components/ProfileHero";
import { SkillsSection } from "@/components/SkillsSection";
import { useTheme } from "@/context/ThemeContext";
import { profileData } from "@/data/profileData";

export default function Home() {
    const { colors } = useTheme();

    return (
        <main
            className={`min-h-screen bg-gradient-to-b ${colors.primary} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
        >
            <div className="max-w-4xl mx-auto">
                <ProfileHero
                    name={profileData.name}
                    title={profileData.title}
                    avatar={profileData.avatar}
                    location={profileData.location}
                />
                <AboutSection bio={profileData.bio} />
                <ExperienceSection
                    experiences={profileData.experiences}
                    education={profileData.education}
                />
                <SkillsSection skills={profileData.skills} />
                <ContactSection
                    email={profileData.email}
                    socialLinks={profileData.socialLinks}
                />
            </div>
        </main>
    );
}
