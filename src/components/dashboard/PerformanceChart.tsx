
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - in a real app, this would come from an API or state
const performanceData = [
  { date: "Jan", running: 30, cycling: 25, swimming: 10 },
  { date: "Feb", running: 35, cycling: 20, swimming: 15 },
  { date: "Mar", running: 40, cycling: 30, swimming: 20 },
  { date: "Apr", running: 38, cycling: 35, swimming: 25 },
  { date: "May", running: 45, cycling: 40, swimming: 30 },
  { date: "Jun", running: 50, cycling: 45, swimming: 35 },
  { date: "Jul", running: 55, cycling: 50, swimming: 40 },
];

export function PerformanceChart() {
  const [timeRange, setTimeRange] = useState("7d");
  
  return (
    <Card className="performance-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>View your progress over time</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="1m">Last month</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRunning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCycling" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSwimming" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="running" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorRunning)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="cycling" 
                stroke="hsl(var(--secondary))" 
                fillOpacity={1} 
                fill="url(#colorCycling)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="swimming" 
                stroke="hsl(var(--accent))" 
                fillOpacity={1} 
                fill="url(#colorSwimming)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center mt-2 gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary"></div>
            <span className="text-sm text-muted-foreground">Running</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-secondary"></div>
            <span className="text-sm text-muted-foreground">Cycling</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent"></div>
            <span className="text-sm text-muted-foreground">Swimming</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
