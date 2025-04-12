
import { BarChart, LineChart, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useCapacitor } from "@/hooks/use-capacitor";
import { toast } from "sonner";
import { useState } from "react";

// Sample data - in a real app, this would come from an API or state
const weeklyData = [
  { name: "Mon", running: 5.2, cycling: 0, swimming: 0 },
  { name: "Tue", running: 0, cycling: 15.3, swimming: 0 },
  { name: "Wed", running: 3.8, cycling: 0, swimming: 1.5 },
  { name: "Thu", running: 0, cycling: 20.1, swimming: 0 },
  { name: "Fri", running: 6.5, cycling: 0, swimming: 0 },
  { name: "Sat", running: 8.2, cycling: 30.5, swimming: 0 },
  { name: "Sun", running: 0, cycling: 0, swimming: 2.0 },
];

const monthlyData = [
  { name: "Week 1", running: 20.2, cycling: 45.5, swimming: 2.5 },
  { name: "Week 2", running: 18.7, cycling: 52.3, swimming: 3.0 },
  { name: "Week 3", running: 25.6, cycling: 38.9, swimming: 2.0 },
  { name: "Week 4", running: 23.5, cycling: 65.8, swimming: 4.5 },
];

const paceData = [
  { name: "Jan", runningPace: 6.2, cyclingSpeed: 16.3 },
  { name: "Feb", runningPace: 6.0, cyclingSpeed: 17.2 },
  { name: "Mar", runningPace: 5.8, cyclingSpeed: 18.1 },
  { name: "Apr", runningPace: 5.5, cyclingSpeed: 19.5 },
];

export default function Progress() {
  const { showNotification } = useCapacitor();
  const [timeRange, setTimeRange] = useState("week");
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    toast.success(`Showing data for: ${value === "week" ? "This Week" : value === "month" ? "This Month" : "This Year"}`);
  };
  
  const shareProgress = () => {
    showNotification(
      "Progress Shared", 
      "Your progress has been shared with your friends!"
    );
    toast.success("Progress shared successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Progress</h1>
          <p className="text-muted-foreground">
            Analyze your performance progress over time.
          </p>
        </div>
        <button
          onClick={shareProgress}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Share Progress
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Tabs defaultValue="distance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="distance">Distance</TabsTrigger>
            <TabsTrigger value="pace">Pace</TabsTrigger>
            <TabsTrigger value="intensity">Intensity</TabsTrigger>
          </TabsList>

          <div className="flex justify-end mt-4">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="distance" className="mt-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Distance</CardTitle>
                <CardDescription>
                  Distance covered by activity type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] md:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="running"
                        name="Running (km)"
                        fill="hsl(var(--primary))"
                      />
                      <Bar
                        dataKey="cycling"
                        name="Cycling (km)"
                        fill="hsl(var(--secondary))"
                      />
                      <Bar
                        dataKey="swimming"
                        name="Swimming (km)"
                        fill="hsl(var(--accent))"
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Distance</CardTitle>
                <CardDescription>
                  Monthly progression by week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] md:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="running"
                        name="Running (km)"
                        fill="hsl(var(--primary))"
                      />
                      <Bar
                        dataKey="cycling"
                        name="Cycling (km)"
                        fill="hsl(var(--secondary))"
                      />
                      <Bar
                        dataKey="swimming"
                        name="Swimming (km)"
                        fill="hsl(var(--accent))"
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pace" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pace Improvement</CardTitle>
                <CardDescription>
                  Track your pace improvements over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] md:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={paceData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[15, 20]}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="runningPace"
                        name="Running Pace (min/km)"
                        stroke="hsl(var(--primary))"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="cyclingSpeed"
                        name="Cycling Speed (km/h)"
                        stroke="hsl(var(--secondary))"
                        activeDot={{ r: 8 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intensity" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Workout Intensity</CardTitle>
                <CardDescription>
                  Track your perceived exertion and heart rate over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-8 md:p-12 text-muted-foreground">
                  <div className="text-center">
                    <Target className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium">Coming Soon</h3>
                    <p className="text-sm">
                      Intensity tracking will be available in the next update.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
