import React, { useState, useRef } from "react";
import { Mic, MicOff, MessageSquare, Type } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AI_RESPONSES } from "@/config/revisionConfig";

interface DoubtAskerProps {
  subject: string;
  chapter: string;
  concept: string;
}

const DoubtAsker = ({ subject, chapter, concept }: DoubtAskerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"voice" | "text">("text");
  const [doubt, setDoubt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // For voice recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const handleToggleMode = () => {
    setMode(mode === "voice" ? "text" : "voice");
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        toast({
          title: "Voice recorded",
          description: "Your doubt has been recorded. In a full implementation, this would be transcribed and processed."
        });
        
        // Simulate AI response after recording
        handleSubmitDoubt();
        
        // Clean up the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice input feature.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const handleSubmitDoubt = () => {
    if (mode === "text" && !doubt.trim()) {
      toast({
        title: "Empty doubt",
        description: "Please type your doubt before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      // Use the configuration for responses
      const responseKey = `${subject}-${concept}`;
      let aiResponse = AI_RESPONSES[responseKey as keyof typeof AI_RESPONSES] || AI_RESPONSES.default;
      
      // Replace placeholders if using the default response
      if (aiResponse === AI_RESPONSES.default) {
        aiResponse = aiResponse.replace("{concept}", concept).replace("{subject}", subject);
      }
      
      setResponse(aiResponse);
      setIsLoading(false);
      
      // Award XP for asking a doubt
      toast({
        title: "Doubt addressed!",
        description: "You earned +5 XP for asking a question.",
      });
      
    }, 1500);
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setDoubt("");
    setResponse("");
    if (isRecording) {
      stopRecording();
    }
  };
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm px-4 py-2 rounded-lg bg-soft-purple/20 hover:bg-soft-purple/30 transition-colors flex-1 flex items-center justify-center gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        Ask a Doubt
      </button>
    );
  }
  
  return (
    <div className="bg-white dark:bg-card rounded-lg border border-border p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Ask Your Doubt</h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleToggleMode}
            className="text-xs h-8"
          >
            {mode === "voice" ? (
              <>
                <Type className="h-3 w-3 mr-1" />
                Switch to Text
              </>
            ) : (
              <>
                <Mic className="h-3 w-3 mr-1" />
                Switch to Voice
              </>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleClose}
            className="h-8"
          >
            Close
          </Button>
        </div>
      </div>
      
      {/* Voice mode */}
      {mode === "voice" && (
        <div className="bg-muted/50 rounded-lg p-4 text-center mb-4">
          <div 
            className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center cursor-pointer ${
              isRecording ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-soft-purple/20 text-soft-purple'
            }`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? 
              <MicOff className="h-6 w-6" /> : 
              <Mic className="h-6 w-6" />
            }
          </div>
          <p className="text-sm text-muted-foreground">
            {isRecording 
              ? "Recording... Click to stop" 
              : "Click the microphone to start recording your doubt"}
          </p>
        </div>
      )}
      
      {/* Text mode */}
      {mode === "text" && (
        <div className="mb-4">
          <Textarea
            placeholder={`What's your doubt about ${concept}?`}
            className="mb-3"
            value={doubt}
            onChange={(e) => setDoubt(e.target.value)}
          />
          <Button 
            onClick={handleSubmitDoubt}
            disabled={!doubt.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Ask Doubt"}
          </Button>
        </div>
      )}
      
      {/* Response area */}
      {response && (
        <div className="mt-4 bg-soft-purple/10 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Answer:</h4>
          <p className="text-sm">{response}</p>
        </div>
      )}
    </div>
  );
};

export default DoubtAsker;
