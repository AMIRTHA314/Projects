import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { XPProgress } from "../achievements/XPProgress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Badge as BadgeIcon, Timer } from "lucide-react";
import DoubtAsker from "./DoubtAsker";
import CustomWebViewer from "@/components/CustomWebViewer";

interface StudySession {
  classLevel: string;
  subject: string;
  chapter: string;
  concept: string;
  mood: string;
  timestamp: string;
}

export const StudyScreen = () => {
  const navigate = useNavigate();
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const [notes, setNotes] = useState("");
  const [studyTimer, setStudyTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [xpEarned, setXpEarned] = useState(0);

  const getPdfPath = () => {
    if (!studySession) return "";
    const classLevel = studySession.classLevel;
    const subject = studySession.subject.toLowerCase().replace(/\s+/g, "_").replace(/[()]/g, "");
    const chapter = studySession.chapter.toLowerCase().replace(/\s+/g, "_");
    return `/books/class${classLevel}/${subject}_${chapter}.pdf`;
  };

  useEffect(() => {
    let interval: number | undefined;
    if (isTimerActive) {
      interval = setInterval(() => {
        setStudyTimer((prev) => prev + 1);
        if ((studyTimer + 1) % 60 === 0) {
          const newXP = 2;
          setXpEarned((prev) => prev + newXP);
          toast({
            title: `+${newXP} XP earned!`,
            description: "Keep studying to earn more XP and unlock achievements.",
          });
        }
      }, 1000) as unknown as number;
    }
    return () => clearInterval(interval);
  }, [isTimerActive, studyTimer]);

  useEffect(() => {
    const sessionData = localStorage.getItem("currentStudySession");
    if (sessionData) {
      setStudySession(JSON.parse(sessionData));
    } else {
      navigate("/check-in");
    }
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSaveNotes = () => {
    if (!studySession) return;
    const savedNotes = JSON.parse(localStorage.getItem("studyNotes") || "{}");
    savedNotes[`${studySession.subject}-${studySession.chapter}-${studySession.concept}`] = notes;
    localStorage.setItem("studyNotes", JSON.stringify(savedNotes));
    const notesXP = 5;
    setXpEarned((prev) => prev + notesXP);
    toast({
      title: "Notes saved successfully!",
      description: `You earned +${notesXP} XP for taking notes.`,
    });
  };

  const handleExplainDifferently = () => {
    toast({
      title: "Explanation refreshed",
      description: "In a full implementation, this would generate a different explanation.",
    });
  };

  const handleQuizMe = () => {
    navigate("/quiz", {
      state: {
        subject: studySession?.subject,
        chapter: studySession?.chapter,
        concept: studySession?.concept,
        xpEarned: xpEarned,
      },
    });
  };

  const handleFinish = () => {
    toast({
      title: "Study session completed!",
      description: `Great job! You earned a total of ${xpEarned} XP in this session.`,
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  if (!studySession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading study session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">
              {studySession.subject}: {studySession.concept}
            </h1>
            <p className="text-sm text-muted-foreground">{studySession.chapter}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-lg text-sm">
              <Timer className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{formatTime(studyTimer)}</span>
            </div>
            <button
              onClick={handleFinish}
              className="text-sm px-3 py-1 rounded-lg bg-soft-gray/70 hover:bg-soft-gray transition-colors"
            >
              Finish
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6 p-3 bg-white dark:bg-card rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <BadgeIcon className="h-4 w-4 text-soft-purple" />
              <span className="font-medium text-sm">Session Progress</span>
            </div>
            <Badge variant="outline" className="font-medium text-soft-purple">
              +{xpEarned} XP
            </Badge>
          </div>
          <XPProgress currentXP={xpEarned} levelXP={100} level={1} compact />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="edu-card h-full">
            <h2 className="text-xl font-bold mb-4">Textbook PDF</h2>
            <div className="border border-border rounded-lg" style={{ height: "600px" }}>
              <CustomWebViewer pdfUrl={getPdfPath()} />
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="edu-card flex-1 mb-6">
              <h2 className="text-xl font-bold mb-4">Personalized Explanation</h2>
              <Tabs defaultValue="explanation" className="space-y-4">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                  <TabsTrigger value="notes">Your Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="explanation" className="space-y-4">
                  <p className="text-muted-foreground italic mb-4">
                    This is a demo. In a full implementation, this would show a personalized explanation based on your learning style and mood.
                  </p>
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleExplainDifferently}
                      className="text-sm px-4 py-2 rounded-lg bg-soft-blue/20 hover:bg-soft-blue/30 transition-colors flex-1"
                    >
                      Explain Differently
                    </button>
                    <button
                      onClick={handleQuizMe}
                      className="text-sm px-4 py-2 rounded-lg bg-soft-purple/20 hover:bg-soft-purple/30 transition-colors flex-1"
                    >
                      Quiz Me
                    </button>
                  </div>
                  <DoubtAsker
                    subject={studySession.subject}
                    chapter={studySession.chapter}
                    concept={studySession.concept}
                  />
                </TabsContent>

                <TabsContent value="notes">
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-3 rounded-lg border border-border min-h-[200px] focus:ring-2 focus:ring-soft-purple focus:border-soft-purple outline-none transition-all"
                      placeholder="Take notes here..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                    <button
                      onClick={handleSaveNotes}
                      className="px-4 py-2 bg-soft-purple text-white rounded-lg hover:bg-soft-purple/90 transition-colors"
                    >
                      Save Notes
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="edu-card">
              <h2 className="text-lg font-medium mb-3">Study Milestones</h2>
              <div className="flex justify-around items-center">
                {[5, 10, 15, 20].map((min) => (
                  <div
                    key={min}
                    className={`flex flex-col items-center ${
                      studyTimer >= min * 60 ? "text-soft-purple" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        studyTimer >= min * 60 ? "bg-soft-purple/20" : "bg-muted/30"
                      }`}
                    >
                      <span className="text-lg">{min}m</span>
                    </div>
                    <span className="text-xs mt-1">+{min} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudyScreen;
