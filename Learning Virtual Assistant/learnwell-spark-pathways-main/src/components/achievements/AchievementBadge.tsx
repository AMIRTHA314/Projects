
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge as BadgeIcon } from "lucide-react";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  xpValue: number;
  date?: string;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: "sm" | "md" | "lg";
}

export function AchievementBadge({ achievement, size = "md" }: AchievementBadgeProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center">
            <div 
              className={`${sizeClasses[size]} flex items-center justify-center rounded-full ${
                achievement.earned 
                  ? "bg-soft-purple text-white" 
                  : "bg-muted/50 text-muted-foreground"
              } relative`}
            >
              {achievement.icon || <BadgeIcon className="h-6 w-6" />}
              
              {!achievement.earned && (
                <div className="absolute inset-0 bg-background/60 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-background border-2 border-muted rounded-full flex items-center justify-center">
                    <span className="text-xs">🔒</span>
                  </div>
                </div>
              )}
            </div>
            {size !== "sm" && (
              <Badge 
                variant={achievement.earned ? "default" : "outline"}
                className="mt-1 text-xs font-medium truncate max-w-24"
              >
                {achievement.name}
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-60">
          <div className="space-y-1">
            <p className="font-semibold">{achievement.name}</p>
            <p className="text-xs text-muted-foreground">{achievement.description}</p>
            <div className="flex justify-between text-xs">
              <span>{achievement.earned ? "Earned" : "Locked"}</span>
              <span className="font-semibold text-soft-purple">+{achievement.xpValue} XP</span>
            </div>
            {achievement.date && (
              <p className="text-xs text-muted-foreground">Earned on {achievement.date}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
