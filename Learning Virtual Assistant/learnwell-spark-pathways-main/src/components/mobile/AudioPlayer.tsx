
import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume1, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

interface AudioPlayerProps {
  audioUrl: string;
  onEnded?: () => void;
}

const AudioPlayer = ({ audioUrl, onEnded }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onEnded) onEnded();
    });
    
    audio.volume = volume / 100;
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl, onEnded]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-secondary/30 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-8 w-8 rounded-full p-0" 
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <div className="flex-1">
          <Progress value={progressPercent} className="h-2" />
        </div>
        
        <span className="text-xs text-muted-foreground min-w-[40px] text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-6 w-6 rounded-full p-0"
        >
          {volume === 0 ? (
            <VolumeX className="h-3 w-3" />
          ) : volume < 50 ? (
            <Volume1 className="h-3 w-3" />
          ) : (
            <Volume2 className="h-3 w-3" />
          )}
        </Button>
        
        <Slider
          value={[volume]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0])}
          className="w-20 h-2"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
