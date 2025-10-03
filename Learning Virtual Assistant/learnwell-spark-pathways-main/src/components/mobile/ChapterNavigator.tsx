
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getMockBoards, getMockClasses, getMockSubjects, getMockChapters, getMockConcepts } from "@/data/mockRevisionData";
import AudioPlayer from "@/components/mobile/AudioPlayer";

const ChapterNavigator = () => {
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  
  const boards = getMockBoards();
  const classes = getMockClasses(selectedBoard);
  const subjects = getMockSubjects(selectedBoard, selectedClass);
  const chapters = getMockChapters(selectedBoard, selectedClass, selectedSubject);
  const concepts = getMockConcepts(selectedBoard, selectedClass, selectedSubject, selectedChapter);
  
  const resetSelections = (level: 'board' | 'class' | 'subject' | 'chapter' | 'all') => {
    if (level === 'board' || level === 'all') setSelectedBoard(null);
    if (level === 'class' || level === 'all') setSelectedClass(null);
    if (level === 'subject' || level === 'all') setSelectedSubject(null);
    if (level === 'chapter' || level === 'all') setSelectedChapter(null);
  };
  
  const renderNavigationLevel = () => {
    if (!selectedBoard) {
      return (
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Select Board</h3>
          {boards.map(board => (
            <Card key={board.id} className="hover:bg-accent transition-colors cursor-pointer">
              <CardContent className="p-4" onClick={() => setSelectedBoard(board.id)}>
                <div className="flex justify-between items-center">
                  <span>{board.name}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    } 
    
    if (!selectedClass) {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => resetSelections('board')}>
              Boards
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">Select Class</h3>
          </div>
          
          {classes.map(cls => (
            <Card key={cls.id} className="hover:bg-accent transition-colors cursor-pointer">
              <CardContent className="p-4" onClick={() => setSelectedClass(cls.id)}>
                <div className="flex justify-between items-center">
                  <span>Class {cls.name}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
    
    if (!selectedSubject) {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => resetSelections('board')}>
              Boards
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Button variant="ghost" size="sm" onClick={() => resetSelections('class')}>
              Class
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">Select Subject</h3>
          </div>
          
          {subjects.map(subject => (
            <Card key={subject.id} className="hover:bg-accent transition-colors cursor-pointer">
              <CardContent className="p-4" onClick={() => setSelectedSubject(subject.id)}>
                <div className="flex justify-between items-center">
                  <span>{subject.name}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
    
    if (!selectedChapter) {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Button variant="ghost" size="sm" onClick={() => resetSelections('board')}>
              Boards
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Button variant="ghost" size="sm" onClick={() => resetSelections('class')}>
              Class
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Button variant="ghost" size="sm" onClick={() => resetSelections('subject')}>
              {subjects.find(s => s.id === selectedSubject)?.name}
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">Select Chapter</h3>
          </div>
          
          {chapters.map(chapter => (
            <Card key={chapter.id} className="hover:bg-accent transition-colors cursor-pointer">
              <CardContent className="p-4" onClick={() => setSelectedChapter(chapter.id)}>
                <div className="flex justify-between items-center">
                  <span>{chapter.name}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
    
    // Display concepts
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => resetSelections('board')}>
            Boards
          </Button>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Button variant="ghost" size="sm" onClick={() => resetSelections('class')}>
            Class
          </Button>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Button variant="ghost" size="sm" onClick={() => resetSelections('subject')}>
            {subjects.find(s => s.id === selectedSubject)?.name}
          </Button>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Button variant="ghost" size="sm" onClick={() => resetSelections('chapter')}>
            Chapter
          </Button>
        </div>
        
        <h3 className="text-lg font-medium mb-4">
          {chapters.find(c => c.id === selectedChapter)?.name}
        </h3>
        
        <div className="space-y-4">
          {concepts.map(concept => (
            <Card key={concept.id} className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">{concept.title}</h4>
                <p className="text-sm text-muted-foreground">{concept.content}</p>
                
                <Separator className="my-3" />
                
                <AudioPlayer audioUrl={concept.audioUrl} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      {renderNavigationLevel()}
    </div>
  );
};

export default ChapterNavigator;
