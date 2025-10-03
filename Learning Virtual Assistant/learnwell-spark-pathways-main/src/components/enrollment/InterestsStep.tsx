
import { StudentInfo } from "./EnrollmentWizard";

interface InterestsStepProps {
  studentInfo: StudentInfo;
  updateStudentInfo: (data: Partial<StudentInfo>) => void;
  onNext: () => void;
  onBack: () => void;
}

const InterestsStep = ({ studentInfo, updateStudentInfo, onNext, onBack }: InterestsStepProps) => {
  const interests = [
    "Cricket", "Music", "Mythology", "Movies", "Reading", 
    "Dancing", "Drawing", "Science Experiments", "Coding", 
    "Video Games", "Nature", "Cooking", "Photography", "Chess"
  ];

  const toggleInterest = (interest: string) => {
    const newInterests = studentInfo.interests.includes(interest)
      ? studentInfo.interests.filter(i => i !== interest)
      : [...studentInfo.interests, interest];
    
    updateStudentInfo({ interests: newInterests });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">What Are Your Interests?</h2>
        <p className="text-muted-foreground">Select activities you enjoy (helps us personalize your learning)</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {interests.map((interest) => (
          <div
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
              studentInfo.interests.includes(interest)
                ? "bg-soft-purple text-white border-soft-purple"
                : "bg-white dark:bg-card border-border hover:border-soft-purple"
            }`}
          >
            <div className="text-sm font-medium text-center">{interest}</div>
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
          onClick={onNext} 
          className="edu-button-primary flex-1"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default InterestsStep;
