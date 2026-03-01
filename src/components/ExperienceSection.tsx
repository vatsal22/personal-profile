'use client';

import { themes, ThemeType, useTheme } from '@/context/ThemeContext';
import { useTldr } from '@/context/TldrContext';
import { Experience } from '@/data/profileData';
import { RobloxFeaturePanel } from './RobloxFeaturePanel';

type ExperienceSectionProps = {
  title: string;
  experiences: Experience[];
  headingId: string;
  showBulletPoints?: boolean;
  showRobloxFeature?: boolean;
  getBorderColor?: (experienceId: string) => string;
};

export const ExperienceSection = ({
  title,
  experiences,
  headingId,
  showBulletPoints = false,
  showRobloxFeature = false,
  getBorderColor,
}: ExperienceSectionProps) => {
  const { setTheme, colors, expandedItem, setExpandedItem } = useTheme();
  const { isTldrMode } = useTldr();

  const handleExperienceClick = (experienceId: string, themeKey: ThemeType) => {
    if (expandedItem === experienceId) {
      // Collapse if already expanded
      setExpandedItem(null);
      setTheme('default');
    } else {
      // Expand and collapse any other expanded item
      setExpandedItem(experienceId);
      setTheme(themeKey);
    }
  };

  const getDefaultBorderColor = (experienceId: string) => {
    return (
      themes[experienceId as ThemeType]?.borderColor ||
      themes.default.borderColor
    );
  };

  // Use provided border color function or fall back to default
  const borderColorFn = getBorderColor || getDefaultBorderColor;

  return (
    <section
      className={`${colors.cardBg} mb-8 rounded-lg p-8 shadow-md`}
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className={`text-2xl font-semibold ${colors.text} section-header mb-6`}
      >
        {title}
      </h2>

      {experiences.map((experience) => (
        <div
          key={experience.id}
          className={`mb-4 cursor-pointer rounded-lg border p-4 transition-all duration-300 ${
            expandedItem === experience.id
              ? `border-${borderColorFn(
                  experience.id,
                )}-400 shadow-md ${colors.background}`
              : 'border-gray-200'
          } ${
            colors.cardHoverEffect ? colors.cardHoverEffect : 'hover:shadow-md'
          }`}
          onClick={() =>
            handleExperienceClick(experience.id, experience.themeKey)
          }
          onKeyDown={(e) =>
            e.key === 'Enter' &&
            handleExperienceClick(experience.id, experience.themeKey)
          }
          tabIndex={0}
          aria-label={`${experience.company} - ${experience.title}`}
          role="button"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`text-lg font-medium ${colors.text} experience-title`}
              >
                {experience.company}
              </h3>
              {experience.positions ? (
                <div className={`${colors.secondary} space-y-0.5`}>
                  {experience.positions.map((position, idx) => (
                    <p key={idx}>
                      {position.title} • {position.period}
                    </p>
                  ))}
                </div>
              ) : (
                <p className={`${colors.secondary}`}>
                  {experience.title} • {experience.period}
                </p>
              )}
            </div>
            <div className="text-gray-500">
              {expandedItem === experience.id ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </div>
          </div>

          <p className={`${colors.secondary} mt-3 mb-2`}>
            {isTldrMode && experience.tldrDescription
              ? experience.tldrDescription
              : experience.description}
          </p>

          {expandedItem === experience.id && (
            <div className="relative mt-4 border-t border-gray-200 pt-4">
              {showBulletPoints && (
                <>
                  {/* Grouped bullet points (new structure) */}
                  {(isTldrMode && experience.tldrBulletPointGroups
                    ? experience.tldrBulletPointGroups
                    : experience.bulletPointGroups) && (
                    <div className="relative mb-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-4">
                      {/* Subtle pattern background */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="h-full w-full bg-gradient-to-br from-gray-200 to-transparent"></div>
                      </div>
                      <h4
                        className={`mb-3 font-medium ${colors.text} relative z-10`}
                      >
                        Responsibilities & Accomplishments
                      </h4>
                      <div className="relative z-10 space-y-3">
                        {(isTldrMode && experience.tldrBulletPointGroups
                          ? experience.tldrBulletPointGroups
                          : experience.bulletPointGroups
                        )?.map((group, groupIndex) => (
                          <div key={groupIndex}>
                            <div className="mb-1 text-sm font-medium text-gray-800">
                              • {group.category}
                            </div>
                            <ul className="ml-6 space-y-1">
                              {group.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="list-disc text-sm text-gray-700"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fallback to flat bullet points (old structure) */}
                  {!experience.bulletPointGroups &&
                    !experience.tldrBulletPointGroups &&
                    experience.bulletPoints &&
                    experience.bulletPoints.length > 0 && (
                      <div className="relative mb-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-4">
                        {/* Subtle pattern background */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-transparent"></div>
                        </div>
                        <h4
                          className={`mb-2 font-medium ${colors.text} relative z-10`}
                        >
                          Responsibilities & Accomplishments
                        </h4>
                        <ul className="relative z-10 list-inside list-disc space-y-1 text-sm text-gray-700">
                          {(isTldrMode && experience.tldrBulletPoints
                            ? experience.tldrBulletPoints
                            : experience.bulletPoints
                          ).map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </>
              )}

              <h4 className={`mb-2 font-medium ${colors.text}`}>
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${colors.accent}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Show feature flag panel button only if enabled and this is Roblox experience */}
              {showRobloxFeature && experience.id === 'roblox' && (
                <>
                  {/* Add extra padding at the bottom for the button */}
                  <div className="pb-20"></div>
                  <div
                    className="absolute right-4 bottom-4 z-20"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <RobloxFeaturePanel inline={true} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};
