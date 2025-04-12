
import { ActivitySquare, BarChart3, Dumbbell, Timer } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { GoalProgress } from "@/components/dashboard/GoalProgress";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your performance metrics and progress towards your goals.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Activities"
          value={87}
          change={12}
          icon={ActivitySquare}
          description="vs. last month"
        />
        <StatsCard
          title="Active Time"
          value="28h 15m"
          change={8}
          icon={Timer}
          description="vs. last month"
        />
        <StatsCard
          title="Average Intensity"
          value="7.4/10"
          change={-2}
          icon={BarChart3}
          description="vs. last month"
        />
        <StatsCard
          title="Strength Training"
          value="12"
          change={25}
          icon={Dumbbell}
          description="sessions this month"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 space-y-6">
          <PerformanceChart />
          <ActivityList />
        </div>
        <div className="md:col-span-3">
          <GoalProgress />
        </div>
      </div>
    </div>
  );
}
