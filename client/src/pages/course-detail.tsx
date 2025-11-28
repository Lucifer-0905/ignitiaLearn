import { useRoute, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Star,
  Clock,
  Users,
  CheckCircle,
  Play,
  ArrowLeft,
  BookOpen,
  Award,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Course, UserProgress, DifficultyLevel } from "@shared/schema";

export default function CourseDetail() {
  const [, params] = useRoute("/courses/:id");
  const courseId = params?.id;
  const { toast } = useToast();

  const { data: course, isLoading: courseLoading, error: courseError } = useQuery<Course>({
    queryKey: ["/api/courses", courseId],
    enabled: !!courseId,
  });

  const { data: userProgress } = useQuery<UserProgress | null>({
    queryKey: ["/api/progress", courseId],
    enabled: !!courseId,
  });

  const startCourseMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", `/api/progress/${courseId}`, {
        progressPercent: 0,
        completedModules: [],
        timeSpentMinutes: 0,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", courseId] });
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      toast({
        title: "Course started!",
        description: "You've started this course. Good luck on your learning journey!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start course. Please try again.",
        variant: "destructive",
      });
    },
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

  if (courseLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Skeleton className="h-10 w-40 mb-6" />
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Skeleton className="aspect-video rounded-lg mb-6" />
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-10 w-full mb-4" />
                <div className="space-y-4 mt-6 pt-6 border-t">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <p className="text-muted-foreground mb-6">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6" data-testid="button-back">
        <Link href="/courses">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>
      </Button>

      {/* Hero Section */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-lg overflow-hidden mb-6">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge variant="secondary" className="capitalize">
              {course.provider}
            </Badge>
            <Badge className={getDifficultyColor(course.difficulty)} variant="secondary">
              {course.difficulty}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {course.category.replace("-", " ")}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold mb-4" data-testid="text-course-title">
            {course.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

          <div className="flex items-center gap-6 mb-6 flex-wrap text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-muted-foreground">
                ({(course.reviewCount / 1000).toFixed(0)}k reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              {(course.reviewCount * 1.5).toLocaleString()} students
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              {course.instructor.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{course.instructor}</p>
              <p className="text-sm text-muted-foreground">Instructor</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              {userProgress ? (
                <>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Your Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {userProgress.progressPercent}%
                      </span>
                    </div>
                    <Progress value={userProgress.progressPercent} className="h-2" />
                  </div>
                  <Button className="w-full mb-3" data-testid="button-continue-learning">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Last accessed:{" "}
                    {new Date(userProgress.lastAccessedAt).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <>
                  {course.price && (
                    <div className="text-3xl font-bold mb-4">${course.price}</div>
                  )}
                  <Button
                    className="w-full mb-3"
                    onClick={() => startCourseMutation.mutate()}
                    disabled={startCourseMutation.isPending}
                    data-testid="button-start-course"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {startCourseMutation.isPending ? "Starting..." : "Start Course"}
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-add-path">
                    Add to Learning Path
                  </Button>
                </>
              )}

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Modules</p>
                    <p className="text-sm text-muted-foreground">
                      {course.syllabus.length} weeks
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Certificate</p>
                    <p className="text-sm text-muted-foreground">Upon completion</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Access</p>
                    <p className="text-sm text-muted-foreground">Lifetime access</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Skills */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Skills You'll Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1.5">
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Syllabus */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Course Syllabus</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {course.syllabus.map((week) => (
              <AccordionItem key={week.week} value={`week-${week.week}`}>
                <AccordionTrigger
                  className="hover:no-underline"
                  data-testid={`accordion-week-${week.week}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        userProgress && userProgress.completedModules.includes(week.week)
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {userProgress && userProgress.completedModules.includes(week.week) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        week.week
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{week.title}</p>
                      <p className="text-sm text-muted-foreground">{week.duration}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-12 space-y-2">
                    {week.topics.map((topic, topicIndex) => (
                      <li
                        key={topicIndex}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Related Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Practical Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Build a Real-World Project</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Apply your skills by completing a hands-on project. Get AI-powered guidance
                  and feedback as you build something portfolio-worthy.
                </p>
                <Button variant="outline" asChild data-testid="button-view-project">
                  <Link href="/projects">View Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
