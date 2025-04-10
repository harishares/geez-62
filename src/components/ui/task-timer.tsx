
import { useState, useEffect, useRef } from "react";
import { Clock, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

type TaskTimerProps = {
  taskName?: string;
};

export function TaskTimer({ taskName = "Current Task" }: TaskTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState<"focus" | "break">("focus");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            // Timer finished
            setIsActive(false);
            toast({
              title: `${timerType === "focus" ? "Focus" : "Break"} Time Complete!`,
              description: timerType === "focus" 
                ? "Take a break now." 
                : "Ready to start focusing again?",
            });
            // Auto switch to other timer type when done
            setTimerType(timerType === "focus" ? "break" : "focus");
            // Set new time based on type
            return timerType === "focus" ? 5 * 60 : 25 * 60; // 5 min break, 25 min focus
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timerType]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    
    if (!isActive && timeLeft === (timerType === "focus" ? 25 * 60 : 5 * 60)) {
      toast({
        title: `${timerType === "focus" ? "Focus" : "Break"} Timer Started`,
        description: timerType === "focus" 
          ? `Focusing on: ${taskName}` 
          : "Taking a short break",
      });
    }
  };

  const resetTimer = () => {
    setTimeLeft(timerType === "focus" ? 25 * 60 : 5 * 60);
    setIsActive(false);
    toast({
      title: "Timer Reset",
      description: `${timerType === "focus" ? "Focus" : "Break"} timer has been reset`,
    });
  };

  const toggleTimerType = () => {
    const newType = timerType === "focus" ? "break" : "focus";
    setTimerType(newType);
    setTimeLeft(newType === "focus" ? 25 * 60 : 5 * 60);
    setIsActive(false);
    toast({
      title: `Switched to ${newType === "focus" ? "Focus" : "Break"} Time`,
      description: `Now in ${newType} mode.`,
    });
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Calculate progress percentage for animation
  const totalTime = timerType === "focus" ? 25 * 60 : 5 * 60;
  const progress = (timeLeft / totalTime) * 100;

  return (
    <Card className={`fixed top-20 right-4 z-50 shadow-lg w-auto ${timerType === "focus" ? "bg-purple-900/60" : "bg-blue-900/60"} backdrop-blur-sm border-${timerType === "focus" ? "purple" : "blue"}-700/70 text-white animate-float`}>
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
        
        <div className="text-center mb-1.5 relative">
          <span className="text-xl font-bold tracking-wider">{formatTime(timeLeft)}</span>
          <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
            <div 
              className={`h-full ${timerType === "focus" ? "bg-purple-400" : "bg-blue-400"} transition-all duration-1000 ease-linear`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-1 hover:bg-white/10 hover:scale-110 transition-transform" 
            onClick={toggleTimer}
          >
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-1 hover:bg-white/10 hover:scale-110 transition-transform" 
            onClick={resetTimer}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
