
import { useState } from "react";
import { Bell, Shield, UserCog, Palette, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Settings() {
  const [theme, setTheme] = useState("dark-purple");

  const handleThemeChange = (value: string) => {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    localStorage.setItem("app-theme", value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="ai">AI Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile details and university information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-xl">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium text-lg">John Doe</h3>
                  <p className="text-sm text-muted-foreground">MIT • Computer Science • Junior</p>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input id="university" defaultValue="Massachusetts Institute of Technology" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Input id="major" defaultValue="Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" defaultValue="Junior" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduation">Expected Graduation</Label>
                  <Input id="graduation" defaultValue="May 2026" />
                </div>
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4 space-y-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup 
                  defaultValue={theme} 
                  onValueChange={handleThemeChange} 
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2"
                >
                  <div>
                    <RadioGroupItem 
                      value="dark-purple" 
                      id="theme-dark-purple" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="theme-dark-purple"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Palette className="mb-3 h-6 w-6" />
                      Dark Purple
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="blue" 
                      id="theme-blue" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="theme-blue"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Palette className="mb-3 h-6 w-6" />
                      Blue
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="green" 
                      id="theme-green" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="theme-green"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Palette className="mb-3 h-6 w-6" />
                      Green
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="orange" 
                      id="theme-orange" 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor="theme-orange"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Palette className="mb-3 h-6 w-6" />
                      Orange
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Interface Options</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact layout for the interface
                    </p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable interface animations
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sidebar-collapsed">Collapsed Sidebar by Default</Label>
                    <p className="text-sm text-muted-foreground">
                      Start with a collapsed sidebar for more screen space
                    </p>
                  </div>
                  <Switch id="sidebar-collapsed" />
                </div>
              </div>
              
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-4 space-y-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader>
              <CardTitle>AI Preferences</CardTitle>
              <CardDescription>
                Configure how AI features are used in the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-notifications">AI-Powered Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow AI to send smart alerts based on your activity
                    </p>
                  </div>
                  <Switch id="ai-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="study-recommendations">Study Recommendations</Label>
                    <p className="text-sm text-muted-foreground">
                      Get AI suggestions for study materials and techniques
                    </p>
                  </div>
                  <Switch id="study-recommendations" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="opportunity-matching">Opportunity Matching</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow AI to match you with relevant earning opportunities
                    </p>
                  </div>
                  <Switch id="opportunity-matching" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-collection">Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anonymous data collection to improve AI features
                    </p>
                  </div>
                  <Switch id="data-collection" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">AI Tools</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Select which AI-powered tools you want to see in your dashboard
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="ai-resume" defaultChecked />
                    <Label htmlFor="ai-resume">Resume Builder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ai-study" defaultChecked />
                    <Label htmlFor="ai-study">Study Assistant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ai-productivity" defaultChecked />
                    <Label htmlFor="ai-productivity">Productivity Tracker</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ai-networking" defaultChecked />
                    <Label htmlFor="ai-networking">Networking Suggestions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ai-events" defaultChecked />
                    <Label htmlFor="ai-events">Event Recommendations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ai-career" defaultChecked />
                    <Label htmlFor="ai-career">Career Insights</Label>
                  </div>
                </div>
              </div>
              
              <Button>Update AI Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
