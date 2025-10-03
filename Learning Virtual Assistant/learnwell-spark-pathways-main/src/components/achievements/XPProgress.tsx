
import { Progress } from "@/components/ui/progress";

interface XPProgressProps {
  currentXP: number;
  levelXP: number;
  level: number;
  compact?: boolean;
}

export function XPProgress({ currentXP, levelXP, level, compact = false }: XPProgressProps) {
  const percentage = Math.min(Math.round((currentXP / levelXP) * 100), 100);
  
  return (
    <div className="space-y-1">
      {!compact && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Level {level}</span>
          <span>{currentXP}/{levelXP} XP</span>
        </div>
      )}
      <Progress value={percentage} className="h-2 bg-muted" />
      {compact && (
        <div className="flex justify-between text-xs">
          <span className="font-medium text-soft-purple">Lvl {level}</span>
          <span className="text-muted-foreground">{percentage}%</span>
        </div>
      )}
    </div>
  );
}
