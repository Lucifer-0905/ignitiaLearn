import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";

// Lazy load pages
const Landing = lazy(() => import("@/pages/landing"));
const Home = lazy(() => import("@/pages/home"));
const Courses = lazy(() => import("@/pages/courses"));
const CourseDetail = lazy(() => import("@/pages/course-detail"));
const Assessment = lazy(() => import("@/pages/assessment"));
const LearningPaths = lazy(() => import("@/pages/learning-paths"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Projects = lazy(() => import("@/pages/projects"));
const Analytics = lazy(() => import("@/pages/analytics"));
const NotFound = lazy(() => import("@/pages/not-found"));

const PageLoader = () => <div className="flex items-center justify-center h-screen">Loading...</div>;

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {!isAuthenticated ? (
          <>
            <Route path="/" component={Landing} />
            <Route component={NotFound} />
          </>
        ) : (
          <>
            <Route path="/" component={Home} />
            <Route path="/courses" component={Courses} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/assessment" component={Assessment} />
            <Route path="/learning-paths" component={LearningPaths} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/projects" component={Projects} />
            <Route path="/analytics" component={Analytics} />
            <Route component={NotFound} />
          </>
        )}
      </Switch>
    </Suspense>
  );
}

function AuthenticatedApp() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3.5rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-14 items-center justify-between gap-4 border-b px-4 flex-shrink-0">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <ScrollArea className="flex-1">
            <main>
              <Router />
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show content immediately, don't wait for auth check
  return isAuthenticated ? <AuthenticatedApp /> : <Router />;
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ignitia-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
