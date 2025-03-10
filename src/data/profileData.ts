import { ThemeType } from "@/context/ThemeContext";

export interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
    themeKey: ThemeType;
}

export interface ProjectImage {
    id: number;
    src: string;
    alt: string;
    caption: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    images: ProjectImage[];
    links?: {
        [key: string]: string;
    };
    technologies: string[];
    themeKey: ThemeType;
}

export interface Education {
    university: string;
    degree: string;
    period: string;
    themeKey: ThemeType;
    description?: string;
    coursework?: string[];
}

export const profileData = {
    name: "John Doe",
    title: "Engine Release Engineer at Roblox",
    bio: "Computer engineering graduate from University of Waterloo with extensive experience in software development across various domains including operating systems, security, and gaming infrastructure.",
    avatar: "/profile-placeholder.jpg",
    location: "San Mateo, CA",
    email: "john.doe@example.com",
    skills: [
        "C++",
        "C#",
        "Python",
        "TypeScript",
        "Java",
        "Assembly",
        "React",
        "Git",
    ],
    socialLinks: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
    },
    education: {
        university: "University of Waterloo",
        degree: "BASc, Computer Engineering (Honours)",
        period: "2017-2022",
        themeKey: "uwaterloo" as ThemeType,
        description:
            "Computer engineering elective focus on systems programming and infrastructure development, with co-op experience across operating systems (WinDriver), security systems (Escrypt), and trading platforms (Oanda).",
        coursework: [
            "Real-Time Operating Systems: Core systems architecture and concurrency management",
            "Distributed Computing: Large-scale service deployment and coordination",
            "Programming for Performance: Optimization techniques for high-performance systems",
            "Computer Networks: Design and implementation of networked systems",
        ],
    },
    experiences: [
        {
            id: "roblox",
            title: "Engine Release Engineer",
            company: "Roblox",
            period: "2021-Present (3 years)",
            description:
                "Working on the Engine Release Team, focused on the release, flags, and channels system. Primary responsibilities include developing and maintaining C++ components for client/server changes, C# for backend systems, and occasional Python/TypeScript scripting for build automation.",
            technologies: ["C++", "C#", "Python", "TypeScript"],
            themeKey: "roblox" as ThemeType,
        },
        {
            id: "oanda",
            title: "Software Engineer",
            company: "Oanda",
            period: "2020 (4 months)",
            description:
                "Worked on the hedging team, primarily using C++ to develop and optimize financial algorithms and systems.",
            technologies: ["C++", "Financial Systems"],
            themeKey: "oanda" as ThemeType,
        },
        {
            id: "imagine",
            title: "Software Developer",
            company: "Imagine Communications",
            period: "2019 (4 months)",
            description:
                "Contributed to Magellan Navigator, a control and monitoring solution for broadcast media infrastructure, primarily using C#.",
            technologies: ["C#", "Broadcast Media Systems"],
            themeKey: "imagine" as ThemeType,
        },
        {
            id: "escrypt",
            title: "Security Engineer",
            company: "Escrypt",
            period: "2019 (4 months)",
            description:
                "Worked on the keyless car entry and truck fleet management team, developing embedded C and C# solutions, and briefly on C++ for a driver for an automotive ECU security module.",
            technologies: ["Embedded C", "C#", "C++", "Security"],
            themeKey: "escrypt" as ThemeType,
        },
        {
            id: "thomson",
            title: "Backend Developer",
            company: "Thomson Reuters",
            period: "2018 (4 months)",
            description:
                "Worked on the tax software team, primarily developing backend API services using C#.",
            technologies: ["C#", "API Development", "Tax Software"],
            themeKey: "thomson" as ThemeType,
        },
        {
            id: "hubhead",
            title: "Software Engineer",
            company: "Hubhead",
            period: "2018 (4 months)",
            description:
                "Worked at a startup revamping the installation and update system using an open source library called Getdown, primarily using Java.",
            technologies: ["Java", "Getdown", "Software Distribution"],
            themeKey: "hubhead" as ThemeType,
        },
        {
            id: "windriver",
            title: "Software Developer",
            company: "Wind River",
            period: "2017 (4 months)",
            description:
                "Worked on the VxWorks operating system, focusing on debugging and manual testing of C and assembly code. Developed Python scripts for automating and gathering status of test machines.",
            technologies: ["C", "Assembly", "Python", "VxWorks OS"],
            themeKey: "windriver" as ThemeType,
        },
    ],
    projects: [
        {
            id: "eyefly",
            name: "EyeFly Drone",
            description:
                "Capstone project - An autonomous surveillance drone with AI-powered detection capabilities",
            technologies: [
                "Computer Vision (TensorFlow, Fine-tuning RCNN model)",
                "Embedded Systems",
                "Python",
                "C",
                "C++",
                "Terrafom",
            ],
            themeKey: "uwaterloo" as ThemeType,
            links: {
                capstone: "https://uwaterloo.ca/capstone-design/",
            },
            images: [
                {
                    id: 1,
                    src: "/eyefly/eyefly_assembled_drone.webp",
                    alt: "EyeFly Assembled Drone",
                    caption:
                        "Fully assembled EyeFly drone prototype with camera module",
                },
                {
                    id: 2,
                    src: "/eyefly/eyeflye_person_detected_flying.png",
                    alt: "Person Detection System in Action",
                    caption:
                        "EyeFly's AI detection system identifying a person, seen from real-time monitoring dashboard.",
                },
                {
                    id: 3,
                    src: "/eyefly/eyefly_dashboard.webp",
                    alt: "EyeFly Control Dashboard",
                    caption:
                        "Real-time monitoring dashboard for monitoring drone vitals and status.",
                },
                {
                    id: 4,
                    src: "/eyefly/eyefly_drone_pdb_component.webp",
                    alt: "EyeFly PDB Component",
                    caption:
                        "Central power distribution board (PDB) component for prototype drone.",
                },
                {
                    id: 5,
                    src: "/eyefly/eyefly_system_block_diagram.webp",
                    alt: "EyeFly System Architecture",
                    caption:
                        "System block diagram of entire system, including drone and backend infrastructure.",
                },
            ],
        },
        // Add more projects as needed
    ],
};
