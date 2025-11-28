import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenAI } from "@google/genai";
import { setupAuth, isAuthenticated } from "./replitAuth";

// Gemini AI integration - DON'T DELETE THIS COMMENT
// Note that the newest Gemini model series is "gemini-2.5-flash"
// Lazy initialization to allow app to start without API key
let gemini: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!gemini) {
    gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return gemini;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth middleware setup
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Courses API
  app.get("/api/courses", async (req, res) => {
    try {
      const { category, search, difficulty, provider } = req.query;

      let courses = await storage.getCourses();

      if (category && category !== "all") {
        courses = courses.filter((c) => c.category === category);
      }

      if (difficulty && difficulty !== "all") {
        courses = courses.filter((c) => c.difficulty === difficulty);
      }

      if (provider && provider !== "all") {
        courses = courses.filter((c) => c.provider === provider);
      }

      if (search && typeof search === "string") {
        const lowerSearch = search.toLowerCase();
        courses = courses.filter(
          (c) =>
            c.title.toLowerCase().includes(lowerSearch) ||
            c.description.toLowerCase().includes(lowerSearch) ||
            c.skills.some((s) => s.toLowerCase().includes(lowerSearch))
        );
      }

      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ error: "Failed to fetch course" });
    }
  });

  // Learning Paths API
  app.get("/api/learning-paths", async (req, res) => {
    try {
      const paths = await storage.getLearningPaths();
      res.json(paths);
    } catch (error) {
      console.error("Error fetching learning paths:", error);
      res.status(500).json({ error: "Failed to fetch learning paths" });
    }
  });

  app.get("/api/learning-paths/:id", async (req, res) => {
    try {
      const path = await storage.getLearningPath(req.params.id);
      if (!path) {
        return res.status(404).json({ error: "Learning path not found" });
      }
      res.json(path);
    } catch (error) {
      console.error("Error fetching learning path:", error);
      res.status(500).json({ error: "Failed to fetch learning path" });
    }
  });

  // Assessment API
  app.get("/api/assessment/questions", async (req, res) => {
    try {
      const questions = await storage.getAssessmentQuestions();
      res.json(questions);
    } catch (error) {
      console.error("Error fetching assessment questions:", error);
      res.status(500).json({ error: "Failed to fetch assessment questions" });
    }
  });

  app.post("/api/assessment/results", async (req, res) => {
    try {
      const result = await storage.saveAssessmentResult(req.body);
      res.json(result);
    } catch (error) {
      console.error("Error saving assessment result:", error);
      res.status(500).json({ error: "Failed to save assessment result" });
    }
  });

  app.get("/api/assessment/results", async (req, res) => {
    try {
      const results = await storage.getAssessmentResults();
      res.json(results);
    } catch (error) {
      console.error("Error fetching assessment results:", error);
      res.status(500).json({ error: "Failed to fetch assessment results" });
    }
  });

  // User Progress API
  app.get("/api/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress();
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.get("/api/progress/:courseId", async (req, res) => {
    try {
      const progress = await storage.getCourseProgress(req.params.courseId);
      if (!progress) {
        return res.json(null);
      }
      res.json(progress);
    } catch (error) {
      console.error("Error fetching course progress:", error);
      res.status(500).json({ error: "Failed to fetch course progress" });
    }
  });

  app.post("/api/progress/:courseId", async (req, res) => {
    try {
      const progress = await storage.updateProgress(req.params.courseId, req.body);
      res.json(progress);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  // Projects API
  app.get("/api/projects", async (req, res) => {
    try {
      const { difficulty } = req.query;
      let projects = await storage.getProjects();

      if (difficulty && difficulty !== "all") {
        projects = projects.filter((p) => p.difficulty === difficulty);
      }

      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Analytics API
  app.get("/api/analytics", async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // User Preferences API
  app.get("/api/preferences", async (req, res) => {
    try {
      const preferences = await storage.getUserPreferences();
      res.json(preferences || null);
    } catch (error) {
      console.error("Error fetching preferences:", error);
      res.status(500).json({ error: "Failed to fetch preferences" });
    }
  });

  app.post("/api/preferences", async (req, res) => {
    try {
      const preferences = await storage.saveUserPreferences(req.body);
      res.json(preferences);
    } catch (error) {
      console.error("Error saving preferences:", error);
      res.status(500).json({ error: "Failed to save preferences" });
    }
  });

  // AI-Powered Learning Path Generation
  app.post("/api/ai/generate-learning-path", async (req, res) => {
    try {
      const { goals, currentSkills, preferredCategories, timeCommitment } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        // Return a fallback recommendation if no API key
        const paths = await storage.getLearningPaths();
        const recommendedPath = paths[0];
        return res.json({
          recommendation: {
            title: recommendedPath?.title || "Full-Stack Web Developer",
            description: "Based on your goals, we recommend starting with web development fundamentals.",
            estimatedDuration: "6 months",
            courses: recommendedPath?.courses || ["1", "7"],
            skills: recommendedPath?.skills || ["HTML", "CSS", "JavaScript", "React"],
            reasoning: "This path covers essential skills for modern web development and provides a strong foundation for your learning journey."
          }
        });
      }

      const prompt = `Based on the following learner profile, recommend a personalized learning path:

Goals: ${goals?.join(", ") || "Learn new skills"}
Current Skills: ${currentSkills?.join(", ") || "Beginner"}
Preferred Categories: ${preferredCategories?.join(", ") || "Any"}
Weekly Time Commitment: ${timeCommitment || 10} hours

Respond with ONLY valid JSON in this format (no markdown, no code blocks):
{
  "title": "Learning Path Title",
  "description": "Brief description of the path",
  "estimatedDuration": "X months",
  "recommendedSkills": ["skill1", "skill2"],
  "reasoning": "Why this path is recommended"
}`;

      const client = getGemini();
      if (!client) {
        const paths = await storage.getLearningPaths();
        const recommendedPath = paths[0];
        return res.json({
          recommendation: {
            title: recommendedPath?.title || "Full-Stack Web Developer",
            description: "Based on your goals, we recommend starting with web development fundamentals.",
            estimatedDuration: "6 months",
            courses: recommendedPath?.courses || ["1", "7"],
            skills: recommendedPath?.skills || ["HTML", "CSS", "JavaScript", "React"],
            reasoning: "This path covers essential skills for modern web development."
          }
        });
      }

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const recommendation = JSON.parse(response.text || "{}");

      res.json({ recommendation });
    } catch (error) {
      console.error("Error generating learning path:", error);
      // Fallback response
      const paths = await storage.getLearningPaths();
      const recommendedPath = paths[0];
      res.json({
        recommendation: {
          title: recommendedPath?.title || "Full-Stack Web Developer",
          description: "A comprehensive path to build modern web applications.",
          estimatedDuration: "6 months",
          courses: recommendedPath?.courses || ["1"],
          skills: recommendedPath?.skills || ["HTML", "CSS", "JavaScript"],
          reasoning: "This path is recommended based on popular learning goals."
        }
      });
    }
  });

  // AI-Powered Project Idea Generation
  app.post("/api/ai/generate-project", async (req, res) => {
    try {
      const { skills, difficulty, category } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        // Return a fallback project if no API key
        return res.json({
          project: {
            title: "Interactive Web Dashboard",
            description: "Build a responsive dashboard displaying dynamic data with charts and user interactions.",
            difficulty: difficulty || "intermediate",
            estimatedTime: "20 hours",
            skills: skills || ["HTML", "CSS", "JavaScript"],
            requirements: [
              "Responsive layout design",
              "Data visualization with charts",
              "User authentication flow",
              "API integration"
            ],
            learningOutcomes: [
              "Master responsive design techniques",
              "Implement data visualization",
              "Handle user state and authentication",
              "Work with REST APIs"
            ]
          }
        });
      }

      const prompt = `Generate a practical project idea for a learner with the following profile:

Skills: ${skills?.join(", ") || "Web development basics"}
Desired Difficulty: ${difficulty || "intermediate"}
Category: ${category || "development"}

Create a unique, portfolio-worthy project. Respond with ONLY valid JSON (no markdown, no code blocks):
{
  "title": "Project Title",
  "description": "Project description",
  "difficulty": "${difficulty || 'intermediate'}",
  "estimatedTime": "X hours",
  "skills": ["required", "skills"],
  "requirements": ["requirement 1", "requirement 2"],
  "learningOutcomes": ["outcome 1", "outcome 2"]
}`;

      const client = getGemini();
      if (!client) {
        return res.json({
          project: {
            title: "Interactive Web Dashboard",
            description: "Build a responsive dashboard displaying dynamic data with charts and user interactions.",
            difficulty: difficulty || "intermediate",
            estimatedTime: "20 hours",
            skills: skills || ["HTML", "CSS", "JavaScript"],
            requirements: [
              "Responsive layout design",
              "Data visualization with charts",
              "User authentication flow",
              "API integration"
            ],
            learningOutcomes: [
              "Master responsive design techniques",
              "Implement data visualization",
              "Handle user state and authentication",
              "Work with REST APIs"
            ]
          }
        });
      }

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const project = JSON.parse(response.text || "{}");

      res.json({ project });
    } catch (error) {
      console.error("Error generating project:", error);
      // Fallback response
      res.json({
        project: {
          title: "Personal Task Manager",
          description: "Build a task management application with categories, priorities, and due dates.",
          difficulty: req.body.difficulty || "intermediate",
          estimatedTime: "15 hours",
          skills: req.body.skills || ["JavaScript", "React"],
          requirements: [
            "Task CRUD operations",
            "Category organization",
            "Priority levels",
            "Due date tracking"
          ],
          learningOutcomes: [
            "State management",
            "Form handling",
            "Local storage persistence",
            "UI component design"
          ]
        }
      });
    }
  });

  return httpServer;
}
