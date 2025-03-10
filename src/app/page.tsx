"use client";

import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { ProfileHero } from "@/components/ProfileHero";
import { SkillsSection } from "@/components/SkillsSection";
import { profileData } from "@/data/profileData";

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <ProfileHero
                    name={profileData.name}
                    title={profileData.title}
                    avatar={profileData.avatar}
                    location={profileData.location}
                />
                <AboutSection bio={profileData.bio} />
                <SkillsSection skills={profileData.skills} />
                <ContactSection
                    email={profileData.email}
                    socialLinks={profileData.socialLinks}
                />
            </div>
        </main>
    );
}
