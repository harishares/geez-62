
import { ArrowUpRight, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Sample data
const goals = [
  {
    id: 1,
    name: "Run 20km weekly",
    target: 20,
    current: 12.5,
    unit: "km",
    endDate: "Apr 14, 2025",
  },
  {
    id: 2,
    name: "30 Swimming sessions",
    target: 30,
    current: 8,
    unit: "sessions",
    endDate: "Jun 30, 2025",
  },
  {
    id: 3,
    name: "Improve 5K time",
    target: 25,
    current: 28,
    unit: "min",
    endDate: "May 20, 2025",
    isTimeReduction: true,
  },
];

export function GoalProgress() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Goals</CardTitle>
            <CardDescription>Track your progress towards your targets</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {goals.map((goal) => {
            const percentage = goal.isTimeReduction
              ? 100 - (goal.current / goal.target) * 100
              : (goal.current / goal.target) * 100;
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-sm">{goal.name}</h4>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Due {goal.endDate}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>
                      {goal.current} {goal.unit}
                    </span>
                    <span className="text-muted-foreground">
                      {goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">
                    {goal.isTimeReduction 
                      ? `${goal.target - goal.current > 0 ? '-' : '+'} ${Math.abs(goal.target - goal.current)} min to target` 
                      : `${goal.target - goal.current} ${goal.unit} remaining`}
                  </span>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary font-medium">
                    <span>Details</span>
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
