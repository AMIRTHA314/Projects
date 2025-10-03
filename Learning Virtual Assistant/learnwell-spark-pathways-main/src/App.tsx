
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import DailyCheckIn from "./components/checkin/DailyCheckIn";
import StudyScreen from "./components/study/StudyScreen";
import QuizScreen from "./components/quiz/QuizScreen";
import RevisionCompanion from "./pages/RevisionCompanion";
import TestPaperCreator from "./components/testpapers/TestPaperCreator";
import Homework from "./components/homework/Homework";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/check-in" element={<DailyCheckIn />} />
          <Route path="/study" element={<StudyScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/revision-companion" element={<RevisionCompanion />} />
          <Route path="/test-paper-creator" element={<TestPaperCreator />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
