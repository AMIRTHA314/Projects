
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { getMockSubjects, getMockChapters } from "@/data/mockRevisionData";

interface Goal {
  id: string;
  subject: string;
  chapter: string;
  completed: boolean;
}

const RevisionGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", subject: "Physics", chapter: "Forces and Motion", completed: true },
    { id: "2", subject: "Chemistry", chapter: "Periodic Table", completed: false },
    { id: "3", subject: "Mathematics", chapter: "Quadratic Equations", completed: false }
  ]);
  
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  
  // This would be dynamic in a real app based on user's selection
  const mockSubjects = getMockSubjects("cbse", "10");
  const mockChapters = getMockChapters("cbse", "10", selectedSubject);
  
  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };
  
  const addGoal = () => {
    if (selectedSubject && selectedChapter) {
      const newGoal = {
        id: Date.now().toString(),
        subject: selectedSubject,
        chapter: selectedChapter,
        completed: false
      };
      
      setGoals([...goals, newGoal]);
      setIsAddingGoal(false);
      setSelectedSubject("");
      setSelectedChapter("");
    }
  };
  
  const completedCount = goals.filter(goal => goal.completed).length;
  const progressPercentage = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;
  
  const subjectToName = (id: string) => {
    return mockSubjects.find(s => s.id === id)?.name || id;
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-medium">This Week's Goals</h3>
        <p className="text-sm text-muted-foreground">
          Set your revision goals to stay on track
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{completedCount} of {goals.length} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>
      
      <div className="space-y-3">
        {goals.map(goal => (
          <Card key={goal.id} className={`transition-colors ${goal.completed ? "bg-accent/30" : ""}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{subjectToName(goal.subject)}</h4>
                  <p className="text-sm text-muted-foreground">{goal.chapter}</p>
                </div>
                
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="rounded-full h-8 w-8 p-0"
                  onClick={() => toggleGoalCompletion(goal.id)}
                >
                  {goal.completed ? 
                    <CheckCircle className="h-5 w-5 text-primary" /> : 
                    <Circle className="h-5 w-5" />
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {isAddingGoal ? (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Add New Goal</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm mb-1 block">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSubjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm mb-1 block">Chapter</label>
                  <Select 
                    value={selectedChapter} 
                    onValueChange={setSelectedChapter}
                    disabled={!selectedSubject}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockChapters.map(chapter => (
                        <SelectItem key={chapter.id} value={chapter.id}>
                          {chapter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={addGoal}
                    disabled={!selectedSubject || !selectedChapter}
                  >
                    Add
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsAddingGoal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => setIsAddingGoal(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Add New Goal</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default RevisionGoals;
