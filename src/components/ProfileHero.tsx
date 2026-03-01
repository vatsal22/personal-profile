'use client';

import { ThemeType, useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

type ProfileHeroProps = {
  name: string;
  title: string;
  themeTitles: Record<ThemeType, string>;
  avatar: string;
  location: string;
};

export const ProfileHero = ({
  name,
  title,
  themeTitles,
  avatar,
  location,
}: ProfileHeroProps) => {
  const { colors, currentTheme } = useTheme();

  // Get the title based on the current theme
  const displayTitle = themeTitles[currentTheme] || title;

  return (
    <div className="mb-16 text-center">
      <div className="relative mx-auto mb-8 h-50 w-50">
        <Image
          src={avatar}
          alt={name}
          fill
          className="rounded-full object-cover shadow-lg"
          priority
        />
      </div>
      <h1 className={`text-4xl font-bold ${colors.text} section-header mb-2`}>
        {name}
      </h1>
      <p className={`text-xl ${colors.secondary} mb-4`}>{displayTitle}</p>
      <p
        className={`${colors.secondary} flex items-center justify-center gap-2`}
      >
        <svg
          className="h-5 w-5"
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
        {location}
      </p>
    </div>
  );
};
