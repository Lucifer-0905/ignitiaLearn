# 🚀 Ignitia – AI-Powered Personalized Learning Platform

Ignitia is an advanced AI-driven learning platform that creates **personalized learning paths** by integrating content from Coursera, Udemy, and hands-on practical projects.  
It is designed for learners of all ages and institutions that want powerful analytics for decision-making.

---

## 📌 Key Features

### 🔹 **AI-Powered Recommendations**
- Generates personalized learning paths using OpenAI models  
- Suggests courses, skill tracks, and projects  
- Tailors content based on user performance and goals  

### 🔹 **Unified Learning Dashboard**
- Aggregates courses from Coursera, Udemy, and custom providers  
- Displays progress, enrolled courses, skills earned, and assessments  

### 🔹 **Hands-On Practical Projects**
- Real-world projects mapped to each learning path  
- Students gain portfolio-ready experience  

### 🔹 **Analytics for Institutions**
- Student progress, completion rates, skill analytics  
- Helps colleges/trainers make data-driven decisions  

---

# 🏗️ System Architecture

Ignitia follows a **full-stack modern architecture** with React (frontend) + Express (backend) + PostgreSQL (Neon DB) + OpenAI.

---

## 🎨 **Frontend (React + Vite)**

### ✔ Tech Stack
- **React + TypeScript**
- **Vite** (fast build system)
- **Wouter** (lightweight React router)
- **React Query** (server state management)
- **Tailwind CSS** + **Shadcn UI**
- **Class Variance Authority (CVA)** for reusable UI components
- **Lucide Icons** + **Recharts** for charts

### ✔ Highlights
- Fully responsive UI  
- Light/Dark theme support  
- Clean, modern, education-focused design  
- Component-based architecture inspired by Coursera / Duolingo  
- Drag-and-drop learning paths and course cards  

---

## ⚙️ **Backend (Node.js + Express)**

### ✔ API Features
- RESTful APIs for:
  - Courses  
  - Learning paths  
  - Assessments  
  - Projects  
  - User progress  
  - Analytics  

### ✔ Middleware  
- Logging middleware  
- JSON parser with raw-body support  
- Error handling  
- Rate limiting (optional)

### ✔ AI Integration  
OpenAI API powers:
- Personalized learning paths  
- Course suggestions  
- Skill analysis  
- Automated assessments  

---

## 🗄️ **Database Layer (PostgreSQL + Drizzle ORM)**

### ✔ Database Provider
- **Neon Serverless PostgreSQL** (fast + scalable)

### ✔ ORM
- **Drizzle ORM** with schema-first migrations  
- Integrated with **Zod validation**  

### ✔ Schema Includes:
- Courses  
- Providers (Coursera/Udemy)  
- Learning paths  
- User progress  
- Assessments  
- Projects  
- Analytics  

During development, the backend uses **mock in-memory data** but is fully prepared for production database.

---

## 🔌 External Integrations

- **OpenAI API** – AI learning generation  
- **Neon DB** – scalable relational DB  
- **Unsplash** – dynamic course thumbnails  
- **Udemy/Coursera metadata** – standardized provider structure  

---

# 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Lucifer-0905/IgnitiaLearn.git
cd IgnitiaLearn

Here's how to run the Ignitia project after downloading all files:

Prerequisites
Node.js (v16 or higher) - Download
npm (comes with Node.js)
Step-by-Step Setup
1. Install Dependencies
npm install

This installs all packages listed in package.json (Express, React, Tailwind, Gemini SDK, etc.)

2. Set Up Environment Variables
Create a .env or .env.local file in the project root:

GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
PORT=5000

How to get your Gemini API Key:

Go to Google AI Studio
Click "Create API Key"
Copy and paste it into your .env file
3. Run the Project
npm run dev

This command:

Starts the Express backend on port 5000
Starts the Vite frontend dev server on the same port
Enables hot reload (changes auto-refresh)
4. Open in Browser
http://localhost:5000

You should see:

Landing page with "Sign In" and "Create Account" buttons
Click "Create Account" to sign up
After login, you'll see the sidebar with navigation to all features
Project Structure
ignitia/
├── server/              # Backend (Express)
│   ├── index.ts        # Server entry point
│   ├── routes.ts       # All API endpoints
│   └── storage.ts      # Data management
├── client/              # Frontend (React)
│   └── src/
│       ├── App.tsx     # Main app & routing
│       ├── pages/      # All page components
│       └── components/ # UI components
├── shared/              # Shared types
│   └── schema.ts       # Data models
├── package.json         # Dependencies & scripts
├── vite.config.ts      # Build config
└── tsconfig.json       # TypeScript config

Available Scripts
npm run dev      # Start development server (frontend + backend)
npm run build    # Build for production
npm run preview  # Preview production build

Features to Try After Login
Dashboard - See your progress overview
Courses - Browse and filter courses from Coursera/Udemy
Learning Paths - Get AI-powered personalized learning recommendations (uses Gemini)
Skill Assessment - Take an AI-generated skills quiz (uses Gemini)
Projects - Get AI-suggested portfolio projects (uses Gemini)
Analytics - Track your learning progress
Troubleshooting
Issue	Solution
Port 5000 already in use	Kill the process: lsof -i :5000 then kill -9 <PID>
npm install fails	Delete node_modules and package-lock.json, then retry
Gemini API not working	Check if GEMINI_API_KEY is set in .env file
Page not loading	Check browser console (F12) and terminal for errors
That's it! You're ready to run Ignitia locally. 🚀


📱 Ignitia Sidebar - Complete Feature Guide
Here's how each feature in your sidebar works:

NAVIGATION SECTION
1. 🏠 Home
URL: /
What it does:

Welcome/overview page after you log in
Shows featured courses curated for you
Displays platform statistics (10,000+ Active Learners, 500+ Courses, 95% Completion Rate)
Lists key features of Ignitia:
AI-Powered Learning Paths
Premium Course Content
Hands-On Projects
Progress Analytics
Shows testimonials from other learners
Backend API Used:

/api/courses - Fetches featured courses to display
2. 📚 Courses
URL: /courses
What it does:

Browse all available courses from Coursera and Udemy
Filter courses by:
Category: Development, Design, Business, Data Science, Marketing, Personal Development
Difficulty: Beginner, Intermediate, Advanced
Provider: Coursera or Udemy
Search courses by title or keywords
View course details: instructor, duration, skills taught, rating
Click on course to see full details (course-detail.tsx)
Backend API Used:

GET /api/courses - Fetches all courses
GET /api/courses/:id - Fetches individual course details
Example API Query:

/api/courses?category=development&difficulty=beginner&provider=coursera&search=python

3. 🎓 Learning Paths
URL: /learning-paths
What it does:

View predefined learning paths (Full-Stack Developer, Data Scientist, etc.)

Each path shows:

Path name and description
Duration estimate (e.g., "6 months")
Skills you'll learn (HTML, CSS, JavaScript, React, etc.)
Courses included in the path
Your progress on each path
Expandable sections to see which courses are in each path

Start learning a path with one click

Backend API Used:

GET /api/learning-paths - Fetches all available learning paths
GET /api/progress - Tracks your progress on each path
4. 📊 Dashboard
URL: /dashboard
What it does:

Your personal learning hub with at-a-glance stats:

Total hours learned (e.g., "45 hours")
Courses in progress count
Current streak (e.g., "7 days")
Completion rate (percentage)
Charts and visualizations:

Line chart: Learning progress over time (hours per week)
Pie chart: Distribution of learning by category (Development: 40%, Design: 30%, etc.)
Area chart: Cumulative learning hours trend
Courses in progress section showing:

Which courses you're currently taking
Progress bar for each course
Time spent on each
Backend API Used:

GET /api/analytics - Gets your stats (hours, streak, completion rate)
GET /api/progress - Gets all your course progress
GET /api/courses - Gets course details for your progress
5. 🚀 Projects
URL: /projects
What it does:

View AI-generated project ideas tailored to your skill level

Each project includes:

Project title (e.g., "Build a Real-Time Chat Application")
Description of what you'll build
Difficulty level (Beginner, Intermediate, Advanced)
Estimated time to complete
Required skills (which skills you'll practice)
Project requirements (what you need to deliver)
Learning outcomes (what you'll learn)
Filter by difficulty: Beginner, Intermediate, Advanced

Generate new project ideas using AI:

Click "Generate Project" button
AI (Gemini) creates a unique portfolio-worthy project
Based on your skills and selected difficulty
Backend API Used:

GET /api/projects - Fetches available projects
POST /api/ai/generate-project - Uses Gemini AI to create personalized projects
How Gemini AI Works Here:

Input: Your skills (HTML, CSS, JavaScript) + Difficulty (Intermediate)
↓
Gemini generates → Unique project idea with full specifications
↓
Output: Project title, requirements, learning outcomes

6. 📈 Analytics
URL: /analytics
What it does:

Detailed learning analytics and insights:

Total learning hours this week/month
Average hours per day
Most studied category
Fastest growing skill
Days active (streak)
Visual analytics:

Learning trend line chart: Track your learning hours over time
Category breakdown pie chart: What % of time you spend on each category
Skill progress bars: See your improvement in each skill
Weekly activity chart: Which days you studied most
Download reports (export your progress)

Time range selector: View data for last 7 days, 30 days, etc.

Backend API Used:

GET /api/analytics - Gets all your analytics data
GET /api/progress - Gets detailed progress on each course
QUICK ACTIONS SECTION
⭐ Skill Assessment
URL: /assessment
What it does:

AI-powered skill evaluation quiz to test your current knowledge

How it works:

Click "Start Assessment"
Answer multiple-choice questions (10-15 questions)
Get instant feedback (correct/incorrect with explanation)
See your score and skill level (Beginner/Intermediate/Advanced)
Get AI recommendations - Gemini generates a learning path based on your results
Questions cover various topics and difficulty levels

Backend API Used:

GET /api/assessment - Fetches assessment questions
POST /api/ai/recommend-path - Uses Gemini AI to create personalized learning path based on assessment results
How Gemini AI Works Here:

Your Assessment Results
  ↓
Gemini analyzes: Your weak areas + strong areas + current skills
  ↓
Generates → Personalized learning path recommendation
  ↓
Shows: "Based on your assessment, here's your custom learning path..."

