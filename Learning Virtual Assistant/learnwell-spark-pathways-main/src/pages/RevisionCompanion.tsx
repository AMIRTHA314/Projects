
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RevisionFeed from "@/components/mobile/RevisionFeed";
import ChapterNavigator from "@/components/mobile/ChapterNavigator";
import RevisionGoals from "@/components/mobile/RevisionGoals";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ModeToggle from "@/components/mobile/ModeToggle";

const RevisionCompanion = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<"morning" | "night">("morning");
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">Revision Companion</h1>
        </div>
        <ModeToggle activeMode={activeMode} onChange={setActiveMode} />
      </header>
      
      {/* Main Content */}
      <main className="container px-4 py-6 max-w-md mx-auto">
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="feed">Daily Feed</TabsTrigger>
            <TabsTrigger value="navigator">Chapters</TabsTrigger>
            <TabsTrigger value="goals">My Goals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed" className="space-y-4">
            <h2 className="text-xl font-semibold">
              {activeMode === "morning" ? "Morning Recap" : "Night Revision"}
            </h2>
            <RevisionFeed mode={activeMode} />
          </TabsContent>
          
          <TabsContent value="navigator">
            <ChapterNavigator />
          </TabsContent>
          
          <TabsContent value="goals">
            <RevisionGoals />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RevisionCompanion;
