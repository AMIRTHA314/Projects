
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Timer } from "lucide-react";

export interface CoLearningSessionProps {
  isParentMode?: boolean;
}

export function CoLearningSession({ isParentMode = false }: CoLearningSessionProps) {
  const [open, setOpen] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionDuration, setSessionDuration] = useState("30");
  
  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionTitle || !sessionDate) return;
    
    // In a real app, this would save the session to a database
    console.log("Session scheduled:", {
      title: sessionTitle,
      date: sessionDate,
      duration: sessionDuration
    });
    
    toast({
      title: "Co-learning session scheduled",
      description: `"${sessionTitle}" is scheduled for ${sessionDate}.`,
    });
    
    setSessionTitle("");
    setSessionDate("");
    setSessionDuration("30");
    setOpen(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Co-Learning Sessions</CardTitle>
        <CardDescription>
          Learn together with {isParentMode ? "your child" : "a parent or guardian"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="bg-soft-purple/20 p-2 rounded-full">
              <Timer className="h-5 w-5 text-soft-purple" />
            </div>
            <div>
              <h4 className="font-medium text-base">Why co-learning works</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Research shows that when parents and children learn together, 
                knowledge retention improves by up to 60% and study motivation increases.
              </p>
            </div>
          </div>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              {isParentMode ? "Schedule a Session with Your Child" : "Request a Learning Session"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isParentMode ? "Schedule a Co-Learning Session" : "Request a Learning Session"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSchedule} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="title">Session Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Help with Algebra"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  step="5"
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isParentMode ? "Schedule Session" : "Request Session"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-xs text-muted-foreground">
          {isParentMode 
            ? "Schedule time to help your child with specific topics they're struggling with."
            : "Request help from a parent or guardian on topics you find challenging."
          }
        </p>
      </CardFooter>
    </Card>
  );
}
