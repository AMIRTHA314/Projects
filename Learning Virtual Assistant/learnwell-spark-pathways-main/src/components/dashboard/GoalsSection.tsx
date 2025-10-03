
import { useState } from "react";
import { StudyGoal } from "../goals/StudyGoal";
import { AddGoalDialog } from "../goals/AddGoalDialog";
import type { StudyGoal as StudyGoalType } from "../goals/StudyGoal";

// Initial sample goals
const initialGoals: StudyGoalType[] = [
  {
    id: "1",
    title: "Complete Algebra practice",
    targetValue: 10,
    currentValue: 3,
    unit: "problems",
    category: "daily",
    deadline: "2025-05-16",
    completed: false,
    xpReward: 15
  },
  {
    id: "2",
    title: "Read Chemistry chapter",
    targetValue: 5,
    currentValue: 5,
    unit: "pages",
    category: "daily",
    completed: true,
    xpReward: 10
  },
  {
    id: "3",
    title: "Study for Physics exam",
    targetValue: 120,
    currentValue: 45,
    unit: "minutes",
    category: "weekly",
    deadline: "2025-05-20",
    completed: false,
    xpReward: 30
  }
];

export function GoalsSection() {
  const [goals, setGoals] = useState<StudyGoalType[]>(initialGoals);
  
  const handleUpdateGoal = (updatedGoal: StudyGoalType) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };
  
  const handleAddGoal = (newGoal: Omit<StudyGoalType, "id" | "completed" | "currentValue">) => {
    const goal: StudyGoalType = {
      ...newGoal,
      id: `goal-${Date.now()}`,
      currentValue: 0,
      completed: false,
    };
    
    setGoals([goal, ...goals]);
  };
  
  return (
    <div className="edu-card">
      <h2 className="text-xl font-bold mb-4">Study Goals</h2>
      
      <div className="mb-4">
        <AddGoalDialog onAddGoal={handleAddGoal} />
      </div>
      
      <div className="space-y-3">
        {goals.map((goal) => (
          <StudyGoal 
            key={goal.id} 
            goal={goal} 
            onUpdate={handleUpdateGoal}
          />
        ))}
        
        {goals.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No study goals yet. Create your first goal!</p>
          </div>
        )}
      </div>
    </div>
  );
}
