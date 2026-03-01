'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTldr } from '@/context/TldrContext';
import { useEffect, useRef, useState } from 'react';

type Section = {
  id: string;
  label: string;
};

const allSections: Section[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'professional', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'coop', label: 'Co-op' },
  { id: 'contact', label: 'Contact' },
];

export const TimelineSidebar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { colors } = useTheme();
  const { isTldrMode } = useTldr();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Filter out the coop section if in TLDR mode
  const sections = allSections.filter(
    (section) => !isTldrMode || section.id !== 'coop',
  );

  // Track scroll position to update progress indicator continuously
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1)); // Clamp between 0 and 1
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = new Map();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          // No need to set activeSection if it's not used
          // const sectionId = entry.target.id;
          // setActiveSection(sectionId);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -75% 0px',
      threshold: [0.1, 0.5],
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Observe each section
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
        observers.set(section.id, observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isTldrMode]);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate scroll position with offset to ensure the section is fully visible
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      // Smooth scroll to the adjusted position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(sectionId);
    }
  };

  // Calculate the indicator position and height based on scroll progress
  const getIndicatorStyle = () => {
    if (!timelineRef.current) return {};

    const timelineHeight = timelineRef.current.clientHeight;

    // Calculate position based on scroll progress
    const topPosition = scrollProgress * timelineHeight;

    // Keep indicator a reasonable size
    const indicatorHeight = Math.max(40, timelineHeight / 10);

    return {
      top: `${Math.max(
        0,
        Math.min(
          topPosition - indicatorHeight / 2,
          timelineHeight - indicatorHeight,
        ),
      )}px`,
      height: `${indicatorHeight}px`,
      opacity: 1,
    };
  };

  return (
    <aside className="fixed top-1/2 left-8 z-50 hidden -translate-y-1/2 transform lg:block">
      <div className="relative h-[300px]" ref={timelineRef}>
        {/* Vertical line */}
        <div className="absolute top-0 left-2.5 h-full w-0.5 rounded-full bg-gray-300"></div>

        {/* Fluid position indicator bar */}
        <div
          className={`absolute left-0 w-5 transition-all duration-100 ease-out ${
            colors.accent.split(' ')[0]
          } rounded-full border-2 border-gray-300`}
          style={getIndicatorStyle()}
        ></div>

        <ul className="relative flex h-full flex-col justify-between">
          {sections.map((section) => (
            <li key={section.id} className="relative">
              {/* Circle indicator - always the same style */}
              <div className="absolute h-5 w-5 rounded-full border-2 border-gray-300 bg-white"></div>

              {/* Section label - no highlighting based on active section */}
              <div
                className="ml-8 cursor-pointer py-1 text-gray-600 transition-colors duration-200 hover:text-gray-900"
                onClick={() => handleClick(section.id)}
                onKeyDown={(e) => handleKeyDown(e, section.id)}
                tabIndex={0}
                aria-label={`Navigate to ${section.label} section`}
                role="button"
              >
                {section.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
