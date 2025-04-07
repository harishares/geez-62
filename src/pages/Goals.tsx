import { Check, Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

// Sample data for goals
const activeGoals = [
  {
    id: 1,
    name: "Run 20km weekly",
    description: "Maintain consistent running distance each week",
    target: 20,
    current: 12.5,
    unit: "km",
    endDate: "Apr 14, 2025",
    category: "running",
  },
  {
    id: 2,
    name: "30 Swimming sessions",
    description: "Complete 30 swimming workouts by end of June",
    target: 30,
    current: 8,
    unit: "sessions",
    endDate: "Jun 30, 2025",
    category: "swimming",
  },
  {
    id: 3,
    name: "Improve 5K time",
    description: "Reduce 5K run time to 25 minutes",
    target: 25,
    current: 28,
    unit: "min",
    endDate: "May 20, 2025",
    isTimeReduction: true,
    category: "running",
  },
  {
    id: 4,
    name: "1000km Cycling challenge",
    description: "Ride 1000km total distance by year end",
    target: 1000,
    current: 358,
    unit: "km",
    endDate: "Dec 31, 2025",
    category: "cycling",
  },
];

const completedGoals = [
  {
    id: 5,
    name: "First 10K Race",
    description: "Complete first official 10K race event",
    target: 1,
    current: 1,
    unit: "event",
    completedDate: "Mar 15, 2025",
    category: "running",
  },
  {
    id: 6,
    name: "50 Push-ups in one go",
    description: "Build strength to complete 50 consecutive pushups",
    target: 50,
    current: 50,
    unit: "reps",
    completedDate: "Feb 28, 2025",
    category: "strength",
  },
];

// Helper function to get the category badge color
const getCategoryColor = (category: string) => {
  const colors = {
    running: "bg-primary/10 text-primary border-primary/20",
    cycling: "bg-secondary/10 text-secondary border-secondary/20",
    swimming: "bg-accent/10 text-accent border-accent/20",
    strength: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };
  return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
};

export default function Goals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quest Log</h1>
          <p className="text-muted-foreground">
            Track your daily and personal quests
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Quest
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="active">Daily Quests</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="personal">Personal Quests</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {activeGoals.map((goal) => {
              const percentage = goal.isTimeReduction
                ? 100 - (goal.current / goal.target) * 100
                : (goal.current / goal.target) * 100;

              return (
                <Card key={goal.id} className="overflow-hidden border border-purple-800/40 bg-black/20 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between mb-1">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                          goal.category
                        )}`}
                      >
                        {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Due {goal.endDate}
                      </span>
                    </div>
                    <CardTitle>{goal.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {goal.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Checkbox id={`goal-${goal.id}`} className="mr-2" />
                          <label htmlFor={`goal-${goal.id}`} className="text-sm">Complete</label>
                        </div>
                        <div>
                          <span className="text-xl font-bold">{goal.current}</span>
                          <span className="text-muted-foreground text-sm ml-1">
                            / {goal.target} {goal.unit}
                          </span>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-border/40 pt-4 pb-4">
                    <Button variant="outline" size="sm" className="border-purple-500/30">
                      Update Progress
                    </Button>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
            
            <Card className="border-dashed flex items-center justify-center h-[300px] border-purple-800/40 bg-black/20 backdrop-blur-sm">
              <div className="text-center p-6">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg mb-2">Add New Quest</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a new quest to track
                </p>
                <Button>Create Quest</Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {completedGoals.map((goal) => (
              <Card key={goal.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between mb-1">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                        goal.category
                      )}`}
                    >
                      {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Completed {goal.completedDate}
                    </span>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    {goal.name}
                    <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-600" />
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {goal.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xl font-bold">{goal.target}</span>
                        <span className="text-muted-foreground text-sm ml-1">
                          {goal.unit}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        100% Complete
                      </span>
                    </div>
                    <Progress value={100} className="h-2 bg-muted" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4 pb-4">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
