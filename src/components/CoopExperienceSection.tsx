'use client';

import { themes, ThemeType } from '@/context/ThemeContext';
import { Experience } from '@/data/profileData';
import { ExperienceSection } from './ExperienceSection';

type CoopExperienceSectionProps = {
  experiences: Experience[];
};

export const CoopExperienceSection = ({
  experiences,
}: CoopExperienceSectionProps) => {
  // Custom border color function for co-op experiences
  const getCoopBorderColor = (experienceId: string): string => {
    return themes[experienceId as ThemeType]?.borderColor || 'blue';
  };

  return (
    <ExperienceSection
      title="Co-op Experience"
      experiences={experiences}
      headingId="coop-experience-heading"
      getBorderColor={getCoopBorderColor}
      showBulletPoints={true}
    />
  );
};
