
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileUp, CheckCircle, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { getMockSubjects } from "@/data/mockRevisionData";

interface HomeworkAssignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
}

const Homework = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<HomeworkAssignment[]>([
    {
      id: "1",
      title: "Chapter 5 Problems",
      subject: "Mathematics",
      dueDate: "2025-05-20",
      completed: false,
    },
    {
      id: "2",
      title: "Lab Report on Acids",
      subject: "Chemistry",
      dueDate: "2025-05-18",
      completed: true,
    },
    {
      id: "3",
      title: "Essay on Renewable Energy",
      subject: "Physics",
      dueDate: "2025-05-25",
      completed: false,
    },
  ]);

  // For the upload form
  const [subject, setSubject] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  // Mock data
  const boardId = "cbse";
  const classId = "10"; // Default to Class 10
  const subjects = getMockSubjects(boardId, classId);

  const markAsComplete = (id: string) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );
  };

  const handleUploadHomework = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would handle file upload
    toast({
      title: "Homework Uploaded",
      description: "Your homework has been submitted successfully.",
    });
  };

  const handleNewAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !title || !dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newAssignment: HomeworkAssignment = {
      id: Date.now().toString(),
      title,
      subject: subjects.find(s => s.id === subject)?.name || subject,
      dueDate,
      completed: false,
    };
    
    setAssignments([...assignments, newAssignment]);
    
    // Reset form
    setTitle("");
    setSubject("");
    setDueDate("");
    
    toast({
      title: "New Assignment Created",
      description: "Your homework assignment has been added to your list.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white dark:bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">Homework & Assignments</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="current">Current Assignments</TabsTrigger>
            <TabsTrigger value="upload">Upload Homework</TabsTrigger>
            <TabsTrigger value="new">Add New Assignment</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-5">
            <h2 className="text-xl font-semibold mb-4">Your Homework Assignments</h2>
            
            {assignments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No assignments found</p>
              </div>
            ) : (
              assignments.map((assignment) => (
                <Card key={assignment.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {assignment.subject} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant={assignment.completed ? "outline" : "default"}
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => markAsComplete(assignment.id)}
                        >
                          {assignment.completed ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span>Completed</span>
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4" />
                              <span>Submit</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Homework</CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleUploadHomework} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="homeworkUpload">Upload Assignment</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">
                        Drag & drop your homework file here
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                      </p>
                      <label className="mt-4 inline-block">
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <Button type="button" variant="outline" size="sm">
                          Browse Files
                        </Button>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="uploadSubject">Subject</Label>
                      <Select>
                        <SelectTrigger id="uploadSubject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignmentTitle">Assignment Name</Label>
                      <Input
                        id="assignmentTitle"
                        placeholder="e.g., Chapter 5 Problems"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Homework
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewAssignment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newTitle">Assignment Title</Label>
                    <Input
                      id="newTitle"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter assignment title"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newSubject">Subject</Label>
                      <Select value={subject} onValueChange={setSubject} required>
                        <SelectTrigger id="newSubject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newDueDate">Due Date</Label>
                      <Input
                        id="newDueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Add Assignment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Homework;
