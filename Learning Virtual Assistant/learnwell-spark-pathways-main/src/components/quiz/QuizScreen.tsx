
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const QuizScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subject = location.state?.subject || "Mathematics";
  const chapter = location.state?.chapter || "Algebra";
  const concept = location.state?.concept || "Linear Equations";
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // Mock quiz questions based on subject
  const questions: QuizQuestion[] = [
    {
      question: "What is the solution to the linear equation 2x + 3 = 9?",
      options: ["x = 2", "x = 3", "x = 6", "x = 12"],
      correctAnswer: 1
    },
    {
      question: "In the equation y = mx + c, what does 'm' represent?",
      options: ["y-intercept", "x-intercept", "Slope", "No specific meaning"],
      correctAnswer: 2
    },
    {
      question: "Which of the following represents a linear equation?",
      options: ["y = x²", "y = 3x + 2", "y = 1/x", "y = x³"],
      correctAnswer: 1
    }
  ];
  
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };
  
  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white dark:bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-lg font-bold">{subject}: {concept} Quiz</h1>
          <p className="text-sm text-muted-foreground">{chapter}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!showResults ? (
            <div className="edu-card">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <p className="text-sm font-medium">
                  Score: {score}
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-6">{questions[currentQuestion].question}</h2>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedOption === index
                          ? "bg-soft-purple text-white border-soft-purple"
                          : "bg-white dark:bg-card hover:border-soft-purple"
                      }`}
                    >
                      <span className="mr-3 inline-block w-6 h-6 text-xs rounded-full bg-soft-gray/50 flex items-center justify-center">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className={`w-full rounded-xl px-6 py-3 font-medium transition-all ${
                  selectedOption !== null
                    ? "edu-button-primary"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
              </button>
            </div>
          ) : (
            <div className="edu-card text-center">
              <div className="mb-6">
                <div className="inline-block p-6 rounded-full bg-soft-purple/20 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-soft-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Quiz Complete!</h2>
                <p className="text-muted-foreground mt-2">
                  You scored {score} out of {questions.length}
                </p>
                
                <div className="mt-8 p-6 bg-soft-gray/30 rounded-xl">
                  <p className="text-lg font-medium mb-2">Your performance</p>
                  <div className="text-4xl font-bold text-soft-purple">
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleFinish}
                className="edu-button-primary"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizScreen;
