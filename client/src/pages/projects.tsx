import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FolderKanban,
  Clock,
  CheckCircle,
  BookOpen,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Target,
  FileCode,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Project, Course, DifficultyLevel } from "@shared/schema";

function ProjectSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export default function Projects() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "all">("all");
  const { toast } = useToast();

  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: courses = [] } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const generateProjectMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/ai/generate-project", {
        skills: ["HTML", "CSS", "JavaScript"],
        difficulty: selectedDifficulty === "all" ? "intermediate" : selectedDifficulty,
        category: "development",
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Project Generated!",
        description: `New project idea: ${data.project?.title || "Generated successfully"}`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredProjects =
    selectedDifficulty === "all"
      ? projects
      : projects.filter((p) => p.difficulty === selectedDifficulty);

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

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load projects</h2>
          <p className="text-muted-foreground mb-4">
            There was an error loading the projects. Please try again.
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
          <FolderKanban className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Practical Projects</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Apply your learning with hands-on projects. Build real-world applications and add them
          to your portfolio.
        </p>
      </div>

      {/* AI Project Suggestion Banner */}
      <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI Project Generator</h3>
                <p className="text-sm text-muted-foreground">
                  Get a custom project idea tailored to your current skill level and learning
                  goals. Our AI will create unique challenges just for you.
                </p>
              </div>
            </div>
            <Button
              onClick={() => generateProjectMutation.mutate()}
              disabled={generateProjectMutation.isPending}
              data-testid="button-generate-project"
            >
              {generateProjectMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Project
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm text-muted-foreground">Filter by difficulty:</span>
        <Select
          value={selectedDifficulty}
          onValueChange={(v) => setSelectedDifficulty(v as DifficultyLevel | "all")}
        >
          <SelectTrigger className="w-[150px]" data-testid="select-difficulty">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const relatedCourse = project.courseId
              ? courses.find((c) => c.id === project.courseId)
              : null;

            return (
              <Card
                key={project.id}
                className="overflow-hidden"
                data-testid={`card-project-${project.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge
                          className={getDifficultyColor(project.difficulty)}
                          variant="secondary"
                        >
                          {project.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {project.estimatedTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileCode className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      Skills Required
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      Requirements
                    </h4>
                    <ul className="space-y-1.5">
                      {project.requirements.slice(0, 3).map((req, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                      {project.requirements.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          +{project.requirements.length - 3} more requirements
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Learning Outcomes */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                      <Lightbulb className="h-4 w-4 text-muted-foreground" />
                      What You'll Learn
                    </h4>
                    <ul className="space-y-1.5">
                      {project.learningOutcomes.slice(0, 2).map((outcome, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Course */}
                  {relatedCourse && (
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        Related Course
                      </h4>
                      <Link href={`/courses/${relatedCourse.id}`}>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                          <img
                            src={relatedCourse.thumbnailUrl}
                            alt={relatedCourse.title}
                            className="w-14 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">
                              {relatedCourse.title}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {relatedCourse.provider}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex gap-3">
                    <Button className="flex-1" data-testid={`button-start-project-${project.id}`}>
                      Start Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" data-testid={`button-ai-guidance-${project.id}`}>
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {!isLoading && filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <FolderKanban className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="font-semibold mb-2">No projects found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your filter or check back later for new projects
          </p>
          <Button variant="outline" onClick={() => setSelectedDifficulty("all")}>
            Show All Projects
          </Button>
        </div>
      )}
    </div>
  );
}
