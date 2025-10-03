
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import AudioPlayer from "@/components/mobile/AudioPlayer";
import { getMockRevisions } from "@/data/mockRevisionData";
import { REVISION_MODES } from "@/config/revisionConfig";

interface RevisionFeedProps {
  mode: "morning" | "night";
}

const RevisionFeed = ({ mode }: RevisionFeedProps) => {
  const revisions = getMockRevisions(mode);
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  const handlePlayAll = () => {
    if (revisions.length > 0) {
      setPlayingId(revisions[0].id);
    }
  };
  
  const getRevisionModeDescription = () => {
    return mode === REVISION_MODES.MORNING 
      ? "Quick recap for your day" 
      : "Relax and reinforce before sleep";
  };
  
  const handleRevisionEnd = () => {
    if (!playingId) return;
    
    const currentIndex = revisions.findIndex(r => r.id === playingId);
    if (currentIndex < revisions.length - 1) {
      setPlayingId(revisions[currentIndex + 1].id);
    } else {
      setPlayingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm text-muted-foreground">
          {getRevisionModeDescription()}
        </h3>
        <Button 
          size="sm" 
          onClick={handlePlayAll}
          className="bg-primary text-primary-foreground rounded-full px-4"
        >
          <Play className="h-3.5 w-3.5 mr-1" />
          <span className="text-xs">Play All</span>
        </Button>
      </div>

      <div className="space-y-4">
        {revisions.map((revision) => (
          <Card key={revision.id} className="overflow-hidden border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{revision.title}</h4>
                  <p className="text-xs text-muted-foreground">{revision.subject}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="rounded-full h-8 w-8 p-0"
                  onClick={() => setPlayingId(revision.id === playingId ? null : revision.id)}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm mt-2">{revision.content}</p>
              
              {playingId === revision.id && (
                <div className="mt-3">
                  <AudioPlayer 
                    audioUrl={revision.audioUrl} 
                    onEnded={handleRevisionEnd}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RevisionFeed;
