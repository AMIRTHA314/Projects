
import { AchievementBadge, Achievement } from "./AchievementBadge";

interface AchievementGridProps {
  achievements: Achievement[];
  size?: "sm" | "md" | "lg";
}

export function AchievementGrid({ achievements, size = "md" }: AchievementGridProps) {
  const gridCols = {
    sm: "grid-cols-6",
    md: "grid-cols-4",
    lg: "grid-cols-3",
  };

  return (
    <div className={`grid ${gridCols[size]} gap-4`}>
      {achievements.map((achievement) => (
        <AchievementBadge 
          key={achievement.id} 
          achievement={achievement} 
          size={size} 
        />
      ))}
    </div>
  );
}
