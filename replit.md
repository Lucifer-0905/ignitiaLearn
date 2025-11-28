# Ignitia - AI-Powered Learning Platform

## Overview

Ignitia is a comprehensive learning management platform that aggregates courses from providers like Coursera and Udemy, offering AI-powered personalized learning paths, skill assessments, and progress tracking. The platform helps users master new skills through curated course recommendations, hands-on projects, and detailed analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management with built-in caching and invalidation

**UI Component System**
- Shadcn/ui component library (New York style variant) providing accessible, customizable components built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for type-safe component variants
- Custom design system inspired by Coursera, Duolingo, and Linear with focus on educational clarity and progressive disclosure

**State Management**
- Server state managed via TanStack Query with custom query client configuration
- Local UI state managed with React hooks
- Theme state persisted to localStorage with system theme detection support

**Typography & Design Tokens**
- Primary fonts: Inter and DM Sans for body text (readability focus)
- Accent font: Space Grotesk for learning path titles and statistics
- Custom CSS variables for colors, spacing, shadows, and effects
- Support for light and dark themes with HSL color system

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- Node.js runtime with ES modules enabled
- Custom middleware for request logging and JSON body parsing with raw body capture for webhook support

**API Structure**
- RESTful API endpoints organized by resource type (courses, learning paths, progress, assessments, projects, analytics)
- Endpoints follow pattern: `/api/{resource}`
- Query parameter-based filtering for courses (category, difficulty, provider, search)
- Mock data storage system for development with in-memory state

**AI Integration**
- OpenAI integration for generating personalized learning recommendations
- Lazy initialization pattern to allow app startup without API key
- AI-powered features: learning path generation, skill assessment, and course recommendations

**Development Setup**
- Vite middleware mode for HMR in development
- Custom error overlay for runtime errors
- Separate build processes for client (Vite) and server (esbuild)
- Module bundling strategy to reduce cold start times by bundling specific dependencies

### Data Storage Solutions

**Database**
- Drizzle ORM configured for PostgreSQL database interactions
- Neon Database serverless PostgreSQL as the data provider
- Schema-first approach with Zod validation integration
- Migration system configured via drizzle-kit

**Schema Design**
- **Courses**: Provider metadata (Coursera/Udemy), category, difficulty, syllabus structure, skills, pricing
- **Learning Paths**: Collections of courses organized by skill progression with estimated duration
- **User Progress**: Course enrollment tracking, completion percentages, module completion, time tracking
- **Assessments**: Question banks with correct answers and explanations for skill evaluation
- **Projects**: Hands-on practical exercises with requirements, deliverables, and resources
- **Analytics**: User learning metrics including study time, course completion rates, skill development tracking

**Current Implementation**
- Mock data storage in server memory for development
- Production schema defined but not yet connected to database
- Migration system ready for database provisioning

### External Dependencies

**Third-Party Services**
- **OpenAI API**: Powers AI-driven learning path generation and personalized recommendations
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Unsplash**: Course thumbnail images via URL-based image API

**Course Provider Integration**
- Aggregates content from Coursera and Udemy
- Stores provider metadata, instructor information, ratings, and pricing
- Currently using mock data structure prepared for real API integration

**UI Component Libraries**
- Radix UI primitives for accessible component foundations (accordion, dialog, dropdown, popover, tabs, etc.)
- Recharts for data visualization (area charts, bar charts, pie charts, line charts)
- Embla Carousel for content carousels
- Lucide React for consistent iconography

**Development Tools**
- Replit-specific plugins: runtime error modal, cartographer, dev banner
- TypeScript for type safety across full stack
- PostCSS with Tailwind and Autoprefixer for CSS processing