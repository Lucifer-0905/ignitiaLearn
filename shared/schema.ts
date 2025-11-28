import { z } from "zod";
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Session storage table - MANDATORY for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - MANDATORY for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Course Provider Types
export type CourseProvider = "coursera" | "udemy";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type CourseCategory = "development" | "design" | "business" | "data-science" | "marketing" | "personal-development";

// Course Schema
export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  provider: z.enum(["coursera", "udemy"]),
  category: z.enum(["development", "design", "business", "data-science", "marketing", "personal-development"]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  duration: z.string(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number(),
  instructor: z.string(),
  thumbnailUrl: z.string(),
  syllabus: z.array(z.object({
    week: z.number(),
    title: z.string(),
    topics: z.array(z.string()),
    duration: z.string(),
  })),
  skills: z.array(z.string()),
  price: z.number().optional(),
});

export type Course = z.infer<typeof courseSchema>;
export type InsertCourse = Omit<Course, "id">;

// Learning Path Schema
export const learningPathSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["development", "design", "business", "data-science", "marketing", "personal-development"]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedDuration: z.string(),
  courses: z.array(z.string()),
  skills: z.array(z.string()),
});

export type LearningPath = z.infer<typeof learningPathSchema>;

// User Progress Schema
export const userProgressSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  completedModules: z.array(z.number()),
  progressPercent: z.number().min(0).max(100),
  startedAt: z.string(),
  lastAccessedAt: z.string(),
  timeSpentMinutes: z.number(),
});

export type UserProgress = z.infer<typeof userProgressSchema>;

// Assessment Schema
export const assessmentQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  category: z.enum(["development", "design", "business", "data-science", "marketing", "personal-development"]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
});

export type AssessmentQuestion = z.infer<typeof assessmentQuestionSchema>;

export const assessmentResultSchema = z.object({
  id: z.string(),
  answers: z.array(z.object({
    questionId: z.string(),
    selectedAnswer: z.number(),
    isCorrect: z.boolean(),
  })),
  categoryScores: z.record(z.number()),
  overallScore: z.number(),
  recommendedPath: z.string().optional(),
  completedAt: z.string(),
});

export type AssessmentResult = z.infer<typeof assessmentResultSchema>;

// Project Schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedTime: z.string(),
  skills: z.array(z.string()),
  requirements: z.array(z.string()),
  learningOutcomes: z.array(z.string()),
  courseId: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;

// Analytics Schema
export const analyticsSchema = z.object({
  totalCoursesStarted: z.number(),
  totalCoursesCompleted: z.number(),
  totalTimeSpentMinutes: z.number(),
  averageProgress: z.number(),
  skillsAcquired: z.array(z.string()),
  weeklyActivity: z.array(z.object({
    day: z.string(),
    minutes: z.number(),
  })),
  categoryDistribution: z.record(z.number()),
  streakDays: z.number(),
});

export type Analytics = z.infer<typeof analyticsSchema>;

// User preferences for learning
export const userPreferencesSchema = z.object({
  id: z.string(),
  learningGoals: z.array(z.string()),
  preferredCategories: z.array(z.string()),
  weeklyTimeCommitment: z.number(),
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
});

export type UserPreferences = z.infer<typeof userPreferencesSchema>;
