
// Mock data service for the revision app
import {
  EDUCATION_BOARDS,
  AVAILABLE_CLASSES,
  SUBJECTS,
  CHAPTERS_BY_SUBJECT,
  CONCEPTS_BY_CHAPTER,
  MORNING_REVISIONS,
  NIGHT_REVISIONS
} from "@/config/revisionConfig";

// Mock revision cards
export const getMockRevisions = (mode: "morning" | "night") => {
  // This could be replaced with an API call like:
  // return api.get(`/revisions/${mode}`);
  return mode === "morning" ? MORNING_REVISIONS : NIGHT_REVISIONS;
};

// Mock boards (education systems)
export const getMockBoards = () => {
  // This could be replaced with an API call like:
  // return api.get('/boards');
  return EDUCATION_BOARDS;
};

// Mock classes
export const getMockClasses = (boardId: string | null) => {
  if (!boardId) return [];
  // This could be replaced with an API call like:
  // return api.get(`/boards/${boardId}/classes`);
  return AVAILABLE_CLASSES;
};

// Mock subjects
export const getMockSubjects = (boardId: string | null, classId: string | null) => {
  if (!boardId || !classId) return [];
  // This could be replaced with an API call like:
  // return api.get(`/boards/${boardId}/classes/${classId}/subjects`);
  return SUBJECTS;
};

// Mock chapters
export const getMockChapters = (
  boardId: string | null, 
  classId: string | null, 
  subjectId: string | null
) => {
  if (!boardId || !classId || !subjectId) return [];
  
  // This could be replaced with an API call like:
  // return api.get(`/boards/${boardId}/classes/${classId}/subjects/${subjectId}/chapters`);
  return CHAPTERS_BY_SUBJECT[subjectId as keyof typeof CHAPTERS_BY_SUBJECT] || [];
};

// Mock concepts
export const getMockConcepts = (
  boardId: string | null, 
  classId: string | null, 
  subjectId: string | null,
  chapterId: string | null
) => {
  if (!boardId || !classId || !subjectId || !chapterId) return [];
  
  // This could be replaced with an API call like:
  // return api.get(`/boards/${boardId}/classes/${classId}/subjects/${subjectId}/chapters/${chapterId}/concepts`);
  return CONCEPTS_BY_CHAPTER[chapterId as keyof typeof CONCEPTS_BY_CHAPTER] || [
    {
      id: "concept1",
      title: "Sample Concept",
      content: "This is a placeholder concept for this chapter.",
      audioUrl: "/placeholder.svg"
    }
  ];
};

// Mock homework assignments (could be moved to API)
export const getMockHomeworkAssignments = (studentId: string) => {
  // This could be replaced with an API call like:
  // return api.get(`/students/${studentId}/homework`);
  return [
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
    }
  ];
};

// Mock test papers (could be moved to API)
export const getMockTestPapers = (teacherId: string) => {
  // This could be replaced with an API call like:
  // return api.get(`/teachers/${teacherId}/test-papers`);
  return [
    {
      id: "1",
      title: "Mathematics Mid-Term",
      subject: "mathematics",
      totalMarks: 100,
      duration: 180, // minutes
      createdAt: "2025-05-10"
    },
    {
      id: "2",
      title: "Physics Forces Quiz",
      subject: "physics",
      totalMarks: 50,
      duration: 60, // minutes
      createdAt: "2025-05-15"
    }
  ];
};
