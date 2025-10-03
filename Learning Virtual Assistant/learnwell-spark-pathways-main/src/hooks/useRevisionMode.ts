
import { useState, useEffect } from "react";

type RevisionMode = "morning" | "night";

export const useRevisionMode = () => {
  const [mode, setMode] = useState<RevisionMode>("morning");
  
  useEffect(() => {
    // Automatically set mode based on time of day
    const currentHour = new Date().getHours();
    
    // Morning: 5 AM - 6 PM, Night: 6 PM - 5 AM
    if (currentHour >= 5 && currentHour < 18) {
      setMode("morning");
    } else {
      setMode("night");
    }
  }, []);
  
  return {
    mode,
    setMode,
    isMorning: mode === "morning",
    isNight: mode === "night",
  };
};
