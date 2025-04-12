
import { useState } from "react";
import { 
  Calendar, 
  CheckSquare, 
  Clock, 
  Edit2, 
  Plus, 
  Save, 
  Trash2, 
  XCircle
} from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Sample tasks data
const initialDailyTasks = [
  { 
    id: 1, 
    title: "Complete Machine Learning Assignment", 
    description: "Finish chapter 5 exercises", 
    priority: "high", 
    dueTime: "11:59 PM", 
    completed: false,
    category: "academic"
  },
  { 
    id: 2, 
    title: "Study for Physics Exam", 
    description: "Review chapters 7-9", 
    priority: "high", 
    dueTime: "8:00 PM", 
    completed: false,
    category: "academic"
  },
  { 
    id: 3, 
    title: "Update Resume", 
    description: "Add new project experience", 
    priority: "medium", 
    dueTime: "5:00 PM", 
    completed: true,
    category: "career"
  },
  { 
    id: 4, 
    title: "Team Meeting", 
    description: "Discuss project progress", 
    priority: "medium", 
    dueTime: "3:30 PM", 
    completed: false,
    category: "meeting"
  },
  { 
    id: 5, 
    title: "Read Research Paper", 
    description: "AI in Education paper", 
    priority: "low", 
    dueTime: "9:00 PM", 
    completed: false,
    category: "academic"
  },
];

// Scheduled tasks for the week
const initialScheduledTasks = [
  { 
    id: 101, 
    title: "Group Project Meeting", 
    day: "Monday", 
    time: "2:00 PM", 
    category: "meeting", 
    recurring: true 
  },
  { 
    id: 102, 
    title: "Algorithm Class", 
    day: "Tuesday", 
    time: "10:00 AM", 
    category: "academic", 
    recurring: true 
  },
  { 
    id: 103, 
    title: "Career Fair", 
    day: "Wednesday", 
    time: "1:00 PM", 
    category: "career", 
    recurring: false 
  },
  { 
    id: 104, 
    title: "Lab Session", 
    day: "Thursday", 
    time: "3:30 PM", 
    category: "academic", 
    recurring: true 
  },
  { 
    id: 105, 
    title: "Study Group", 
    day: "Friday", 
    time: "5:00 PM", 
    category: "academic", 
    recurring: true 
  },
];

type TaskType = {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueTime: string;
  completed: boolean;
  category: string;
};

type ScheduledTaskType = {
  id: number;
  title: string;
  day: string;
  time: string;
  category: string;
  recurring: boolean;
};

export default function DailyTasks() {
  const [dailyTasks, setDailyTasks] = useState<TaskType[]>(initialDailyTasks);
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTaskType[]>(initialScheduledTasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueTime: "",
      category: "academic"
    }
  });

  const handleTaskComplete = (taskId: number) => {
    setDailyTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    
    const task = dailyTasks.find(t => t.id === taskId);
    if (task) {
      if (!task.completed) {
        toast.success("Task marked as complete! +10 points");
      } else {
        toast("Task marked as incomplete");
      }
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setDailyTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    toast.success("Task deleted successfully");
  };

  const handleEditTask = (task: TaskType) => {
    setEditingTaskId(task.id);
    form.reset({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueTime: task.dueTime,
      category: task.category
    });
    setDialogOpen(true);
  };

  const handleAddTask = () => {
    setEditingTaskId(null);
    form.reset({
      title: "",
      description: "",
      priority: "medium",
      dueTime: "",
      category: "academic"
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: any) => {
    if (editingTaskId) {
      // Update existing task
      setDailyTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === editingTaskId 
            ? { ...task, ...data } 
            : task
        )
      );
      toast.success("Task updated successfully");
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        ...data,
        completed: false
      };
      setDailyTasks(prev => [...prev, newTask]);
      toast.success("New task added successfully");
    }
    setDialogOpen(false);
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/20";
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/20";
      case "low":
        return "bg-blue-500/20 text-blue-300 border-blue-500/20";
      default:
        return "bg-purple-500/20 text-purple-300 border-purple-500/20";
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-purple-500/20 text-purple-300 border-purple-500/20";
      case "career":
        return "bg-green-500/20 text-green-300 border-green-500/20";
      case "meeting":
        return "bg-blue-500/20 text-blue-300 border-blue-500/20";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Daily Tasks</h1>
        <p className="text-muted-foreground">
          Manage your tasks and boost your productivity
        </p>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-lg border-purple-800/30">
          <DialogHeader>
            <DialogTitle>{editingTaskId ? "Edit Task" : "Add New Task"}</DialogTitle>
            <DialogDescription>
              {editingTaskId 
                ? "Update the details of your task below" 
                : "Fill in the details to add a new task to your list"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Task title" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Task description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="career">Career</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="dueTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTaskId ? "Save Changes" : "Add Task"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="today" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <AnimatedButton onClick={handleAddTask}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </AnimatedButton>
          </div>
          
          <TabsContent value="today">
            <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
              <CardHeader className="pb-2">
                <CardTitle>Today's Tasks</CardTitle>
                <CardDescription>
                  Manage your tasks for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyTasks.filter(task => !task.completed).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm group"
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id={`task-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => handleTaskComplete(task.id)}
                          className="mt-1"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <Label 
                              htmlFor={`task-${task.id}`}
                              className="font-medium text-base cursor-pointer"
                            >
                              {task.title}
                            </Label>
                            <div className={`px-2 py-0.5 rounded-full text-xs border ${getPriorityBadgeClass(task.priority)}`}>
                              {task.priority}
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-xs border ${getCategoryBadgeClass(task.category)}`}>
                              {task.category}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            Due by {task.dueTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditTask(task)}
                          className="h-8 w-8"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteTask(task.id)}
                          className="h-8 w-8 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {dailyTasks.filter(task => !task.completed).length === 0 && (
                    <div className="text-center py-8">
                      <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                      <h3 className="mt-4 text-xl font-medium">All caught up!</h3>
                      <p className="text-muted-foreground">
                        You've completed all your tasks for today.
                      </p>
                      <Button
                        onClick={handleAddTask}
                        variant="outline"
                        className="mt-4"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add a new task
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduled">
            <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
              <CardHeader className="pb-2">
                <CardTitle>Scheduled Tasks</CardTitle>
                <CardDescription>
                  View your weekly schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
                    const dayTasks = scheduledTasks.filter(task => task.day === day);
                    return (
                      <div key={day}>
                        <h3 className="font-medium text-lg mb-2">{day}</h3>
                        {dayTasks.length > 0 ? (
                          <div className="space-y-3">
                            {dayTasks.map((task) => (
                              <div
                                key={task.id}
                                className="flex items-center justify-between p-3 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                              >
                                <div className="flex items-center gap-3">
                                  <Calendar className="h-5 w-5 text-purple-400" />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{task.title}</span>
                                      <div className={`px-2 py-0.5 rounded-full text-xs border ${getCategoryBadgeClass(task.category)}`}>
                                        {task.category}
                                      </div>
                                      {task.recurring && (
                                        <div className="px-2 py-0.5 rounded-full text-xs border bg-purple-500/20 text-purple-300 border-purple-500/20">
                                          Recurring
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {task.time}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 border border-dashed border-purple-800/20 rounded-lg bg-black/10">
                            <p className="text-muted-foreground">No tasks scheduled</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
              <CardHeader className="pb-2">
                <CardTitle>Completed Tasks</CardTitle>
                <CardDescription>
                  View your achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dailyTasks.filter(task => task.completed).length > 0 ? (
                  <div className="space-y-4">
                    {dailyTasks.filter(task => task.completed).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm group"
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            id={`completed-task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() => handleTaskComplete(task.id)}
                            className="mt-1"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <Label 
                                htmlFor={`completed-task-${task.id}`}
                                className="font-medium text-base cursor-pointer line-through opacity-70"
                              >
                                {task.title}
                              </Label>
                              <div className={`px-2 py-0.5 rounded-full text-xs border opacity-50 ${getPriorityBadgeClass(task.priority)}`}>
                                {task.priority}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 opacity-70">
                              {task.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteTask(task.id)}
                            className="h-8 w-8 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <XCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                    <h3 className="mt-4 text-xl font-medium">No completed tasks</h3>
                    <p className="text-muted-foreground">
                      Start checking off your daily tasks to see them here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
