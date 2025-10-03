
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import MotivationalQuote from "../MotivationalQuote";
import ThemeToggle from "../ThemeToggle";
import { AchievementsSection } from "./AchievementsSection";
import { GoalsSection } from "./GoalsSection";
import { ParentFeedback } from "../collaboration/ParentFeedback";
import { CoLearningSession } from "../collaboration/CoLearningSession";
import { toast } from "@/hooks/use-toast";

interface StudentInfo {
  fullName: string;
  class: string;
  board: string;
  interests: string[];
  struggleSubjects: string[];
  targetMarks: Record<string, number>;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [isParentMode, setIsParentMode] = useState(false);
  
  // Mock data for progress
  const progressData = [
    {
      subject: "Mathematics",
      progress: 75, // percentage
      target: 85,
    },
    {
      subject: "Science",
      progress: 60,
      target: 80,
    },
    {
      subject: "English",
      progress: 90,
      target: 85,
    },
  ];
  
  useEffect(() => {
    // Get student info from localStorage
    const storedInfo = localStorage.getItem("studentInfo");
    if (storedInfo) {
      setStudentInfo(JSON.parse(storedInfo));
    } else {
      // If no student info, redirect to enrollment
      navigate("/");
    }
  }, [navigate]);
  
  const handleStartSession = () => {
    navigate("/check-in");
  };

  const handleStartHomework = () => {
    navigate("/homework");
    toast({
      title: "Homework Session",
      description: "Upload or create homework assignments",
    });
  };
  
  const toggleParentMode = () => {
    setIsParentMode(!isParentMode);
    toast({
      title: isParentMode ? "Student Mode Activated" : "Parent Mode Activated",
      description: isParentMode 
        ? "Switched to student dashboard view" 
        : "Welcome to the parent view. Monitor progress and support learning.",
    });
  };

  const handleStartOver = () => {
    // Clear student info from localStorage
    localStorage.removeItem("studentInfo");
    // Navigate to enrollment page
    navigate("/");
  };
  
  const openRevisionCompanion = () => {
    navigate("/revision-companion");
    toast({
      title: "Opening Revision Companion",
      description: "Switch to your mobile-optimized revision experience",
    });
  };

  const handleCreateTestPaper = () => {
    if (isParentMode) {
      navigate("/test-paper-creator");
      toast({
        title: "Test Paper Creator",
        description: "Create customized test papers for your child",
      });
    }
  };

  if (!studentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white dark:bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">
              {isParentMode ? "Parent Dashboard" : "Student Dashboard"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isParentMode ? `Monitoring: ${studentInfo?.fullName}` : `Welcome back, ${studentInfo?.fullName}`}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <button
              onClick={toggleParentMode}
              className="rounded-lg px-3 py-1 text-sm bg-primary/80 hover:bg-primary text-primary-foreground transition-colors"
            >
              {isParentMode ? "Student Mode" : "Parent Mode"}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Mobile Companion Banner */}
        <div className="mb-6 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-bold">Revision Companion</h2>
            <p className="text-sm text-muted-foreground">
              Quick revision with audio support. Perfect for morning and night study!
            </p>
          </div>
          <button 
            onClick={openRevisionCompanion}
            className="py-2 px-4 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 whitespace-nowrap"
          >
            📱 Open Mobile Companion
          </button>
        </div>

        {/* Parent Test Paper Creator */}
        {isParentMode && (
          <div className="mb-6 bg-gradient-to-r from-primary/20 to-primary/30 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-lg font-bold">Test Paper Creator</h2>
                <p className="text-sm text-muted-foreground">
                  Create custom test papers and validate your child's answers
                </p>
              </div>
              <button 
                onClick={handleCreateTestPaper}
                className="py-2 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center gap-2 whitespace-nowrap"
              >
                Create Test Paper
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Progress Overview */}
            <div className="edu-card">
              <h2 className="text-xl font-bold mb-4">
                {isParentMode ? "Your Child's Progress" : "Your Progress"}
              </h2>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={progressData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#9B87F5" name="Current" />
                    <Bar dataKey="target" fill="#D6BCFA" name="Goal" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Achievements Section */}
            <AchievementsSection />
            
            {/* Recent Activity */}
            <div className="edu-card">
              <h2 className="text-xl font-bold mb-4">
                Recent Activity
              </h2>
              
              <div className="divide-y divide-border">
                <div className="py-3">
                  <p className="font-medium">Completed a quiz on Linear Equations</p>
                  <p className="text-sm text-muted-foreground">Score: 80% • 2 days ago</p>
                </div>
                <div className="py-3">
                  <p className="font-medium">Studied Chemistry - Periodic Table</p>
                  <p className="text-sm text-muted-foreground">45 minutes • 3 days ago</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="edu-card">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <button
                  onClick={handleStartSession}
                  className="w-full edu-button-primary"
                >
                  Start New Session
                </button>

                {!isParentMode && (
                  <button
                    onClick={handleStartHomework}
                    className="w-full bg-primary/80 hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3 font-medium transition-all duration-200 shadow-sm"
                  >
                    Homework & Assignments
                  </button>
                )}
                
                <button
                  onClick={openRevisionCompanion}
                  className="w-full bg-primary/80 hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3 font-medium transition-all duration-200 shadow-sm"
                >
                  Open Revision Companion
                </button>
                
                {isParentMode && (
                  <button
                    onClick={handleCreateTestPaper}
                    className="w-full bg-primary/80 hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3 font-medium transition-all duration-200 shadow-sm"
                  >
                    Create Test Papers
                  </button>
                )}
                
                <button
                  className="w-full edu-button-secondary"
                >
                  Review Past Notes
                </button>
                
                {isParentMode && (
                  <ParentFeedback />
                )}
                
                <button 
                  onClick={handleStartOver}
                  className="w-full border border-destructive text-destructive hover:bg-destructive/10 rounded-xl px-6 py-3 font-medium transition-all duration-200"
                >
                  Start Over
                </button>
              </div>
            </div>
            
            {/* Goals Section */}
            <GoalsSection />
            
            {/* Co-Learning Section */}
            <CoLearningSession isParentMode={isParentMode} />
            
            {/* Motivational Quote */}
            <MotivationalQuote />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
