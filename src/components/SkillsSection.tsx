type SkillsSectionProps = {
    skills: string[];
};

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
    return (
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
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
};
