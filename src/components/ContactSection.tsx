"use client";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

type ContactSectionProps = {
    email: string;
    socialLinks: {
        github: string;
        linkedin: string;
        twitter: string;
    };
};

export const ContactSection = ({ email, socialLinks }: ContactSectionProps) => {
    const handleContactClick = () => {
        window.location.href = `mailto:${email}`;
    };

    return (
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
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    aria-label="Visit my GitHub profile"
                >
                    <FaGithub className="w-6 h-6" />
                </a>
                <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    aria-label="Visit my LinkedIn profile"
                >
                    <FaLinkedin className="w-6 h-6" />
                </a>
                <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    aria-label="Visit my Twitter profile"
                >
                    <FaTwitter className="w-6 h-6" />
                </a>
            </div>
        </section>
    );
};
