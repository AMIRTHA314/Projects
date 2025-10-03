
import { useState } from "react";
import { AchievementGrid } from "../achievements/AchievementGrid";
import { XPProgress } from "../achievements/XPProgress";
import { Badge } from "lucide-react";
import type { Achievement } from "../achievements/AchievementBadge";

const initialAchievements: Achievement[] = [
  {
    id: "1",
    name: "First Step",
    description: "Complete your first learning session",
    icon: <Badge className="h-5 w-5" />,
    earned: true,
    xpValue: 10,
    date: "May 12, 2025"
  },
  {
    id: "2",
    name: "Quiz Master",
    description: "Achieve 90% or higher on a quiz",
    icon: <Badge className="h-5 w-5" />,
    earned: true,
    xpValue: 25,
    date: "May 13, 2025"
  },
  {
    id: "3",
    name: "Study Streak",
    description: "Study for 3 days in a row",
    icon: <Badge className="h-5 w-5" />,
    earned: false,
    xpValue: 30
  },
  {
    id: "4",
    name: "Subject Expert",
    description: "Complete all topics in a subject",
    icon: <Badge className="h-5 w-5" />,
    earned: false,
    xpValue: 50
  },
  {
    id: "5",
    name: "Note Taker",
    description: "Write notes for 5 different study sessions",
    icon: <Badge className="h-5 w-5" />,
    earned: false,
    xpValue: 15
  },
  {
    id: "6",
    name: "Curious Mind",
    description: "Ask 10 questions during study sessions",
    icon: <Badge className="h-5 w-5" />,
    earned: false,
    xpValue: 20
  }
];

export function AchievementsSection() {
  const [achievements] = useState<Achievement[]>(initialAchievements);
  
  // Calculate total XP
  const totalXP = achievements
    .filter(a => a.earned)
    .reduce((sum, a) => sum + a.xpValue, 0);
  
  // Calculate level based on XP (just a simple formula)
  const level = Math.max(1, Math.floor(totalXP / 50) + 1);
  const xpForNextLevel = level * 50;
  const currentLevelXP = totalXP % 50;
  
  return (
    <div className="edu-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Achievements</h2>
        <div className="text-sm">
          <span className="font-medium text-soft-purple">{totalXP} XP</span>
          <span className="text-muted-foreground"> • Level {level}</span>
        </div>
      </div>
      
      <XPProgress 
        currentXP={currentLevelXP} 
        levelXP={xpForNextLevel} 
        level={level} 
      />
      
      <div className="mt-6">
        <AchievementGrid achievements={achievements} />
      </div>
    </div>
  );
}
