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
