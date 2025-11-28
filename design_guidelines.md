# Ignitia Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from Coursera's professional course presentation, Duolingo's engaging progress visualization, and Linear's modern typography hierarchy. This creates an educational platform that feels both credible and motivating.

## Core Design Principles
1. **Educational Clarity**: Information hierarchy prioritizes learning outcomes and progress
2. **Progressive Disclosure**: Complex features (analytics, assessments) revealed gradually
3. **Achievement Focus**: Visual celebration of progress and milestones
4. **Accessible Learning**: Clean, distraction-free content presentation

## Typography System
- **Headings**: Inter or DM Sans (600-700 weight) for professionalism
- **Body**: Inter (400-500 weight) for excellent readability
- **Accent**: Space Grotesk for learning path titles and statistics
- **Hierarchy**: 
  - Hero: text-5xl to text-7xl
  - Section headers: text-3xl to text-4xl
  - Card titles: text-xl to text-2xl
  - Body text: text-base to text-lg

## Layout System
**Spacing Units**: Primarily use Tailwind units of 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-6, p-8
- Section spacing: py-12, py-16, py-20
- Card gaps: gap-6, gap-8
- Container max-width: max-w-7xl

## Component Library

### Navigation
- **Desktop**: Horizontal nav with logo left, primary actions (Browse Courses, Dashboard, Profile) center-right, CTA button (Start Learning) right
- **Mobile**: Hamburger menu with slide-out drawer
- Include subtle progress indicator if user is mid-course

### Hero Section (Landing/Home)
- **Layout**: Full-width with large background image (students collaborating, diverse learners in modern environment)
- **Content**: Centered overlay with blur background behind text/buttons
  - Main headline: "Master Any Skill with AI-Powered Learning Paths"
  - Subheadline: Brief value proposition
  - Two CTAs: Primary "Start Your Journey" + Secondary "Explore Courses"
  - Trust indicators below: "10,000+ Learners" "500+ Courses" "95% Completion Rate"
- **Height**: 85vh with scroll indicator

### Course Cards
- **Structure**: Image top (16:9 ratio), provider badge (Coursera/Udemy logo), title, brief description, metadata row (duration, difficulty, rating)
- **Grid**: 3 columns desktop (lg:grid-cols-3), 2 tablet (md:grid-cols-2), 1 mobile
- **Hover**: Subtle lift (scale-105) with shadow enhancement
- **Badge**: Difficulty level color-coded chip (Beginner/Intermediate/Advanced)

### Learning Path Visualization
- **Design**: Vertical timeline/roadmap showing course progression
- **Elements**: Connected nodes for each course, completion checkmarks, estimated time per stage
- **Interactive**: Click node to expand course details inline
- **Progress**: Visual fill showing completion percentage

### Dashboard Components
- **Stats Cards**: Grid of 4 metric cards (Courses in Progress, Completed, Skill Level, Study Streak)
- **Progress Charts**: Horizontal bar charts for skill development, donut chart for overall completion
- **Recent Activity**: List with course thumbnails, last accessed timestamp
- **Recommended Next**: AI-suggested courses in card carousel

### Assessment Quiz Interface
- **Layout**: Centered card (max-w-3xl) with progress bar top
- **Question Display**: Large, readable text with 4 option buttons as full-width cards
- **Feedback**: Instant visual confirmation (green check/red x) before advancing
- **Results**: Full-screen summary with skill breakdown radar chart

### Project Assignment Cards
- **Structure**: Split layout - left has project brief, right has AI-generated guidance
- **Elements**: Difficulty badge, estimated time, required skills tags, resources accordion
- **Submission**: Upload area with file preview

### Analytics Dashboard
- **Layout**: Grid system with larger chart widgets (2-column desktop)
- **Visualizations**: Line graphs for learning trends, heat maps for study patterns, comparison bars
- **Filters**: Date range selector, course filter dropdown
- **Export**: Download report button prominent top-right

## Section Layouts (Marketing Pages)

### Features Section
- 3-column grid with icon-headline-description pattern
- Icons: Use Heroicons (outline style)
- Each feature: Icon in subtle circular background, bold title, 2-3 line description

### Course Catalog Section
- Category tabs (Design, Development, Business, Data Science)
- 6-8 course cards per category in scrollable grid
- "View All" link per category

### Social Proof Section
- 3 testimonial cards with student photo, quote, name, and achievement
- Statistics row below with 4 key metrics in large numbers

### Footer
- 4-column layout: Logo/description, Quick Links, Popular Courses, Contact/Social
- Newsletter signup with inline form
- Trust badges row (secure payment, accredited, privacy certified)

## Images
- **Hero**: High-quality image of diverse students using laptops/tablets in modern learning environment (bright, collaborative)
- **Course Thumbnails**: Professional course-specific imagery (coding screens, design tools, business concepts)
- **Testimonials**: Authentic learner headshots
- **Feature Icons**: Use Heroicons library via CDN
- **Empty States**: Friendly illustrations for no courses/no progress states

## Interactions & States
- **Micro-animations**: Subtle fade-ins for cards on scroll, progress bar fills
- **Loading States**: Skeleton screens for course cards, shimmer effect
- **Empty States**: Encouraging illustrations with clear CTAs to explore courses
- **Error States**: Friendly messaging with recovery options

## Accessibility
- High contrast text-to-background ratios throughout
- Focus indicators on all interactive elements
- Screen reader labels for icon-only buttons
- Keyboard navigation support for all workflows