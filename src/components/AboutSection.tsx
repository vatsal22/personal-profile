type AboutSectionProps = {
    bio: string;
};

export const AboutSection = ({ bio }: AboutSectionProps) => {
    return (
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
            <p className="text-gray-600 leading-relaxed">{bio}</p>
        </section>
    );
};
