"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const profileData = {
    name: "John Doe",
    title: "Senior Frontend Developer",
    bio: "Passionate frontend developer with 5+ years of experience in building modern web applications. Specialized in React, TypeScript, and modern UI frameworks.",
    avatar: "/profile-placeholder.jpg",
    location: "San Francisco, CA",
    email: "john.doe@example.com",
    skills: [
        "React",
        "TypeScript",
        "Next.js",
        "TailwindCSS",
        "Node.js",
        "GraphQL",
        "REST APIs",
        "Git",
    ],
    socialLinks: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
    },
};

export default function Home() {
    const handleContactClick = () => {
        window.location.href = `mailto:${profileData.email}`;
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="relative w-32 h-32 mx-auto mb-8">
                        <Image
                            src={profileData.avatar}
                            alt={profileData.name}
                            fill
                            className="rounded-full object-cover shadow-lg"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {profileData.name}
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">
                        {profileData.title}
                    </p>
                    <p className="text-gray-500 flex items-center justify-center gap-2">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        {profileData.location}
                    </p>
                </div>

                {/* About Section */}
                <section
                    className="bg-white rounded-lg shadow-md p-8 mb-8"
                    aria-labelledby="about-heading"
                >
                    <h2
                        id="about-heading"
                        className="text-2xl font-semibold text-gray-900 mb-4"
                    >
                        About Me
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {profileData.bio}
                    </p>
                </section>

                {/* Skills Section */}
                <section
                    className="bg-white rounded-lg shadow-md p-8 mb-8"
                    aria-labelledby="skills-heading"
                >
                    <h2
                        id="skills-heading"
                        className="text-2xl font-semibold text-gray-900 mb-4"
                    >
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    className="bg-white rounded-lg shadow-md p-8 mb-8"
                    aria-labelledby="contact-heading"
                >
                    <h2
                        id="contact-heading"
                        className="text-2xl font-semibold text-gray-900 mb-4"
                    >
                        Get in Touch
                    </h2>
                    <button
                        onClick={handleContactClick}
                        className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-medium 
                     hover:bg-blue-700 transition-colors duration-200 mb-6"
                        aria-label="Contact me via email"
                    >
                        Contact Me
                    </button>
                    <div className="flex justify-center gap-6">
                        <a
                            href={profileData.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            aria-label="Visit my GitHub profile"
                        >
                            <FaGithub className="w-6 h-6" />
                        </a>
                        <a
                            href={profileData.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            aria-label="Visit my LinkedIn profile"
                        >
                            <FaLinkedin className="w-6 h-6" />
                        </a>
                        <a
                            href={profileData.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            aria-label="Visit my Twitter profile"
                        >
                            <FaTwitter className="w-6 h-6" />
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
