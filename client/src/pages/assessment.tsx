import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  XCircle,
  BookOpen,
  Target,
  Brain,
  Trophy,
  AlertCircle,
  Loader2,
  Clock,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { AssessmentQuestion } from "@shared/schema";

type AssessmentState = "intro" | "quiz" | "results";

interface Answer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

interface AIRecommendation {
  title: string;
  description: string;
  estimatedDuration: string;
  courses: string[];
  skills: string[];
  reasoning: string;
}

export default function Assessment() {
  const [state, setState] = useState<AssessmentState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [aiRecommendation, setAIRecommendation] = useState<AIRecommendation | null>(null);
  const { toast } = useToast();

  const { data: questions = [], isLoading, error } = useQuery<AssessmentQuestion[]>({
    queryKey: ["/api/assessment"],
  });

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const getRecommendationMutation = useMutation({
    mutationFn: async (data: { skills: string[]; level: string }) => {
      const response = await apiRequest("POST", "/api/ai/recommend-path", {
        skills: data.skills,
        goals: ["career advancement", "skill development"],
        currentLevel: data.level,
        timeAvailable: "10 hours per week",
      });
      return response.json();
    },
    onSuccess: (data) => {
      setAIRecommendation(data.recommendation);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to get AI recommendation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleStartQuiz = () => {
    setState("quiz");
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect,
      },
    ]);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setState("results");
    }
  };

  const calculateResults = () => {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const totalScore = Math.round((correctCount / questions.length) * 100);

    const categoryScores: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { correct: 0, total: 0 };
      }
      categoryScores[q.category].total++;
      if (answers[i]?.isCorrect) {
        categoryScores[q.category].correct++;
      }
    });

    const categoryPercentages: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([cat, scores]) => {
      categoryPercentages[cat] = Math.round((scores.correct / scores.total) * 100);
    });

    let strongestCategory = "development";
    let highestScore = 0;
    Object.entries(categoryPercentages).forEach(([cat, score]) => {
      if (score > highestScore) {
        highestScore = score;
        strongestCategory = cat;
      }
    });

    const level = totalScore >= 80 ? "advanced" : totalScore >= 50 ? "intermediate" : "beginner";

    return {
      totalScore,
      correctCount,
      categoryPercentages,
      strongestCategory,
      level,
    };
  };

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      development: "Development",
      design: "Design",
      business: "Business",
      "data-science": "Data Science",
      marketing: "Marketing",
      "personal-development": "Personal Development",
    };
    return labels[cat] || cat;
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      development: "bg-blue-500",
      design: "bg-purple-500",
      business: "bg-green-500",
      "data-science": "bg-orange-500",
      marketing: "bg-pink-500",
      "personal-development": "bg-teal-500",
    };
    return colors[cat] || "bg-gray-500";
  };

  if (error) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load assessment</h2>
          <p className="text-muted-foreground mb-4">
            There was an error loading the assessment. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (state === "intro") {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Skill Assessment</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Take our AI-powered assessment to discover your strengths and get a
            personalized learning path tailored just for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Identify Strengths</h3>
              <p className="text-sm text-muted-foreground">
                Discover your current skill levels across different domains
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Brain className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get intelligent recommendations based on your responses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Custom Path</h3>
              <p className="text-sm text-muted-foreground">
                Receive a personalized learning path to reach your goals
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-bold">{questions.length}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Questions</h3>
                    <p className="text-sm text-muted-foreground">
                      Multiple choice covering various skill areas
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">5 Minutes</h3>
                    <p className="text-sm text-muted-foreground">
                      Average time to complete the assessment
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            size="lg"
            onClick={handleStartQuiz}
            disabled={isLoading || questions.length === 0}
            data-testid="button-start-assessment"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (state === "quiz") {
    if (!currentQuestion) {
      return (
        <div className="p-6 max-w-3xl mx-auto">
          <Skeleton className="h-4 w-full mb-8" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2 mb-4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className="capitalize">
                {getCategoryLabel(currentQuestion.category)}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {currentQuestion.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-xl" data-testid="text-question">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    showFeedback
                      ? index === currentQuestion.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-950"
                        : index === selectedAnswer
                        ? "border-red-500 bg-red-50 dark:bg-red-950"
                        : "border-muted"
                      : selectedAnswer === index
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50"
                  }`}
                  data-testid={`option-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        showFeedback
                          ? index === currentQuestion.correctAnswer
                            ? "bg-green-500 text-white"
                            : index === selectedAnswer
                            ? "bg-red-500 text-white"
                            : "bg-muted"
                          : selectedAnswer === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {showFeedback ? (
                        index === currentQuestion.correctAnswer ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : index === selectedAnswer ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!showFeedback ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              data-testid="button-submit-answer"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} data-testid="button-next-question">
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Results"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Results State
  const results = calculateResults();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
          <Trophy className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
        <p className="text-lg text-muted-foreground">
          Here's your personalized skill analysis and learning recommendations
        </p>
      </div>

      {/* Score Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 text-center">
            <div className="relative inline-flex items-center justify-center mb-4">
              <svg className="h-32 w-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(results.totalScore / 100) * 352} 352`}
                  className="text-primary"
                />
              </svg>
              <span className="absolute text-3xl font-bold" data-testid="text-score">
                {results.totalScore}%
              </span>
            </div>
            <h3 className="font-semibold mb-1">Overall Score</h3>
            <p className="text-sm text-muted-foreground">
              {results.correctCount} of {questions.length} correct
            </p>
            <Badge variant="secondary" className="mt-2 capitalize">
              {results.level} Level
            </Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(results.categoryPercentages).map(([category, score]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{getCategoryLabel(category)}</span>
                    <span className="text-sm text-muted-foreground">{score}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getCategoryColor(category)} transition-all duration-500`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendation */}
      <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI-Powered Recommendation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {aiRecommendation ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{aiRecommendation.title}</h3>
                <p className="text-muted-foreground">{aiRecommendation.description}</p>
              </div>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {aiRecommendation.estimatedDuration}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  {aiRecommendation.courses.length} courses
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "{aiRecommendation.reasoning}"
              </p>
              <Button asChild data-testid="button-start-path">
                <Link href="/learning-paths">
                  Start This Path
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">
                Get a personalized learning path based on your assessment results
              </p>
              <Button
                onClick={() => getRecommendationMutation.mutate({
                  skills: [getCategoryLabel(results.strongestCategory)],
                  level: results.level,
                })}
                disabled={getRecommendationMutation.isPending}
                data-testid="button-get-recommendation"
              >
                {getRecommendationMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Recommendation
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover-elevate">
          <CardContent className="pt-6">
            <BookOpen className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Explore Courses</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Browse our full catalog of courses and start building your skills.
            </p>
            <Button variant="outline" asChild data-testid="button-explore-courses">
              <Link href="/courses">View All Courses</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardContent className="pt-6">
            <Target className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Learning Paths</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Explore curated learning paths designed by experts for your goals.
            </p>
            <Button variant="outline" asChild data-testid="button-view-paths">
              <Link href="/learning-paths">View Learning Paths</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
