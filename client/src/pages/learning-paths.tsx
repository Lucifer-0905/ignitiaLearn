import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GraduationCap,
  Clock,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import type { LearningPath, Course, UserProgress, DifficultyLevel } from "@shared/schema";

function PathSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-7 w-3/4 mb-2" />
        <Skeleton className="h-16 w-full" />
        <div className="flex gap-6 mt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export default function LearningPaths() {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  const { data: learningPaths = [], isLoading: pathsLoading, error: pathsError } = useQuery<LearningPath[]>({
    queryKey: ["/api/learning-paths"],
  });

  const { data: courses = [] } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: userProgress = [] } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress"],
  });

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      development: "bg-blue-500",
      design: "bg-purple-500",
      business: "bg-green-500",
      "data-science": "bg-orange-500",
      marketing: "bg-pink-500",
      "personal-development": "bg-teal-500",
    };
    return colors[category] || "bg-gray-500";
  };

  const getPathProgress = (courseIds: string[]) => {
    let totalProgress = 0;
    courseIds.forEach((courseId) => {
      const progress = userProgress.find((p) => p.courseId === courseId);
      if (progress) {
        totalProgress += progress.progressPercent;
      }
    });
    if (courseIds.length === 0) return 0;
    return Math.round(totalProgress / courseIds.length);
  };

  if (pathsError) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load learning paths</h2>
          <p className="text-muted-foreground mb-4">
            There was an error loading the learning paths. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Learning Paths</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Curated sequences of courses designed to take you from beginner to expert. Each path
          includes practical projects and skill assessments.
        </p>
      </div>

      {/* AI Recommendation Banner */}
      <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Get a Personalized Recommendation</h3>
                <p className="text-sm text-muted-foreground">
                  Take our skill assessment and let AI recommend the perfect learning path for
                  your goals.
                </p>
              </div>
            </div>
            <Button asChild data-testid="button-take-assessment">
              <Link href="/assessment">
                Take Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {pathsLoading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <PathSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Learning Paths Grid */}
      {!pathsLoading && (
        <div className="space-y-6">
          {learningPaths.map((path) => {
            const pathProgress = getPathProgress(path.courses);
            const isExpanded = expandedPath === path.id;
            const pathCourses = path.courses.map((id) =>
              courses.find((c) => c.id === id)
            ).filter(Boolean) as Course[];

            return (
              <Card
                key={path.id}
                className="overflow-hidden"
                data-testid={`card-path-${path.id}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <div className={`h-3 w-3 rounded-full ${getCategoryColor(path.category)}`} />
                        <Badge variant="outline" className="capitalize">
                          {path.category.replace("-", " ")}
                        </Badge>
                        <Badge
                          className={getDifficultyColor(path.difficulty)}
                          variant="secondary"
                        >
                          {path.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                      <p className="text-muted-foreground">{path.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {pathProgress > 0 && (
                        <div className="text-right">
                          <span className="text-sm font-medium text-primary">
                            {pathProgress}% Complete
                          </span>
                          <Progress value={pathProgress} className="h-2 w-32 mt-1" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {path.estimatedDuration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {path.courses.length} courses
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {path.skills.length} skills
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {path.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                    data-testid={`button-expand-${path.id}`}
                  >
                    <span>View Course Roadmap</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t">
                      {/* Roadmap Timeline */}
                      <div className="relative">
                        {pathCourses.map((course, index) => {
                          const courseProgress = userProgress.find(
                            (p) => p.courseId === course.id
                          );
                          const isCompleted = courseProgress?.progressPercent === 100;
                          const isInProgress =
                            courseProgress && courseProgress.progressPercent < 100;

                          return (
                            <div key={course.id} className="flex gap-4 pb-6 last:pb-0">
                              {/* Timeline */}
                              <div className="flex flex-col items-center">
                                <div
                                  className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
                                    isCompleted
                                      ? "bg-green-500 border-green-500 text-white"
                                      : isInProgress
                                      ? "bg-primary border-primary text-primary-foreground"
                                      : "bg-muted border-muted-foreground/20"
                                  }`}
                                >
                                  {isCompleted ? (
                                    <CheckCircle className="h-5 w-5" />
                                  ) : (
                                    <span className="font-medium">{index + 1}</span>
                                  )}
                                </div>
                                {index < pathCourses.length - 1 && (
                                  <div
                                    className={`w-0.5 flex-1 mt-2 ${
                                      isCompleted ? "bg-green-500" : "bg-muted"
                                    }`}
                                  />
                                )}
                              </div>

                              {/* Course Card */}
                              <Link
                                href={`/courses/${course.id}`}
                                className="flex-1 group"
                              >
                                <div className="rounded-lg border p-4 hover-elevate transition-all">
                                  <div className="flex items-start gap-4">
                                    <img
                                      src={course.thumbnailUrl}
                                      alt={course.title}
                                      className="w-20 h-14 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Badge
                                          variant="outline"
                                          className="capitalize text-xs"
                                        >
                                          {course.provider}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                          {course.duration}
                                        </span>
                                      </div>
                                      <h4 className="font-medium mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                        {course.title}
                                      </h4>
                                      {courseProgress && (
                                        <div className="flex items-center gap-2">
                                          <Progress
                                            value={courseProgress.progressPercent}
                                            className="h-1.5 flex-1"
                                          />
                                          <span className="text-xs text-muted-foreground">
                                            {courseProgress.progressPercent}%
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button data-testid={`button-start-path-${path.id}`}>
                          {pathProgress > 0 ? "Continue Path" : "Start Path"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
