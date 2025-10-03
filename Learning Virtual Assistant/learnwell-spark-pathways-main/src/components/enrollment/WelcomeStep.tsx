
import { useNavigate } from "react-router-dom";
import { StudentInfo } from "./EnrollmentWizard";
import MotivationalQuote from "../MotivationalQuote";

interface WelcomeStepProps {
  studentInfo: StudentInfo;
}

const WelcomeStep = ({ studentInfo }: WelcomeStepProps) => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    // Save student info to localStorage
    localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
    
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-3">
        <div className="inline-block p-4 bg-soft-purple/20 rounded-full mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-soft-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-foreground">Welcome, {studentInfo.fullName}!</h2>
        <p className="text-muted-foreground">Your personalized learning journey is ready.</p>
      </div>
      
      <div className="space-y-4">
        <div className="edu-card bg-soft-gray/50 border-none">
          <h3 className="font-medium mb-3">Your Profile</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Class:</span>
              <span className="font-medium">{studentInfo.class}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Board:</span>
              <span className="font-medium">{studentInfo.board}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Focus Subjects:</span>
              <span className="font-medium">{studentInfo.struggleSubjects.length}</span>
            </li>
          </ul>
        </div>
        
        <div>
          <MotivationalQuote />
        </div>
      </div>
      
      <div className="pt-4">
        <button 
          onClick={handleGetStarted}
          className="edu-button-primary w-full"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default WelcomeStep;
