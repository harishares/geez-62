
import { useState, useEffect, useRef } from "react";
import { Clock, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

type TaskTimerProps = {
  taskName?: string;
};

export function TaskTimer({ taskName = "Current Task" }: TaskTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState<"focus" | "break">("focus");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    
    if (!isActive && seconds === 0) {
      toast({
        title: "Timer Started",
        description: `Focusing on: ${taskName}`,
      });
    }
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
    toast({
      title: "Timer Reset",
      description: "Timer has been reset to 0:00",
    });
  };

  const toggleTimerType = () => {
    setTimerType(timerType === "focus" ? "break" : "focus");
    setSeconds(0);
    setIsActive(false);
    toast({
      title: `Switched to ${timerType === "focus" ? "Break" : "Focus"} Time`,
      description: `Now in ${timerType === "focus" ? "break" : "focus"} mode.`,
    });
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Card className={`fixed bottom-4 right-4 z-50 shadow-lg w-auto ${timerType === "focus" ? "bg-purple-900/60" : "bg-blue-900/60"} backdrop-blur-sm border-${timerType === "focus" ? "purple" : "blue"}-700/70 text-white`}>
      <div className="p-3 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">{timerType === "focus" ? "Focus Time" : "Break Time"}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-white/10" 
            onClick={toggleTimerType}
          >
            <span className="sr-only">Switch Timer Type</span>
            <span className="text-xs">{timerType === "focus" ? "Break" : "Focus"}</span>
          </Button>
        </div>
        
        <div className="text-center mb-1.5">
          <span className="text-xl font-bold tracking-wider">{formatTime(seconds)}</span>
        </div>
        
        <div className="flex justify-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-1 hover:bg-white/10" 
            onClick={toggleTimer}
          >
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-1 hover:bg-white/10" 
            onClick={resetTimer}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
