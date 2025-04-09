
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function SmartTools() {
  // State for reminders
  const [studyReminders, setStudyReminders] = useState([
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
  ]);

  // State for focus sessions
  const [focusSessions, setFocusSessions] = useState([
    {
      id: 1,
      title: "Deep Focus",
      duration: "50 min focus, 10 min break",
      background: "Ambient noise",
      notifications: "Blocked",
      description: "Optimized for maximum concentration and productivity.",
      focusTime: 50,
      breakTime: 10,
    },
    {
      id: 2,
      title: "Study Session",
      duration: "25 min focus, 5 min break",
      background: "Lo-fi beats",
      notifications: "Priority only",
      description: "Balanced focus with short breaks to optimize memory retention.",
      focusTime: 25,
      breakTime: 5,
    },
    {
      id: 3,
      title: "Reading Mode",
      duration: "45 min focus, 15 min break",
      background: "Light classical",
      notifications: "Muted",
      description: "Designed for comfortable reading with eye-strain prevention.",
      focusTime: 45,
      breakTime: 15,
    },
  ]);

  // State for the custom focus session form
  const [sessionLength, setSessionLength] = useState<number[]>([45]);
  const [breakInterval, setBreakInterval] = useState<number[]>([25]);
  const [blockNotifications, setBlockNotifications] = useState(false);
  const [customSessionName, setCustomSessionName] = useState("");
  const [customSessionBackground, setCustomSessionBackground] = useState("None");
  
  // State for reminders
  const [newAlert, setNewAlert] = useState({
    title: "",
    course: "",
    dueDate: "",
    timeEstimate: "",
    priority: "Medium"
  });
  
  // State to track active focus session
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);

  const priorityColors = {
    High: "bg-red-500/20 text-red-300 border-red-500/20",
    Medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/20",
    Low: "bg-blue-500/20 text-blue-300 border-blue-500/20",
  };

  // Handler for toggling reminder active state
  const toggleReminderActive = (id: number) => {
    setStudyReminders(studyReminders.map(reminder => 
      reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
    ));
  };

  // Handler for creating a new custom focus session
  const handleCreateCustomSession = () => {
    if (!customSessionName.trim()) {
      toast({
        title: "Session Name Required",
        description: "Please provide a name for your custom session.",
        variant: "destructive",
      });
      return;
    }

    const newSession = {
      id: focusSessions.length + 1,
      title: customSessionName,
      duration: `${sessionLength[0]} min focus, ${breakInterval[0]} min break`,
      background: customSessionBackground,
      notifications: blockNotifications ? "Blocked" : "Allowed",
      description: "Custom session created for your specific needs.",
      focusTime: sessionLength[0],
      breakTime: breakInterval[0],
    };

    setFocusSessions([...focusSessions, newSession]);
    setCustomSessionName("");
    setSessionLength([45]);
    setBreakInterval([25]);
    setBlockNotifications(false);
    setCustomSessionBackground("None");

    toast({
      title: "Custom Session Created",
      description: "Your new focus session has been created successfully.",
    });
  };

  // Handler for starting a focus session
  const handleStartSession = (id: number) => {
    const session = focusSessions.find(s => s.id === id);
    if (!session) return;
    
    setActiveSessionId(id);
    
    toast({
      title: `${session.title} Started`,
      description: `Focus session started for ${session.focusTime} minutes.`,
    });
    
    // In a real app, you would set up timers here
  };

  // Handler for adding a new alert
  const handleAddAlert = () => {
    if (!newAlert.title.trim() || !newAlert.course.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and course for your alert.",
        variant: "destructive",
      });
      return;
    }

    const newReminder = {
      id: studyReminders.length + 1,
      title: newAlert.title,
      course: newAlert.course,
      dueDate: newAlert.dueDate || "Not specified",
      timeEstimate: newAlert.timeEstimate || "Not estimated",
      priority: newAlert.priority as "High" | "Medium" | "Low",
      active: true,
    };

    setStudyReminders([...studyReminders, newReminder]);
    setNewAlert({
      title: "",
      course: "",
      dueDate: "",
      timeEstimate: "",
      priority: "Medium"
    });

    toast({
      title: "Alert Created",
      description: "Your new study alert has been created successfully.",
    });
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Tool
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Tool</DialogTitle>
              <DialogDescription>
                Choose what type of smart tool you want to create
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <Button onClick={() => document.getElementById('add-alert-dialog')?.click()}>
                <Bell className="mr-2 h-4 w-4" />
                Add Study Alert
              </Button>
              <Button onClick={() => document.getElementById('create-session-dialog')?.click()}>
                <Clock className="mr-2 h-4 w-4" />
                Create Focus Session
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>AI-Powered Reminders & Alerts</CardTitle>
                  <CardDescription>
                    Smart notifications to keep you on track with your study goals
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button id="add-alert-dialog" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Alert
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Study Alert</DialogTitle>
                      <DialogDescription>
                        Add a new study reminder to keep track of your tasks
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="title"
                          placeholder="Assignment name"
                          className="col-span-3"
                          value={newAlert.title}
                          onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="course" className="text-right">
                          Course
                        </Label>
                        <Input
                          id="course"
                          placeholder="Course code or name"
                          className="col-span-3"
                          value={newAlert.course}
                          onChange={(e) => setNewAlert({...newAlert, course: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="due-date" className="text-right">
                          Due Date
                        </Label>
                        <Input
                          id="due-date"
                          placeholder="e.g. Tomorrow, Friday, April 15"
                          className="col-span-3"
                          value={newAlert.dueDate}
                          onChange={(e) => setNewAlert({...newAlert, dueDate: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time-estimate" className="text-right">
                          Time Estimate
                        </Label>
                        <Input
                          id="time-estimate"
                          placeholder="e.g. 2-3 hours"
                          className="col-span-3"
                          value={newAlert.timeEstimate}
                          onChange={(e) => setNewAlert({...newAlert, timeEstimate: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                          Priority
                        </Label>
                        <Select 
                          value={newAlert.priority}
                          onValueChange={(value) => setNewAlert({...newAlert, priority: value})}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddAlert}>Create Alert</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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
                      <Switch checked={reminder.active} onCheckedChange={() => toggleReminderActive(reminder.id)} />
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
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Assignment priority adjustment</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="focus" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Focus Sessions</CardTitle>
                  <CardDescription>
                    AI-optimized environments to boost your productivity
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button id="create-session-dialog" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Custom Focus Session</DialogTitle>
                      <DialogDescription>
                        Design a focus session to match your preferred work style
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="session-name" className="text-right">
                          Session Name
                        </Label>
                        <Input
                          id="session-name"
                          placeholder="My Custom Session"
                          className="col-span-3"
                          value={customSessionName}
                          onChange={(e) => setCustomSessionName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="session-length" className="text-right">
                          Focus Time
                        </Label>
                        <div className="col-span-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Session Length</span>
                            <span className="text-sm text-muted-foreground">{sessionLength[0]} minutes</span>
                          </div>
                          <Slider 
                            id="session-length"
                            value={sessionLength} 
                            onValueChange={setSessionLength} 
                            max={120} 
                            step={5} 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="break-interval" className="text-right">
                          Break Time
                        </Label>
                        <div className="col-span-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Break Length</span>
                            <span className="text-sm text-muted-foreground">{breakInterval[0]} minutes</span>
                          </div>
                          <Slider 
                            id="break-interval"
                            value={breakInterval} 
                            onValueChange={setBreakInterval} 
                            max={60} 
                            step={5} 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="background" className="text-right">
                          Background
                        </Label>
                        <Select 
                          value={customSessionBackground}
                          onValueChange={setCustomSessionBackground}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select background" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Ambient noise">Ambient noise</SelectItem>
                            <SelectItem value="Lo-fi beats">Lo-fi beats</SelectItem>
                            <SelectItem value="Light classical">Light classical</SelectItem>
                            <SelectItem value="White noise">White noise</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="block-notifications" className="text-right">
                          Notifications
                        </Label>
                        <div className="flex items-center space-x-2 col-span-3">
                          <Switch 
                            id="block-notifications" 
                            checked={blockNotifications}
                            onCheckedChange={setBlockNotifications}
                          />
                          <Label htmlFor="block-notifications">Block Notifications</Label>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateCustomSession}>Create Session</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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
                      <Button 
                        variant={activeSessionId === session.id ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handleStartSession(session.id)}
                      >
                        {activeSessionId === session.id ? "In Progress" : "Start"}
                      </Button>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
