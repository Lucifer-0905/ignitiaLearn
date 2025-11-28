import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Clock, Filter, AlertCircle } from "lucide-react";
import type { Course, CourseCategory, DifficultyLevel, CourseProvider } from "@shared/schema";

const categories: { value: CourseCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "data-science", label: "Data Science" },
  { value: "marketing", label: "Marketing" },
  { value: "personal-development", label: "Personal Development" },
];

const difficulties: { value: DifficultyLevel | "all"; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const providers: { value: CourseProvider | "all"; label: string }[] = [
  { value: "all", label: "All Providers" },
  { value: "coursera", label: "Coursera" },
  { value: "udemy", label: "Udemy" },
];

function CourseSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-5">
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <div className="flex gap-1 mb-3">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-12" />
        </div>
        <div className="flex justify-between pt-3 border-t">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "all">("all");
  const [selectedProvider, setSelectedProvider] = useState<CourseProvider | "all">("all");

  const { data: courses = [], isLoading, error } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
      const matchesProvider =
        selectedProvider === "all" || course.provider === selectedProvider;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesProvider;
    });
  }, [courses, searchQuery, selectedCategory, selectedDifficulty, selectedProvider]);

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
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load courses</h2>
          <p className="text-muted-foreground mb-4">
            There was an error loading the course catalog. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Course Catalog</h1>
        <p className="text-muted-foreground">
          Explore our curated collection of courses from top platforms
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, skills, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-courses"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as CourseCategory | "all")}
          >
            <SelectTrigger className="w-[180px]" data-testid="select-category">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedDifficulty}
            onValueChange={(value) => setSelectedDifficulty(value as DifficultyLevel | "all")}
          >
            <SelectTrigger className="w-[180px]" data-testid="select-difficulty">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((diff) => (
                <SelectItem key={diff.value} value={diff.value}>
                  {diff.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedProvider}
            onValueChange={(value) => setSelectedProvider(value as CourseProvider | "all")}
          >
            <SelectTrigger className="w-[180px]" data-testid="select-provider">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((prov) => (
                <SelectItem key={prov.value} value={prov.value}>
                  {prov.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(selectedCategory !== "all" ||
            selectedDifficulty !== "all" ||
            selectedProvider !== "all" ||
            searchQuery) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDifficulty("all");
                setSelectedProvider("all");
                setSearchQuery("");
              }}
              data-testid="button-clear-filters"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as CourseCategory | "all")} className="mb-8">
        <TabsList className="flex-wrap h-auto gap-1 bg-transparent p-0">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.value}
              value={cat.value}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4"
              data-testid={`tab-${cat.value}`}
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Results Count */}
      <div className="mb-6 text-sm text-muted-foreground">
        {isLoading ? "Loading courses..." : `Showing ${filteredCourses.length} courses`}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CourseSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Course Grid */}
      {!isLoading && filteredCourses.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No courses found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("all");
              setSelectedDifficulty("all");
              setSelectedProvider("all");
              setSearchQuery("");
            }}
          >
            Clear all filters
          </Button>
        </div>
      ) : !isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card
                className="overflow-hidden hover-elevate cursor-pointer h-full group"
                data-testid={`card-course-${course.id}`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-foreground dark:bg-black/90 dark:text-white capitalize"
                    >
                      {course.provider}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge className={getDifficultyColor(course.difficulty)} variant="secondary">
                      {course.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(course.reviewCount / 1000).toFixed(0)}k reviews)
                      </span>
                    </div>
                    <span className="text-sm font-medium">{course.instructor}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
