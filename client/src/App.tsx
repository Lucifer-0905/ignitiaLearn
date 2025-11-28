import { Switch, Route } from "wouter";
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

import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Courses from "@/pages/courses";
import CourseDetail from "@/pages/course-detail";
import Assessment from "@/pages/assessment";
import LearningPaths from "@/pages/learning-paths";
import Dashboard from "@/pages/dashboard";
import Projects from "@/pages/projects";
import Analytics from "@/pages/analytics";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
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

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="ignitia-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {isAuthenticated ? <AuthenticatedApp /> : <Router />}
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
