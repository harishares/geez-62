
import { Clock, MoreVertical, Ruler, Timer } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Sample data
const recentActivities = [
  {
    id: 1,
    type: "Running",
    date: "Today",
    time: "7:30 AM",
    duration: "45 min",
    distance: "5.2 km",
    calories: "320",
  },
  {
    id: 2,
    type: "Cycling",
    date: "Yesterday",
    time: "6:15 PM",
    duration: "1h 10min",
    distance: "20.5 km",
    calories: "450",
  },
  {
    id: 3,
    type: "Swimming",
    date: "Apr 4, 2025",
    time: "8:00 AM",
    duration: "30 min",
    distance: "1 km",
    calories: "280",
  },
];

const activityColors = {
  Running: "bg-primary",
  Cycling: "bg-secondary",
  Swimming: "bg-accent",
};

export function ActivityList() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest tracked performances</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className={activityColors[activity.type as keyof typeof activityColors]}>
                  <AvatarFallback className="text-white font-medium">
                    {activity.type.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{activity.type}</h4>
                  <p className="text-xs text-muted-foreground">
                    {activity.date} • {activity.time}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <Timer className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm">{activity.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Ruler className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm">{activity.distance}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
