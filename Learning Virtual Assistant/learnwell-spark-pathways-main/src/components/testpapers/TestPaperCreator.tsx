
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileUp, FilePlus, Book, Printer } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { getMockSubjects, getMockChapters, getMockConcepts } from "@/data/mockRevisionData";

const TestPaperCreator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("create");
  const [subject, setSubject] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");
  const [concept, setConcept] = useState<string>("");
  const [totalMarks, setTotalMarks] = useState<string>("100");
  const [duration, setDuration] = useState<string>("180");
  const [customQuestions, setCustomQuestions] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [answerFile, setAnswerFile] = useState<File | null>(null);
  const [uploadSubject, setUploadSubject] = useState<string>("");
  const [paperMarks, setPaperMarks] = useState<string>("100");
  const [selectedTestPaper, setSelectedTestPaper] = useState<string>("");

  // Mock data
  const boardId = "cbse";
  const classId = "10"; // Default to Class 10
  const subjects = getMockSubjects(boardId, classId);
  const chapters = getMockChapters(boardId, classId, subject);
  const concepts = getMockConcepts(boardId, classId, subject, chapter);

  const handleCreateTestPaper = () => {
    if (!subject) {
      toast({
        title: "Subject Required",
        description: "Please select a subject for the test paper",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to generate or save the test paper
    console.log("Creating test paper for:", {
      subject,
      chapter,
      concept,
      totalMarks,
      duration,
      customQuestions,
    });

    toast({
      title: "Test Paper Created",
      description: `Test paper for ${subjects.find(s => s.id === subject)?.name || subject} has been created successfully.`,
    });
  };

  const handlePrintTestPaper = () => {
    if (!subject) {
      toast({
        title: "Subject Required",
        description: "Please select a subject to print a test paper",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would generate a PDF and open the print dialog
    toast({
      title: "Preparing Test Paper",
      description: "Your test paper is being prepared for printing...",
    });

    // Simulate PDF generation delay, then open print dialog
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFileFn: (file: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      setFileFn(e.target.files[0]);
    }
  };

  const handleUploadPaper = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "File Required",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would handle file upload
    toast({
      title: "Test Paper Uploaded",
      description: `The test paper "${selectedFile.name}" has been uploaded successfully.`,
    });
  };

  const handleAnswerEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answerFile) {
      toast({
        title: "Answer Script Required",
        description: "Please select an answer script to evaluate",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTestPaper) {
      toast({
        title: "Test Paper Required",
        description: "Please select the test paper for this answer script",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would handle file upload and AI evaluation
    toast({
      title: "Answer Script Received",
      description: `The answer script "${answerFile.name}" will be evaluated and results will be available soon.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white dark:bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">Test Paper Creator</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Create customized test papers for your child based on specific subjects and chapters
          </p>
        </div>

        <Tabs
          defaultValue="create"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="create">Create Test Paper</TabsTrigger>
            <TabsTrigger value="upload">Upload Test Paper</TabsTrigger>
            <TabsTrigger value="evaluate">Evaluate Answers</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject (Required)</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger id="subject">
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
                    <Label htmlFor="chapter">Chapter (Optional)</Label>
                    <Select
                      value={chapter}
                      onValueChange={setChapter}
                      disabled={!subject}
                    >
                      <SelectTrigger id="chapter">
                        <SelectValue placeholder="Select chapter" />
                      </SelectTrigger>
                      <SelectContent>
                        {chapters.map((chapter) => (
                          <SelectItem key={chapter.id} value={chapter.id}>
                            {chapter.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="concept">Topic (Optional)</Label>
                    <Select
                      value={concept}
                      onValueChange={setConcept}
                      disabled={!chapter}
                    >
                      <SelectTrigger id="concept">
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {concepts.map((concept) => (
                          <SelectItem key={concept.id} value={concept.id}>
                            {concept.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalMarks">Total Marks</Label>
                    <Input
                      id="totalMarks"
                      type="number"
                      value={totalMarks}
                      onChange={(e) => setTotalMarks(e.target.value)}
                      min="10"
                      step="5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="30"
                    step="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customQuestions">
                    Custom Questions (Optional)
                  </Label>
                  <Textarea
                    id="customQuestions"
                    value={customQuestions}
                    onChange={(e) => setCustomQuestions(e.target.value)}
                    placeholder="Add specific questions you want included..."
                    className="min-h-32"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleCreateTestPaper}
                    className="w-full"
                    disabled={!subject}
                  >
                    <FilePlus className="mr-2 h-4 w-4" />
                    Generate Test Paper
                  </Button>
                  
                  <Button
                    onClick={handlePrintTestPaper}
                    variant="secondary"
                    className="w-full"
                    disabled={!subject}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Test Paper
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleUploadPaper} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paperUpload">Upload Test Paper</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">
                        {selectedFile ? selectedFile.name : "Drag & drop your test paper file here"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Supports PDF, DOC, DOCX (Max 10MB)
                      </p>
                      <label className="mt-4 inline-block">
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, setSelectedFile)}
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
                      <Select value={uploadSubject} onValueChange={setUploadSubject}>
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
                      <Label htmlFor="paperMarks">Total Marks</Label>
                      <Input
                        id="paperMarks"
                        type="number"
                        value={paperMarks}
                        onChange={(e) => setPaperMarks(e.target.value)}
                        min="10"
                        step="5"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={!selectedFile}>
                    Upload Test Paper
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluate" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleAnswerEvaluation} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="answerScriptUpload">
                      Upload Answer Script
                    </Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">
                        {answerFile ? answerFile.name : "Drag & drop answer script here"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Supports PDF, JPG, PNG (Max 20MB)
                      </p>
                      <label className="mt-4 inline-block">
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, setAnswerFile)}
                        />
                        <Button type="button" variant="outline" size="sm">
                          Browse Files
                        </Button>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="selectTestPaper">Select Test Paper</Label>
                    <Select value={selectedTestPaper} onValueChange={setSelectedTestPaper}>
                      <SelectTrigger id="selectTestPaper">
                        <SelectValue placeholder="Select test paper" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test1">
                          Mathematics Test - Class 10
                        </SelectItem>
                        <SelectItem value="test2">
                          Physics Test - Forces and Motion
                        </SelectItem>
                        <SelectItem value="test3">
                          Chemistry Test - Periodic Table
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={!answerFile || !selectedTestPaper}>
                    <Book className="mr-2 h-4 w-4" />
                    Evaluate Answer Script
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

export default TestPaperCreator;
