
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StudyGoal } from "./StudyGoal";

interface AddGoalDialogProps {
  onAddGoal: (goal: Omit<StudyGoal, "id" | "completed" | "currentValue">) => void;
}

export function AddGoalDialog({ onAddGoal }: AddGoalDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [unit, setUnit] = useState("minutes");
  const [category, setCategory] = useState<"daily" | "weekly" | "monthly" | "custom">("daily");
  const [deadline, setDeadline] = useState("");
  const [xpReward, setXpReward] = useState("10");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !targetValue) return;
    
    onAddGoal({
      title,
      targetValue: Number(targetValue),
      unit,
      category,
      deadline: deadline || undefined,
      xpReward: Number(xpReward) || 10
    });
    
    // Reset form
    setTitle("");
    setTargetValue("");
    setUnit("minutes");
    setCategory("daily");
    setDeadline("");
    setXpReward("10");
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Add New Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Study Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g., Study Chemistry" 
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetValue">Target</Label>
              <Input 
                id="targetValue" 
                type="number" 
                min="1"
                value={targetValue} 
                onChange={(e) => setTargetValue(e.target.value)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="problems">Problems</SelectItem>
                  <SelectItem value="pages">Pages</SelectItem>
                  <SelectItem value="sessions">Sessions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Timeframe</Label>
              <Select value={category} onValueChange={(val: "daily" | "weekly" | "monthly" | "custom") => setCategory(val)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="xpReward">XP Reward</Label>
              <Input 
                id="xpReward" 
                type="number" 
                min="1"
                value={xpReward} 
                onChange={(e) => setXpReward(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline (Optional)</Label>
            <Input 
              id="deadline" 
              type="date" 
              value={deadline} 
              onChange={(e) => setDeadline(e.target.value)} 
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Goal</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
