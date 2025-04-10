
import { useState, useEffect, useRef } from "react";
import { Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

type TaskTimerProps = {
  taskName?: string;
};

export function TaskTimer({ taskName = "Current Task" }: TaskTimerProps) {
  // 24 hours in seconds (24 * 60 * 60)
  const [timeLeft, setTimeLeft] = useState(86400); 
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load saved time from localStorage if available
    const savedTime = localStorage.getItem("dailyTimer");
    if (savedTime) {
      const parsedTime = parseInt(savedTime, 10);
      setTimeLeft(parsedTime > 0 ? parsedTime : 86400);
    }
    
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime <= 1 ? 86400 : prevTime - 1;
          // Save to localStorage
          localStorage.setItem("dailyTimer", newTime.toString());
          
          if (prevTime <= 1) {
            // Timer finished
            setIsActive(false);
            toast({
              title: "Daily Time Complete!",
              description: "Your 24-hour period has ended. Starting a new day!",
            });
          }
          return newTime;
        });
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    
    if (!isActive) {
      toast({
        title: "Daily Timer Started",
        description: `Tracking time for: ${taskName}`,
      });
    }
  };

  const resetTimer = () => {
    setTimeLeft(86400); // 24 hours
    setIsActive(false);
    localStorage.setItem("dailyTimer", "86400");
    toast({
      title: "Timer Reset",
      description: "Daily timer has been reset to 24 hours",
    });
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Calculate progress percentage for animation
  const progress = (timeLeft / 86400) * 100;

  return (
    <Card className="fixed top-20 right-4 z-50 shadow-lg w-auto bg-purple-900/60 backdrop-blur-sm border-purple-700/70 text-white animate-float">
      <div className="p-3 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">Daily Timer</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-white/10" 
            onClick={toggleTimer}
          >
            <span className="sr-only">Toggle Timer</span>
            <span className="text-xs">{isActive ? "Pause" : "Start"}</span>
          </Button>
        </div>
        
        <div className="text-center mb-1.5 relative">
          <span className="text-xl font-bold tracking-wider">{formatTime(timeLeft)}</span>
          <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
            <div 
              className="h-full bg-purple-400 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs opacity-70">{taskName}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-white/10 hover:scale-110 transition-transform" 
            onClick={resetTimer}
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
