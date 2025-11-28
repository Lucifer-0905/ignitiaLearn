import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Star,
  Play,
} from "lucide-react";
import { mockCourses } from "@/lib/mock-data";

const stats = [
  { icon: Users, value: "10,000+", label: "Active Learners" },
  { icon: BookOpen, value: "500+", label: "Expert Courses" },
  { icon: Award, value: "95%", label: "Completion Rate" },
  { icon: TrendingUp, value: "87%", label: "Career Advancement" },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Learning Paths",
    description: "Personalized curriculum tailored to your goals, skill level, and learning pace.",
  },
  {
    icon: BookOpen,
    title: "Premium Course Content",
    description: "Access courses from top platforms like Coursera and Udemy in one place.",
  },
  {
    icon: CheckCircle,
    title: "Hands-On Projects",
    description: "Apply your knowledge with practical projects that build your portfolio.",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Track your learning journey with detailed insights and skill assessments.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    content: "Ignitia helped me transition from marketing to software development in just 6 months. The personalized learning path was exactly what I needed.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    content: "The AI-powered recommendations are spot on. I've learned more in 3 months here than I did in a year of self-study.",
    avatar: "MC",
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    content: "The practical projects really set Ignitia apart. I built an amazing portfolio that helped me land my dream job.",
    avatar: "ED",
  },
];

export default function Home() {
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            AI-Powered Education Platform
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Master Any Skill with
            <span className="block text-primary">AI-Powered Learning Paths</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Personalized education for everyone. Access courses from Coursera and Udemy, 
            complete practical projects, and track your progress with intelligent analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild data-testid="button-start-journey">
              <Link href="/assessment">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white"
              asChild
              data-testid="button-explore-courses"
            >
              <Link href="/courses">
                <Play className="mr-2 h-5 w-5" />
                Explore Courses
              </Link>
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Ignitia?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with world-class educational content 
              to create the most effective learning experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate border">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Popular Courses</h2>
              <p className="text-muted-foreground">Start learning from top instructors worldwide</p>
            </div>
            <Button variant="outline" asChild data-testid="button-view-all-courses">
              <Link href="/courses">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover-elevate group">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-foreground dark:bg-black/90 dark:text-white"
                    >
                      {course.provider === "coursera" ? "Coursera" : "Udemy"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        course.difficulty === "beginner"
                          ? "default"
                          : course.difficulty === "intermediate"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {course.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{course.duration}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(course.reviewCount / 1000).toFixed(0)}k)
                      </span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {course.instructor}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners who have transformed their careers with Ignitia.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Take our skill assessment and get a personalized learning path designed just for you.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            data-testid="button-take-assessment"
          >
            <Link href="/assessment">
              Take Free Assessment
              <Sparkles className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-serif text-xl font-bold">Ignitia</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered learning platform for personalized education paths.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/courses" className="hover:text-foreground">Browse Courses</Link></li>
                <li><Link href="/learning-paths" className="hover:text-foreground">Learning Paths</Link></li>
                <li><Link href="/assessment" className="hover:text-foreground">Skill Assessment</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/courses?category=development" className="hover:text-foreground">Development</Link></li>
                <li><Link href="/courses?category=design" className="hover:text-foreground">Design</Link></li>
                <li><Link href="/courses?category=data-science" className="hover:text-foreground">Data Science</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover:text-foreground cursor-pointer">About Us</span></li>
                <li><span className="hover:text-foreground cursor-pointer">Contact</span></li>
                <li><span className="hover:text-foreground cursor-pointer">Privacy Policy</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>2024 Ignitia. All rights reserved. Empowering learners worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
