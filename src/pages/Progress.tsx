
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, TrendingUp, Target, Clock, Award } from "lucide-react";

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const progressData = {
    week: {
      completed: 75,
      tasks: 12,
      totalTasks: 16,
      streakDays: 5,
      achievements: 3
    },
    month: {
      completed: 68,
      tasks: 45,
      totalTasks: 66,
      streakDays: 23,
      achievements: 8
    },
    year: {
      completed: 72,
      tasks: 234,
      totalTasks: 325,
      streakDays: 89,
      achievements: 24
    }
  };

  const currentData = progressData[selectedPeriod as keyof typeof progressData];

  const achievements = [
    { id: 1, title: "First Week Complete", description: "Completed your first week of tasks", earned: true },
    { id: 2, title: "Streak Master", description: "Maintained a 7-day streak", earned: true },
    { id: 3, title: "Goal Crusher", description: "Exceeded weekly goals", earned: true },
    { id: 4, title: "Monthly Champion", description: "Complete 30 days of tasks", earned: false },
    { id: 5, title: "Perfectionist", description: "100% completion rate for a week", earned: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Progress Tracking</h1>
        <p className="text-muted-foreground">
          Monitor your achievements and track your learning journey
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.completed}%</div>
                <Progress value={currentData.completed} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {currentData.tasks} of {currentData.totalTasks} tasks completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.streakDays}</div>
                <p className="text-xs text-muted-foreground">
                  Days in a row
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.achievements}</div>
                <p className="text-xs text-muted-foreground">
                  Badges earned this {selectedPeriod}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.earned ? "border-green-500" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    {achievement.earned ? (
                      <Badge variant="default" className="bg-green-500">
                        <Award className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    ) : (
                      <Badge variant="outline">Locked</Badge>
                    )}
                  </div>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>Your learning patterns and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Daily Tasks</span>
                  <span className="text-sm text-muted-foreground">2.3 tasks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Most Productive Day</span>
                  <span className="text-sm text-muted-foreground">Tuesday</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Favorite Category</span>
                  <span className="text-sm text-muted-foreground">Learning</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Time Spent</span>
                  <span className="text-sm text-muted-foreground">42h 15m this month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
