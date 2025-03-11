import { ThemeType } from "@/context/ThemeContext";

export interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
    themeKey: ThemeType;
    bulletPoints?: string[];
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
    capstoneProject?: Project;
}

export const profileData = {
    name: "Vatsal Solanki",
    title: "Software Engineer",
    themeTitles: {
        default: "Software Engineer",
        uwaterloo: "Professional Lazeez Enjoyer",
        roblox: "Professional Sev-0 Causer",
        windriver: "Professional Bug Developer",
        hubhead: "Professional Bug Developer",
        thomson: "Professional Bug Developer",
        escrypt: "Professional Bug Developer",
        imagine: "Professional Bug Developer",
        oanda: "Professional Bug Developer",
    },
    bio: "Computer engineering graduate from University of Waterloo with extensive experience in software development across various domains including operating systems, security, and gaming infrastructure.",
    avatar: "/profile-placeholder.jpg",
    location: "San Francisco, CA",
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
        github: "https://github.com/vatsal22",
        linkedin: "https://www.linkedin.com/in/vatsal-solanki/",
        twitter: "https://twitter.com/vatsalsolanki22",
    },
    education: {
        university: "University of Waterloo",
        degree: "BASc, Computer Engineering (Honours)",
        period: "2017-2022",
        themeKey: "uwaterloo" as ThemeType,
        description:
            "Elective focus on systems programming and scalable infrastructure, with co-op experience across a wide range of domains including real-time operating systems, security systems, and trading platforms.",
        coursework: [
            "Real-Time Operating Systems: Core systems architecture and concurrency management",
            "Distributed Computing: Large-scale service deployment and coordination",
            "Programming for Performance: Optimization techniques for high-performance systems",
            "Computer Networks: Design and implementation of networked systems",
        ],
        capstoneProject: {
            id: "eyefly",
            name: "EyeFly Drone",
            description:
                "An autonomous search and rescue drone system with AI-powered detection capabilities, comprehensive telemetry monitoring, and robust backend infrastructure for remote operation in challenging environments.",
            technologies: [
                "Computer Vision (TensorFlow, Fine-tuning RCNN model)",
                "Embedded Systems",
                "Python",
                "C",
                "C++",
                "Terraform",
                "MongoDB",
            ],
            themeKey: "uwaterloo" as ThemeType,
            links: {
                capstone:
                    "https://www.eng.uwaterloo.ca/2022-capstone-design/electrical-computer/participants/#block-100099342",
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
    },
    professionalExperiences: [
        {
            id: "roblox",
            title: "Software Engineer | Engine Release Team",
            company: "Roblox",
            period: "July 2022 - Present",
            description:
                "Developing high performance cross-platform systems for release, feature flagging, and channels (targeted feature changes in production).",
            technologies: ["C++", "C#", "Python", "TypeScript", "Lua"],
            themeKey: "roblox" as ThemeType,
            bulletPoints: [
                "Feature Flags - Developing and maintaining a feature flagging system across clients, studio, and servers, enabling controlled rollouts with automated monitoring and rollbacks.",

                "Flag and Binary Deployment Channels - Architecting secure, self-serve deployment channels that provide granular public targeting while preventing unauthorized access to internal channels.",

                "Telemetry & Monitoring - Designing comprehensive telemetry and alerting systems to track engine health, enabling early issue detection and data-driven release decisions.",

                "Technical Incident Response - Serving as on-call engineer diagnosing, mitigating, and resolving critical production issues across engine and backend systems, improving platform stability.",

                "Developer Experience Tools - Creating intuitive interfaces and tools to simplify flag management, channel deployment, and telemetry monitoring, improving engineering productivity and reliability.",
            ],
        },
    ],
    coopExperiences: [
        {
            id: "oanda",
            title: "Software Developer | Hedging Team",
            company: "Oanda",
            period: "Sept. 2021 - Dec. 2021",
            description:
                "Built high-performance distributed systems for processing and analyzing financial trading data at scale.",
            technologies: ["C++", "Kafka", "Avro", "Distributed Systems"],
            themeKey: "oanda" as ThemeType,
            bulletPoints: [
                "Developed high-performance C++ microservices to ingest, process, and distribute thousands of concurrent user trades using Kafka.",
                "Optimized distributed compute performance by implementing Avro serialization, reducing latency for real-time forex hedging algorithms and increasing quantitative backtesting speeds.",
            ],
        },
        {
            id: "imagine",
            title: "Software Engineering",
            company: "Imagine Communications",
            period: "Sept. 2020 - Dec. 2020",
            description:
                "Enhanced telemetry and monitoring systems for broadcast media infrastructure, focusing on performance optimization and cross-service communication.",
            technologies: [
                "C#",
                "C++",
                "Distributed Systems",
                "Performance Optimization",
            ],
            themeKey: "imagine" as ThemeType,
            bulletPoints: [
                "Architected and implemented customizable configuration system that reduced manual setup time by over 20% and eliminated common user errors through structured validation.",
                "Developed critical interoperability layer between legacy C++ services and modern C# services, enabling seamless integration without disrupting existing workflows.",
            ],
        },
        {
            id: "escrypt",
            title: "Software Developer",
            company: "Escrypt",
            period: "Jan. 2020 - Apr. 2020",
            description:
                "Developed keyless entry and fleet management access control system.",
            technologies: ["Java", "OAuth", "REST", "Cloud Security", "AWS"],
            themeKey: "escrypt" as ThemeType,
            bulletPoints: [
                "Mentored junior intern while architecting secure API authentication using OAuth access tokens, reducing database reads by 20% and improving security posture.",
                "Identified and resolved critical security vulnerability that allowed unauthorized access to user data through brute force attacks, implementing robust request validation and error handling.",
            ],
        },
        {
            id: "thomson",
            title: "Software Developer",
            company: "Thomson Reuters",
            period: "May 2019 - Aug. 2019",
            description:
                "Worked on the enterprise tax software team, primarily developing and optimizing backend API services using C#.",
            technologies: [
                "C#",
                ".NET",
                "REST APIs",
                "Multi-threading",
                "Caching",
            ],
            themeKey: "thomson" as ThemeType,
            bulletPoints: [
                "Optimized computation-intensive APIs by using caching, multi-threading, and other techniques, resulting in 80% speedup.",
                "Designed and implemented REST APIs that transformed complex financial calculations into accessible endpoints, improving customer productivity and integration difficulty.",
            ],
        },
        {
            id: "hubhead",
            title: "Java Developer",
            company: "HubHead",
            period: "Sept. 2018 - Dec. 2018",
            description:
                "Designed and implemented cross-platform deployment and update infrastructure for enterprise asset management Java application.",
            technologies: ["Java", "Groovy", "Release Automation", "CI/CD"],
            themeKey: "hubhead" as ThemeType,
            bulletPoints: [
                "Engineered a high-performance deployment pipeline that reduced application launch times by 50% through concurrent resource validation, while implementing automated versioning on deploys.",
            ],
        },
        {
            id: "windriver",
            title: "Test Engineer",
            company: "Wind River",
            period: "Jan. 2018 - Apr. 2018",
            description:
                "Tested and debugged VxWorks, a real-time operating system, working with low-level C and assembly code across various hardware configurations.",
            technologies: ["C", "Assembly", "Python", "Real-time OS"],
            themeKey: "windriver" as ThemeType,
            bulletPoints: [
                "Developed a Python-based monitoring tool to observe and log the status of running hardware test instances, streamlining the verification and monitoring process for automated tests.",
            ],
        },
    ],
    projects: [
        // Add more projects as needed
    ],
};
