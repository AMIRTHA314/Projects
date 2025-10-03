
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Timer, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface StudyGoal {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: string;
  category: "daily" | "weekly" | "monthly" | "custom";
  completed: boolean;
  xpReward: number;
}

interface StudyGoalProps {
  goal: StudyGoal;
  onUpdate?: (updatedGoal: StudyGoal) => void;
}

export function StudyGoal({ goal, onUpdate }: StudyGoalProps) {
  const [expanded, setExpanded] = useState(false);
  
  const progress = Math.min(Math.round((goal.currentValue / goal.targetValue) * 100), 100);
  
  const handleIncrement = () => {
    if (goal.completed) return;
    
    const newValue = Math.min(goal.currentValue + 1, goal.targetValue);
    const updatedGoal = {
      ...goal,
      currentValue: newValue,
      completed: newValue >= goal.targetValue
    };
    
    if (updatedGoal.completed && !goal.completed) {
      toast({
        title: "Goal completed! 🎉",
        description: `You've earned ${goal.xpReward} XP for completing "${goal.title}"`,
      });
    }
    
    onUpdate?.(updatedGoal);
  };
  
  return (
    <div
      className={`p-4 rounded-lg border transition-all cursor-pointer ${
        goal.completed
          ? "bg-soft-purple/10 border-soft-purple/30"
          : "bg-card border-border hover:border-soft-purple/30"
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-medium text-base leading-tight">{goal.title}</h4>
            <Badge variant={goal.completed ? "default" : "outline"} className="text-xs h-5">
              {goal.category}
            </Badge>
          </div>
          
          {goal.deadline && (
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Timer className="h-3 w-3" />
              <span>Due {goal.deadline}</span>
            </div>
          )}
        </div>
        
        {goal.completed ? (
          <Badge className="bg-soft-purple hover:bg-soft-purple">
            <Award className="h-3 w-3 mr-1" />
            <span>+{goal.xpReward} XP</span>
          </Badge>
        ) : (
          <Badge variant="outline" className="border-muted-foreground/30">
            <span>+{goal.xpReward} XP</span>
          </Badge>
        )}
      </div>
      
      <div className="mt-2 space-y-2">
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">
            {goal.currentValue}/{goal.targetValue} {goal.unit}
          </span>
        </div>
        <Progress 
          value={progress} 
          className={`h-2 ${goal.completed ? "bg-soft-purple/20" : "bg-muted"}`} 
        />
        
        {expanded && !goal.completed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleIncrement();
            }}
            className="mt-3 w-full py-1 text-xs rounded bg-soft-purple/10 text-soft-purple hover:bg-soft-purple/20 transition-colors"
          >
            Update Progress
          </button>
        )}
      </div>
    </div>
  );
}
