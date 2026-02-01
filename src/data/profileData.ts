import { ThemeType } from "@/context/ThemeContext";

export interface Position {
    title: string;
    period: string;
}

export interface BulletPointGroup {
    category: string;
    items: string[];
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
    themeKey: ThemeType;
    bulletPoints?: string[];
    bulletPointGroups?: BulletPointGroup[]; // Grouped bullet points with categories
    tldrDescription?: string;
    tldrBulletPoints?: string[];
    tldrBulletPointGroups?: BulletPointGroup[]; // TLDR version of grouped bullets
    positions?: Position[]; // For companies where you had multiple roles
}

export interface ProjectImage {
    id: number;
    src: string;
    alt: string;
    caption: string;
    tldrCaption?: string;
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
    tldrName?: string;
    tldrDescription?: string;
}

export interface Education {
    university: string;
    degree: string;
    period: string;
    themeKey: ThemeType;
    description?: string;
    coursework?: string[];
    capstoneProject?: Project;
    tldrDegree?: string;
    tldrDescription?: string;
    tldrCoursework?: string[];
}

export const profileData = {
    name: "Vatsal Solanki",
    title: "Senior Software Engineer",
    themeTitles: {
        default: "Senior Software Engineer",
        uwaterloo: "Professional Goose Avoider",
        roblox: "Professional Sev-0 Preventer",
        windriver: "Professional Bug Developer",
        hubhead: "Professional Bug Developer",
        thomson: "Professional Bug Developer",
        escrypt: "Professional Bug Developer",
        imagine: "Professional Bug Developer",
        oanda: "Professional Bug Developer",
    },
    bio: "Hi! I'm a University of Waterloo computer engineering graduate with experience ranging from embedded hardware to financial systems to UGC gaming platforms.\n\nCurrently I'm working at Roblox improving system reliability to help us scale to tens of millions of users.\n\nRegardless of the domain, I enjoy building elegant solutions to hard problems, from eliminating bias in AB testing systems to building an app to optimize my running & workout schedule 🏃",
    tldrBio: "I like tricking computers into doing what I want.",
    avatar: "/profile_image4.jpeg",
    location: "San Francisco, CA",
    email: "me@vatsalsolanki.com",
    skills: [
        "C++",
        "C#",
        "Java",
        "Python",
        "Distributed Systems",
        "Cloud Architecture",
        "CI/CD & DevOps",
    ],
    socialLinks: {
        github: "https://github.com/vatsal22",
        linkedin: "https://www.linkedin.com/in/vatsal-solanki/",
    },
    education: {
        university: "University of Waterloo",
        degree: "BASc, Computer Engineering (Honours)",
        period: "2017-2022",
        themeKey: "uwaterloo" as ThemeType,
        description:
            "Elective focus on systems programming and scalable infrastructure, with co-op experience across a wide range of domains including real-time operating systems, security systems, and trading platforms.",
        coursework: [
            "Real-Time Operating Systems: OS design, kernel development, and process scheduling",
            "Distributed Computing: Fault-tolerant architectures and distributed synchronization",
            "Programming for Performance: Multicore optimization, SIMD, and cache efficiency",
            "Computer Networks: TCP/IP protocols, routing algorithms, and network architecture",
        ],
        tldrDescription:
            "I spent 4.5 years learning how to tell computers what to do, how to make them do things efficiently, and how to make them work together.",

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
            tldrName: "Flying Robot That Finds People",
            tldrDescription:
                "Made a drone that flies around, takes pictures, and finds lost hikers before they become bear food.",
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
        // Archived detailed version - kept for reference
        // {
        //     id: "roblox",
        //     title: "Senior Software Engineer",
        //     company: "Roblox",
        //     period: "July 2022 - Present",
        //     positions: [
        //         {
        //             title: "Software Engineer",
        //             period: "July 2022 - July 2024",
        //         },
        //         {
        //             title: "Senior Software Engineer",
        //             period: "July 2024 - Present",
        //         },
        //     ],
        //     description:
        //         "Building mission-critical release and feature management systems that enable safe, rapid deployment across Roblox's multi-platform ecosystem (mobile, console, desktop) serving 70M+ daily active users.",
        //     technologies: ["C++", "C#", "Java", "Python", "TypeScript", "Lua"],
        //     themeKey: "roblox" as ThemeType,
        //     tldrDescription:
        //         "I make sure we can make Roblox better without accidentally breaking something.",
        //     tldrBulletPointGroups: [
        //         {
        //             category: "Feature Flags",
        //             items: [
        //                 "I create systems to enable features and ensure they can be switched off automatically before anyone notices we've broken something.",
        //             ],
        //         },
        //         {
        //             category: "Release Channels",
        //             items: [
        //                 "I let engineers test new features on unsuspecting users before unleashing them on everyone else.",
        //             ],
        //         },
        //         {
        //             category: "Telemetry & Incident Response",
        //             items: [
        //                 "I make sure we know when things break, can figure out what broke, and fix it before it breaks again.",
        //             ],
        //         },
        //     ],
        //     bulletPointGroups: [
        //         {
        //             category: "Cost Optimization",
        //             items: [
        //                 "Implemented If-Modified-Since support for flag endpoints, eliminating redundant downloads across millions of clients and saving millions annually in infrastructure costs.",
        //             ],
        //         },
        //         {
        //             category: "Platform Reliability",
        //             items: [
        //                 "Led telemetry integration across Systems and Apps teams, adding comprehensive client and game server telemetry with automated alerting.",
        //                 "Contributed to reducing critical production incidents (Sev-0) from multiple per year to fewer than 2-3 annually through channel, flag, and release improvements, some of which are detailed below.",
        //             ],
        //         },
        //         {
        //             category: "Feature Flags",
        //             items: [
        //                 "Implemented low-overhead graduated rollout system (0→100%) with automated health monitoring and rollbacks, enabling safe feature deployment at scale.",
        //                 "Unified disparate flag systems across C++, Java, and Lua codebases, enabling rollouts and advanced flag features for dozens of teams while simplifying development experience.",
        //             ],
        //         },
        //         {
        //             category: "Release Channels",
        //             items: [
        //                 "Implemented flag-only channel support, enabling feature flag testing across all platforms.",
        //                 "Enabled app platform teams to push Lua code changes (in addition to flags and binary changes) to channels, dramatically accelerating iteration cycles.",
        //                 "Secured channel infrastructure with client-side JWT authentication to prevent unauthorized access while maintaining fast load times through async and cached requests, eliminating feature leaks through channels.",
        //             ],
        //         },
        //         {
        //             category: "Developer Tooling",
        //             items: [
        //                 "Built channel APIs to support an internal self-serve channel management portal, allowing engineers to iterate and test changes with public users, improving release reliability.",
        //             ],
        //         },
        //         {
        //             category: "Technical Leadership",
        //             items: [
        //                 "Mentored 3 junior engineers on projects including staged rollouts (i.e., flexible flag rollouts), flag experimentation telemetry, and channel reliability improvements.",
        //                 "Leading development of a greenfield service to centralize channels and releases into a single source of truth (currently scattered across services and teams), streamlining developer experience.",
        //             ],
        //         },
        //     ],
        // },
        {
            id: "roblox",
            title: "Senior Software Engineer",
            company: "Roblox",
            period: "July 2022 - Present",
            positions: [
                {
                    title: "Software Engineer",
                    period: "July 2022 - July 2024",
                },
                {
                    title: "Senior Software Engineer",
                    period: "July 2024 - Present",
                },
            ],
            description:
                "Building mission-critical release and feature management systems that enable safe, rapid deployment across Roblox's multi-platform ecosystem (mobile, console, desktop) serving 70M+ daily active users.",
            technologies: ["C++", "C#", "Java", "Python", "TypeScript", "Lua"],
            themeKey: "roblox" as ThemeType,
            tldrDescription:
                "I make sure we can make Roblox better without accidentally breaking something.",
            tldrBulletPointGroups: [
                {
                    category: "Feature Flags",
                    items: [
                        "I create systems to enable features and ensure they can be switched off automatically before anyone notices we've broken something.",
                    ],
                },
                {
                    category: "Release Channels",
                    items: [
                        "I let engineers test new features on unsuspecting users before unleashing them on everyone else.",
                    ],
                },
                {
                    category: "Telemetry & Incident Response",
                    items: [
                        "I make sure we know when things break, can figure out what broke, and fix it before it breaks again.",
                    ],
                },
            ],
            bulletPointGroups: [
                {
                    category:
                        "Leading development of release channel system used by hundreds of engineers to safely test & deploy features across millions of users on all platforms, improving release reliability and developer experience.",
                    items: [],
                },
                {
                    category:
                        "Enhancing feature flag & rollout system with expanded unified support across all codebases (Lua, Java, C++), automated health monitoring, and rollbacks to enable safe feature deployment at scale.",
                    items: [],
                },
                {
                    category:
                        "Mentoring engineers on various projects related to flag and channel improvements.",
                    items: [],
                },
            ],
        },
    ],
    coopExperiences: [
        {
            id: "oanda",
            title: "Software Developer",
            company: "Oanda",
            period: "Sept. 2021 - Dec. 2021",
            description:
                "Built high-performance distributed hedging systems for processing and analyzing financial trading data at scale.",
            technologies: ["C++", "Kafka", "Avro", "Distributed Systems"],
            themeKey: "oanda" as ThemeType,
            tldrDescription: "Made computers count money really fast.",
            tldrBulletPoints: [
                "Built software that handles forex trades faster than you can say 'stock market crash'",
                "Made fancy data formats to process trades so quickly your bank account doesn't know what hit it",
            ],
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
                "Enhanced telemetry systems for broadcast media infrastructure, focusing on performance optimization and cross-service communication.",
            technologies: [
                "C#",
                "C++",
                "Distributed Systems",
                "Performance Optimization",
            ],
            themeKey: "imagine" as ThemeType,
            bulletPoints: [
                "Implemented customizable configuration system that reduced manual software-defined network (SDN) setup time by over 20% and eliminated common user errors through structured validation.",
                "Developed critical interoperability layer between legacy C++ services and modern C# services, enabling seamless integration without disrupting existing workflows.",
            ],
        },
        {
            id: "escrypt",
            title: "Software Developer",
            company: "Escrypt",
            period: "Jan. 2020 - Apr. 2020",
            description:
                "Enhanced secure cloud-based access management infrastructure for enterprise vehicle fleet management system.",
            technologies: ["Java", "OAuth", "REST", "Cloud Security", "AWS"],
            themeKey: "escrypt" as ThemeType,
            bulletPoints: [
                "Architected secure API authentication using time-limited OAuth access tokens, reducing database reads by 20% and improving security posture.",
                "Identified and resolved error-based side-channel vulnerability that allowed unauthorized access to user data through brute force attacks, implementing robust request validation and error handling.",
            ],
        },
        {
            id: "thomson",
            title: "Software Developer",
            company: "Thomson Reuters",
            period: "May 2019 - Aug. 2019",
            description:
                "Developed and optimized complex tax computation APIs, streamlining financial calculations for global enterprises.",
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
                "Designed and implemented REST APIs that transformed complex financial calculations into accessible endpoints, improving customer productivity and integration efforts.",
            ],
        },
        {
            id: "hubhead",
            title: "Java Developer",
            company: "HubHead",
            period: "Sept. 2018 - Dec. 2018",
            description:
                "Designed and implemented cross-platform deployment and update infrastructure for enterprise asset management application.",
            technologies: ["Java", "Groovy", "Release Automation", "CI/CD"],
            themeKey: "hubhead" as ThemeType,
            bulletPoints: [
                "Reduced application launch times by 50% through concurrent resource validation.",
                "Developed deployment pipeline with automatic versioning on deploys.",
            ],
        },
        {
            id: "windriver",
            title: "Test Engineer",
            company: "Wind River",
            period: "Jan. 2018 - Apr. 2018",
            description:
                "Engineered Python monitoring tool while debugging C and assembly code for real-time operating system verification.",
            technologies: ["C", "Assembly", "Python", "Real-time OS"],
            themeKey: "windriver" as ThemeType,
            bulletPoints: [
                "Developed a Python-based monitoring tool to observe and log the status of running test hardware instances, streamlining the verification and monitoring process for automated tests.",
            ],
        },
    ],
    projects: [
        // TODO: Add projects
    ],
};
