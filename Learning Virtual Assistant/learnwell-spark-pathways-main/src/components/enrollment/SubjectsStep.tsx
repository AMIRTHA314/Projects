
import { useState } from "react";
import { StudentInfo } from "./EnrollmentWizard";

interface SubjectsStepProps {
  studentInfo: StudentInfo;
  updateStudentInfo: (data: Partial<StudentInfo>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SubjectsStep = ({ studentInfo, updateStudentInfo, onNext, onBack }: SubjectsStepProps) => {
  const [error, setError] = useState("");
  
  const subjects = [
    "Mathematics", "Science", "Social Science", "English", 
    "Hindi", "Tamil", "Physics", "Chemistry", "Biology", 
    "Computer Science", "Economics", "Business Studies"
  ];

  // Filter subjects based on class (show more advanced subjects for higher classes)
  const filteredSubjects = subjects.filter(subject => {
    const classNum = parseInt(studentInfo.class);
    if (classNum <= 10) {
      return !["Physics", "Chemistry", "Biology", "Economics", "Business Studies"].includes(subject);
    }
    return true;
  });

  const toggleSubject = (subject: string) => {
    const newSubjects = studentInfo.struggleSubjects.includes(subject)
      ? studentInfo.struggleSubjects.filter(s => s !== subject)
      : [...studentInfo.struggleSubjects, subject];
    
    updateStudentInfo({ struggleSubjects: newSubjects });
    
    if (newSubjects.length > 0) {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (studentInfo.struggleSubjects.length === 0) {
      setError("Please select at least one subject");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Subjects You Want to Improve</h2>
        <p className="text-muted-foreground">Select subjects you need more support with</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filteredSubjects.map((subject) => (
          <div
            key={subject}
            onClick={() => toggleSubject(subject)}
            className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
              studentInfo.struggleSubjects.includes(subject)
                ? "bg-soft-purple text-white border-soft-purple"
                : "bg-white dark:bg-card border-border hover:border-soft-purple"
            }`}
          >
            <div className="text-sm font-medium text-center">{subject}</div>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-destructive text-xs text-center">{error}</p>
      )}

      <div className="pt-4 flex gap-3">
        <button 
          type="button" 
          onClick={onBack} 
          className="edu-button-secondary flex-1"
        >
          Back
        </button>
        <button 
          type="button" 
          onClick={handleSubmit} 
          className="edu-button-primary flex-1"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SubjectsStep;
