
import { useState } from "react";
import PersonalInfoStep from "./PersonalInfoStep";
import InterestsStep from "./InterestsStep";
import SubjectsStep from "./SubjectsStep";
import GoalsStep from "./GoalsStep";
import WelcomeStep from "./WelcomeStep";
import ProgressBar from "./ProgressBar";

export type StudentInfo = {
  fullName: string;
  class: string;
  board: string;
  interests: string[];
  struggleSubjects: string[];
  targetMarks: Record<string, number>;
};

export const EnrollmentWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    fullName: "",
    class: "",
    board: "",
    interests: [],
    struggleSubjects: [],
    targetMarks: {}
  });

  const updateStudentInfo = (data: Partial<StudentInfo>) => {
    setStudentInfo({ ...studentInfo, ...data });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    { id: 1, component: <PersonalInfoStep studentInfo={studentInfo} updateStudentInfo={updateStudentInfo} onNext={nextStep} /> },
    { id: 2, component: <InterestsStep studentInfo={studentInfo} updateStudentInfo={updateStudentInfo} onNext={nextStep} onBack={prevStep} /> },
    { id: 3, component: <SubjectsStep studentInfo={studentInfo} updateStudentInfo={updateStudentInfo} onNext={nextStep} onBack={prevStep} /> },
    { id: 4, component: <GoalsStep studentInfo={studentInfo} updateStudentInfo={updateStudentInfo} onNext={nextStep} onBack={prevStep} /> },
    { id: 5, component: <WelcomeStep studentInfo={studentInfo} /> }
  ];

  const currentStepComponent = steps.find(step => step.id === currentStep)?.component;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
        </div>
        <div className="edu-card animate-fade-in">
          {currentStepComponent}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentWizard;
