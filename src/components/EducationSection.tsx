'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTldr } from '@/context/TldrContext';
import { Education } from '@/data/profileData';
import Image from 'next/image';
import { useState } from 'react';

type EducationSectionProps = {
  education: Education;
};

export const EducationSection = ({ education }: EducationSectionProps) => {
  const { setTheme, colors, expandedItem, setExpandedItem } = useTheme();
  const { isTldrMode } = useTldr();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get the capstone project data directly from education
  const capstoneProject = education.capstoneProject;
  const projectImages = capstoneProject?.images || [];

  const handleEducationClick = () => {
    if (expandedItem === 'education') {
      // Collapse if already expanded
      setExpandedItem(null);
      setTheme('default');
    } else {
      // Expand and collapse any other expanded item
      setExpandedItem('education');
      setTheme(education.themeKey);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? projectImages.length - 1 : prevIndex - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === projectImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      action();
      e.preventDefault();
    }
  };

  const isExpanded = expandedItem === 'education';
  const isUWaterloo = education.university.toLowerCase().includes('waterloo');

  // Special UWaterloo Engineering style - removed border-related styles
  const waterlooPurpleStyle =
    isUWaterloo && isExpanded ? 'shadow-lg relative overflow-hidden' : '';

  // Custom heading style for education heading
  const educationHeadingStyle = isExpanded
    ? 'text-[#5D0096] border-b-2 border-[#5D0096] pb-2'
    : 'text-gray-900';

  return (
    <section
      className={`${colors.cardBg} relative mb-8 rounded-lg p-8 shadow-md transition-all duration-300`}
      aria-labelledby="education-heading"
    >
      {/* UWaterloo purple PCB pattern overlay */}
      {isUWaterloo && isExpanded && (
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <div className="h-full w-full bg-[url('/pcb-pattern.svg')] bg-repeat"></div>
        </div>
      )}

      {/* UWaterloo purple accent - removed right and bottom accents */}
      {isUWaterloo && isExpanded && (
        <div className="absolute top-0 left-0 h-2 w-full bg-[#5D0096] opacity-50"></div>
      )}

      <h2
        id="education-heading"
        className={`mb-6 text-2xl font-semibold ${
          isUWaterloo && isExpanded ? educationHeadingStyle : colors.text
        } section-header relative z-10`}
      >
        Education
      </h2>

      <div
        className={`relative z-10 cursor-pointer rounded-lg border p-4 transition-all duration-300 ${
          isExpanded
            ? `border shadow-md ${colors.background}`
            : 'border-gray-200'
        } ${
          isUWaterloo && colors.cardHoverEffect
            ? colors.cardHoverEffect
            : 'hover:shadow-md'
        } ${waterlooPurpleStyle}`}
        onClick={handleEducationClick}
        onKeyDown={(e) => e.key === 'Enter' && handleEducationClick()}
        tabIndex={0}
        aria-label={`${education.university} - ${education.degree}`}
        role="button"
      >
        {/* UWaterloo engineering PCB component label - removed */}

        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`text-lg font-medium ${
                isUWaterloo && isExpanded ? 'text-[#5D0096]' : colors.text
              } experience-title`}
            >
              {education.university}
            </h3>
            <p
              className={`${
                isUWaterloo && isExpanded ? 'text-[#A05DCB]' : colors.secondary
              }`}
            >
              {isTldrMode && education.tldrDegree
                ? education.tldrDegree
                : education.degree}{' '}
              • {education.period} •{" Distinction - Dean's Honours List"}
            </p>
          </div>
          <div
            className={`${
              isUWaterloo && isExpanded && colors.iconStyle
                ? colors.iconStyle
                : 'text-gray-500'
            }`}
          >
            {isExpanded ? (
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

        {isExpanded && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <p
              className={`text-sm ${
                isExpanded ? 'text-[#A05DCB]' : colors.secondary
              } mb-4`}
            >
              {isTldrMode && education.tldrDescription
                ? education.tldrDescription
                : education.description ||
                  'Computer engineering elective focus on systems programming and infrastructure development, with co-op experience across operating systems (Windriver), security systems (Escrypt), and trading platforms (Oanda).'}
            </p>

            {isUWaterloo && !isTldrMode && (
              <>
                <div className="relative mb-4 overflow-hidden rounded-lg border border-[#C2A8F0] bg-gray-50 p-4">
                  {/* Subtle PCB pattern in the box */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full bg-[url('/pcb-pattern.svg')] bg-repeat"></div>
                  </div>
                  <h4 className="relative z-10 mb-2 font-medium text-[#A05DCB]">
                    Notable Coursework
                  </h4>
                  <ul className="relative z-10 list-inside list-disc space-y-1 text-sm text-gray-700">
                    {education.coursework?.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </div>

                <div className="relative mb-4 overflow-hidden rounded-lg border border-[#C2A8F0] bg-gray-50 p-4">
                  {/* Subtle PCB pattern in the box */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full bg-[url('/pcb-pattern.svg')] bg-repeat"></div>
                  </div>
                  <h4 className="relative z-10 mb-2 font-medium text-[#A05DCB]">
                    Capstone Project: {capstoneProject?.name}
                  </h4>
                  <p className="relative z-10 mb-4 text-sm text-gray-700">
                    {capstoneProject?.description}
                  </p>

                  <div className="mt-3">
                    <a
                      href={capstoneProject?.links?.capstone}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 inline-flex items-center text-sm text-purple-700 transition-colors hover:text-purple-900"
                      tabIndex={0}
                      aria-label="View project on UWaterloo Engineering Capstone Design website"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        handleKeyDown(e, () => {
                          window.open(
                            capstoneProject?.links?.capstone,
                            '_blank',
                          );
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-1 h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View on UWaterloo Capstone projects page
                    </a>
                  </div>

                  {/* Image Gallery/Carousel for EyeFly */}
                  <div className="relative mt-4">
                    <div className="relative overflow-hidden rounded-lg shadow-md">
                      {/* Main image display - Increasing height from 56.25% (16:9) to 75% (4:3) */}
                      <div className="relative overflow-hidden rounded-lg bg-gray-200 pb-[75%]">
                        {/* Using actual images instead of placeholders */}
                        <Image
                          src={projectImages[currentImageIndex].src}
                          alt={
                            projectImages[currentImageIndex].alt ||
                            'Project image'
                          }
                          fill
                          className="object-contain"
                          priority={currentImageIndex === 0}
                        />
                      </div>

                      {/* Image caption */}
                      <div className="bg-opacity-50 absolute right-0 bottom-0 left-0 bg-black p-2 text-center text-sm text-white">
                        {isTldrMode &&
                        projectImages[currentImageIndex].tldrCaption
                          ? projectImages[currentImageIndex].tldrCaption
                          : projectImages[currentImageIndex].caption}
                      </div>

                      {/* Navigation arrows - adjusted positioning */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          handleKeyDown(e, handlePrevImage);
                        }}
                        className="bg-opacity-50 hover:bg-opacity-75 absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        aria-label="Previous image"
                        tabIndex={0}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          handleKeyDown(e, handleNextImage);
                        }}
                        className="bg-opacity-50 hover:bg-opacity-75 absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        aria-label="Next image"
                        tabIndex={0}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>

                    {/* Thumbnails - increased height */}
                    <div className="mt-2 flex space-x-2 overflow-x-auto pb-1">
                      {projectImages.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleThumbnailClick(index);
                          }}
                          onKeyDown={(e) => {
                            e.stopPropagation();
                            handleKeyDown(e, () => handleThumbnailClick(index));
                          }}
                          className={`h-14 w-16 flex-shrink-0 overflow-hidden rounded focus:outline-none ${
                            currentImageIndex === index
                              ? 'ring-2 ring-purple-600'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                          aria-label={`View image ${index + 1}: ${image.alt}`}
                          aria-current={
                            currentImageIndex === index ? 'true' : 'false'
                          }
                          tabIndex={0}
                        >
                          <Image
                            src={image.src}
                            alt=""
                            width={100}
                            height={75}
                            className="h-full w-full object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {capstoneProject?.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-purple-100 px-2 py-1 text-sm text-purple-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
