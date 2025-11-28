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
