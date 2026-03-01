'use client';

import { useTheme } from '@/context/ThemeContext';

type AboutSectionProps = {
  bio: string;
};

export const AboutSection = ({ bio }: AboutSectionProps) => {
  const { colors } = useTheme();

  return (
    <section
      className={`${colors.cardBg} mb-8 rounded-lg p-8 shadow-md`}
      aria-labelledby="about-heading"
    >
      <h2
        id="about-heading"
        className={`text-2xl font-semibold ${colors.text} section-header mb-4`}
      >
        About Me
      </h2>
      <p className={`${colors.secondary} leading-relaxed whitespace-pre-line`}>
        {bio}
      </p>
    </section>
  );
};
