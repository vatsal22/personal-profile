import { ThemeProvider } from "@/context/ThemeContext";
import { TldrProvider } from "@/context/TldrContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Vatsal Solanki | Senior Software Engineer",
    description:
        "Vatsal Solanki - Senior Software Engineer at Roblox. Building distributed systems and release infrastructure serving 70M+ daily active users.",
    keywords: [
        "Vatsal Solanki",
        "Vatsal",
        "Vatsal S",
        "Software Engineer",
        "Roblox",
        "Distributed Systems",
        "University of Waterloo",
        "Computer Engineering",
    ],
    authors: [{ name: "Vatsal Solanki" }],
    creator: "Vatsal Solanki",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.vatsalsolanki.com",
        siteName: "Vatsal Solanki",
        title: "Vatsal Solanki | Senior Software Engineer",
        description:
            "Senior Software Engineer at Roblox. Building distributed systems and release infrastructure serving 70M+ daily active users.",
    },
    twitter: {
        card: "summary",
        title: "Vatsal Solanki | Senior Software Engineer",
        description:
            "Senior Software Engineer at Roblox. Building distributed systems and release infrastructure serving 70M+ daily active users.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vatsal Solanki",
    givenName: "Vatsal",
    familyName: "Solanki",
    jobTitle: "Senior Software Engineer",
    worksFor: {
        "@type": "Organization",
        name: "Roblox",
    },
    alumniOf: {
        "@type": "EducationalOrganization",
        name: "University of Waterloo",
    },
    url: "https://www.vatsalsolanki.com",
    email: "me@vatsalsolanki.com",
    address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US",
    },
    sameAs: [
        "https://github.com/vatsal22",
        "https://www.linkedin.com/in/vatsal-solanki/",
    ],
    knowsAbout: [
        "C++",
        "C#",
        "Java",
        "Python",
        "Distributed Systems",
        "Cloud Architecture",
        "CI/CD & DevOps",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <ThemeProvider>
                <TldrProvider>
                    <body className={inter.className}>{children}</body>
                </TldrProvider>
            </ThemeProvider>
        </html>
    );
}
