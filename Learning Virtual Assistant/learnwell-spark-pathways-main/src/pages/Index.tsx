
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EnrollmentWizard from "@/components/enrollment/EnrollmentWizard";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user has already enrolled
    const studentInfo = localStorage.getItem("studentInfo");
    if (studentInfo) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return <EnrollmentWizard />;
};

export default Index;
