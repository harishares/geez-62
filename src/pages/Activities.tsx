
import { Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Activities() {
  // In a real app, activity data would come from state or API
  const activities = [
    {
      id: 1,
      type: "Running",
      date: "April 7, 2025",
      time: "7:30 AM",
      duration: "45 min",
      distance: "5.2 km",
      pace: "5:30 min/km",
      calories: "320",
      notes: "Morning run along the river path. Felt good!",
    },
    {
      id: 2,
      type: "Cycling",
      date: "April 6, 2025",
      time: "6:15 PM",
      duration: "1h 10min",
      distance: "20.5 km",
      pace: "17.5 km/h",
      calories: "450",
      notes: "Evening ride on the mountain trails. Beautiful sunset.",
    },
    {
      id: 3,
      type: "Swimming",
      date: "April 4, 2025",
      time: "8:00 AM",
      duration: "30 min",
      distance: "1 km",
      pace: "3:00 min/100m",
      calories: "280",
      notes: "Pool session focusing on technique. Made good progress.",
    },
    {
      id: 4,
      type: "Running",
      date: "April 2, 2025",
      time: "6:45 AM",
      duration: "50 min",
      distance: "6.5 km",
      pace: "5:10 min/km",
      calories: "380",
      notes: "Interval training in the park. Pushed hard on the sprints.",
    },
    {
      id: 5,
      type: "Weight Training",
      date: "April 1, 2025",
      time: "5:30 PM",
      duration: "55 min",
      sets: "15",
      reps: "120",
      calories: "340",
      notes: "Upper body day. Increased weight on bench press.",
    },
  ];

  const activityTypeColors = {
    Running: "bg-primary/10 text-primary border-primary/20",
    Cycling: "bg-secondary/10 text-secondary border-secondary/20",
    Swimming: "bg-accent/10 text-accent border-accent/20",
    "Weight Training": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activities</h1>
        <p className="text-muted-foreground">
          View and manage your tracked activities.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search activities..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Activity
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="running">Running</TabsTrigger>
            <TabsTrigger value="cycling">Cycling</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <div className="hidden sm:block">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="duration-desc">Longest duration</SelectItem>
                <SelectItem value="duration-asc">Shortest duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Activities</CardTitle>
              <CardDescription>
                Showing all of your tracked activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-0">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          activityTypeColors[
                            activity.type as keyof typeof activityTypeColors
                          ]
                        }`}
                      >
                        {activity.type}
                      </div>
                      <div>
                        <div className="font-medium">
                          {activity.date} • {activity.time}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                          {activity.notes}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-medium">{activity.duration}</p>
                      </div>
                      {activity.distance && (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">
                            Distance
                          </p>
                          <p className="font-medium">{activity.distance}</p>
                        </div>
                      )}
                      {activity.pace && (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Pace</p>
                          <p className="font-medium">{activity.pace}</p>
                        </div>
                      )}
                      {activity.sets && (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Sets</p>
                          <p className="font-medium">{activity.sets}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="running" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Running Activities</CardTitle>
              <CardDescription>
                Showing only your running sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                Similar layout to All Activities tab, but filtered for Running only
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cycling" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cycling Activities</CardTitle>
              <CardDescription>
                Showing only your cycling sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                Similar layout to All Activities tab, but filtered for Cycling only
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Other Activities</CardTitle>
              <CardDescription>
                Showing your swimming, weight training, and other activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                Similar layout to All Activities tab, but filtered for other activity types
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
