
import { StudentInfo } from "./EnrollmentWizard";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface GoalsStepProps {
  studentInfo: StudentInfo;
  updateStudentInfo: (data: Partial<StudentInfo>) => void;
  onNext: () => void;
  onBack: () => void;
}

const GoalsStep = ({ studentInfo, updateStudentInfo, onNext, onBack }: GoalsStepProps) => {
  // Initialize current marks for each selected subject
  const [currentMarks, setCurrentMarks] = useState<Record<string, number>>(() => {
    const initialMarks: Record<string, number> = {};
    
    studentInfo.struggleSubjects.forEach(subject => {
      initialMarks[subject] = studentInfo.targetMarks[subject] || 75; // Default to 75%
    });
    
    return initialMarks;
  });

  const handleSliderChange = (subject: string, value: number[]) => {
    const newCurrentMarks = { ...currentMarks, [subject]: value[0] };
    setCurrentMarks(newCurrentMarks);
  };

  const handleSubmit = () => {
    updateStudentInfo({ targetMarks: currentMarks });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Current Marks</h2>
        <p className="text-muted-foreground">For each subject, choose the current marks you achieve</p>
      </div>

      <div className="space-y-6">
        {studentInfo.struggleSubjects.map((subject) => (
          <div key={subject} className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">{subject}</label>
              <span className="text-sm font-bold text-soft-purple">{currentMarks[subject]}%</span>
            </div>
            <Slider
              defaultValue={[currentMarks[subject]]}
              min={50}
              max={100}
              step={1}
              className="py-4"
              onValueChange={(value) => handleSliderChange(subject, value)}
            />
          </div>
        ))}
      </div>

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
          Complete Setup
        </button>
      </div>
    </div>
  );
};

export default GoalsStep;
