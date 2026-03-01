# CLAUDE.md

This file provides guidance for Claude Code when working with this repository.

## Project Overview

Personal portfolio website for Vatsal Solanki built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.

## Commands

- `npm run start:dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Directory Structure

```
src/
├── app/           # Next.js App Router (layout.tsx, page.tsx, globals.css)
├── components/    # React components (*Section.tsx, *Toggle.tsx, *Panel.tsx)
├── context/       # React Context providers (ThemeContext, TldrContext)
└── data/          # Content data (profileData.ts - single source of truth)
```

### Key Patterns

- **Client Components**: All interactive components use `"use client"` directive
- **Theme System**: 9 employer-themed color schemes managed via ThemeContext
- **TLDR Mode**: Abbreviated view toggle via TldrContext
- **Path Aliases**: Use `@/*` for imports from `src/`

## Code Style

- Use Tailwind classes exclusively for styling (no CSS modules)
- Use `const` arrow functions over function declarations
- Prefix event handlers with `handle` (e.g., `handleClick`, `handleKeyDown`)
- Use early returns for readability
- Include accessibility attributes on interactive elements (tabindex, aria-label, keyboard handlers)
- Use descriptive variable and function names

## Content Updates

All profile content lives in `src/data/profileData.ts`. Edit this file to update:

- Professional/co-op experiences
- Skills
- Education
- Bio and contact info

Each experience has a `themeKey` that triggers theme switching and both regular and `tldr*` properties for abbreviated mode.
