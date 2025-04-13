
import { Bell, BrainCircuit, Clock, Filter, Lightbulb, Plus, Search, Sparkles, User } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SmartTools() {
  // Sample data for smart tools
  const studyReminders = [
    {
      id: 1,
      title: "Machine Learning Homework",
      course: "CS 4100",
      dueDate: "Tomorrow, 11:59 PM",
      timeEstimate: "2-3 hours",
      priority: "High",
      active: true,
    },
    {
      id: 2,
      title: "Physics Lab Report",
      course: "PHYS 2200",
      dueDate: "Friday, 5:00 PM",
      timeEstimate: "3-4 hours",
      priority: "Medium",
      active: true,
    },
    {
      id: 3,
      title: "Literature Review",
      course: "ENG 3500",
      dueDate: "Next Monday, 9:00 AM",
      timeEstimate: "5-6 hours",
      priority: "Low",
      active: false,
    },
  ];

  const focusSessions = [
    {
      id: 1,
      title: "Deep Focus",
      duration: "50 min focus, 10 min break",
      background: "Ambient noise",
      notifications: "Blocked",
      description: "Optimized for maximum concentration and productivity.",
    },
    {
      id: 2,
      title: "Study Session",
      duration: "25 min focus, 5 min break",
      background: "Lo-fi beats",
      notifications: "Priority only",
      description: "Balanced focus with short breaks to optimize memory retention.",
    },
    {
      id: 3,
      title: "Reading Mode",
      duration: "45 min focus, 15 min break",
      background: "Light classical",
      notifications: "Muted",
      description: "Designed for comfortable reading with eye-strain prevention.",
    },
  ];

  const priorityColors = {
    High: "bg-red-500/20 text-red-300 border-red-500/20",
    Medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/20",
    Low: "bg-blue-500/20 text-blue-300 border-blue-500/20",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Smart Tools</h1>
        <p className="text-muted-foreground">
          AI-powered tools to enhance your productivity and learning
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Tool
        </Button>
      </div>

      <Tabs defaultValue="smart-alerts">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="smart-alerts">Smart Alerts</TabsTrigger>
            <TabsTrigger value="focus">Focus Sessions</TabsTrigger>
            <TabsTrigger value="study-assistant">Study Assistant</TabsTrigger>
            <TabsTrigger value="resume-builder">Resume Builder</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="smart-alerts" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>AI-Powered Reminders & Alerts</CardTitle>
              <CardDescription>
                Smart notifications to keep you on track with your study goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm ${
                      !reminder.active ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-0">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          priorityColors[
                            reminder.priority as keyof typeof priorityColors
                          ] || "bg-purple-500/10 text-purple-500 border-purple-500/20"
                        }`}
                      >
                        {reminder.priority}
                      </div>
                      <div>
                        <div className="font-medium text-white/90">{reminder.title}</div>
                        <p className="text-sm text-white/70">
                          {reminder.course} • Due: {reminder.dueDate}
                        </p>
                        <p className="text-sm text-white/70">
                          Estimated time: {reminder.timeEstimate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Switch checked={reminder.active} />
                      <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 mt-4 rounded-lg border border-purple-800/30 bg-black/15 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    <h3 className="font-medium">AI Alert Suggestions</h3>
                  </div>
                  <Button variant="ghost" size="sm">Customize</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Study break reminders</span>
                    <Switch />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Focus time recommendations</span>
                    <Switch checked={true} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Assignment priority adjustment</span>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="focus" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Focus Sessions</CardTitle>
              <CardDescription>
                AI-optimized environments to boost your productivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {focusSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex flex-col p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center">
                          <BrainCircuit className="h-5 w-5 text-white/80" />
                        </div>
                        <div className="font-medium text-white/90">{session.title}</div>
                      </div>
                      <Button variant="outline" size="sm">Start</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{session.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{session.background}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{session.notifications}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-white/70">
                      {session.description}
                    </p>
                  </div>
                ))}
                
                <div className="p-4 mt-2 rounded-lg border border-purple-800/30 bg-black/15 backdrop-blur-sm">
                  <h3 className="font-medium mb-3">Create Custom Focus Session</h3>
                  
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Session Length</span>
                        <span className="text-sm text-muted-foreground">45 minutes</span>
                      </div>
                      <Slider defaultValue={[45]} max={120} step={5} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Break Intervals</span>
                        <span className="text-sm text-muted-foreground">Every 25 minutes</span>
                      </div>
                      <Slider defaultValue={[25]} max={60} step={5} />
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Block Notifications</span>
                      <Switch />
                    </div>
                    
                    <Button className="w-full">Create Custom Session</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
