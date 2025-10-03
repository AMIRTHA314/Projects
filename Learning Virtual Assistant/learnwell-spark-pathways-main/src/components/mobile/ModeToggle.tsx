
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface ModeToggleProps {
  activeMode: "morning" | "night";
  onChange: (mode: "morning" | "night") => void;
}

const ModeToggle = ({ activeMode, onChange }: ModeToggleProps) => {
  return (
    <div className="bg-secondary rounded-full p-1 flex items-center">
      <Button
        size="sm"
        variant={activeMode === "morning" ? "default" : "ghost"}
        className={`rounded-full px-3 ${
          activeMode === "morning" ? "" : "text-muted-foreground"
        }`}
        onClick={() => onChange("morning")}
      >
        <Sun className="h-4 w-4 mr-1" />
        <span className="text-xs">Morning</span>
      </Button>
      
      <Button
        size="sm"
        variant={activeMode === "night" ? "default" : "ghost"}
        className={`rounded-full px-3 ${
          activeMode === "night" ? "" : "text-muted-foreground"
        }`}
        onClick={() => onChange("night")}
      >
        <Moon className="h-4 w-4 mr-1" />
        <span className="text-xs">Night</span>
      </Button>
    </div>
  );
};

export default ModeToggle;
