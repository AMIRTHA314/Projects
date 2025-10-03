
import { useState } from "react";
import { StudentInfo } from "./EnrollmentWizard";
import { EDUCATION_BOARDS, AVAILABLE_CLASSES } from "@/config/revisionConfig";

interface PersonalInfoStepProps {
  studentInfo: StudentInfo;
  updateStudentInfo: (data: Partial<StudentInfo>) => void;
  onNext: () => void;
}

const PersonalInfoStep = ({ studentInfo, updateStudentInfo, onNext }: PersonalInfoStepProps) => {
  const [errors, setErrors] = useState({
    fullName: "",
    class: "",
    board: ""
  });

  // Auto-select CBSE as default if not already set
  if (!studentInfo.board) {
    updateStudentInfo({ board: EDUCATION_BOARDS[0].id });
  }

  const validate = () => {
    const newErrors = {
      fullName: !studentInfo.fullName ? "Name is required" : "",
      class: !studentInfo.class ? "Please select your class" : "",
      board: !studentInfo.board ? "Please select your board" : ""
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to EduCare</h2>
        <p className="text-muted-foreground">Let's start by getting to know you better</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="edu-input w-full"
            placeholder="Enter your full name"
            value={studentInfo.fullName}
            onChange={(e) => updateStudentInfo({ fullName: e.target.value })}
          />
          {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="class" className="block text-sm font-medium">
            Class
          </label>
          <select
            id="class"
            className="edu-input w-full"
            value={studentInfo.class}
            onChange={(e) => updateStudentInfo({ class: e.target.value })}
          >
            <option value="">Select your class</option>
            {AVAILABLE_CLASSES.map((classOption) => (
              <option key={classOption.id} value={classOption.id}>
                Class {classOption.name}
              </option>
            ))}
          </select>
          {errors.class && <p className="text-destructive text-xs mt-1">{errors.class}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="board" className="block text-sm font-medium">
            Board
          </label>
          <div className="edu-input w-full flex items-center px-4 py-2 cursor-not-allowed bg-muted/50">
            {EDUCATION_BOARDS[0].name}
          </div>
          <input 
            type="hidden" 
            id="board" 
            value={EDUCATION_BOARDS[0].id}
            onChange={(e) => updateStudentInfo({ board: e.target.value })}
          />
        </div>

        <div className="pt-4">
          <button type="submit" className="edu-button-primary w-full">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoStep;
