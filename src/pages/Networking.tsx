
import { Network, Filter, Plus, Search, Users, MessageSquare } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Networking() {
  // Sample data for networking
  const communities = [
    {
      id: 1,
      type: "Community",
      title: "Student Tech Alliance",
      members: "12,500+",
      universities: "75+",
      description: "Connect with tech students across multiple universities for collaboration and networking.",
    },
    {
      id: 2,
      type: "Mentorship",
      title: "Industry Connect",
      mentors: "350+",
      fields: "25+",
      description: "Get matched with industry professionals for career guidance and mentorship.",
    },
    {
      id: 3,
      type: "Project Teams",
      title: "Cross-Campus Innovation",
      projects: "120+",
      universities: "35+",
      description: "Join interdisciplinary project teams with students from different universities.",
    },
  ];

  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      university: "Stanford University",
      major: "Computer Science",
      year: "Junior",
      interests: ["AI", "Blockchain", "Mobile Development"],
      mutual: 3,
    },
    {
      id: 2,
      name: "Maya Patel",
      university: "MIT",
      major: "Electrical Engineering",
      year: "Senior",
      interests: ["Robotics", "IoT", "Sustainable Energy"],
      mutual: 5,
    },
    {
      id: 3,
      name: "Carlos Rodriguez",
      university: "UC Berkeley",
      major: "Data Science",
      year: "Sophomore",
      interests: ["Machine Learning", "Big Data", "Analytics"],
      mutual: 2,
    },
  ];

  const categoryColors = {
    Community: "bg-green-500/20 text-green-500 border-green-500/20",
    Mentorship: "bg-blue-500/20 text-blue-500 border-blue-500/20",
    "Project Teams": "bg-purple-500/20 text-purple-500 border-purple-500/20",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Networking</h1>
        <p className="text-muted-foreground">
          Connect with students across universities for collaboration and mentorship
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search connections..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </div>

      <Tabs defaultValue="communities">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <div className="hidden sm:block">
            <Select defaultValue="suggested">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suggested">Suggested for you</SelectItem>
                <SelectItem value="recent">Recently active</SelectItem>
                <SelectItem value="popular">Most popular</SelectItem>
                <SelectItem value="mutual">Mutual connections</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="communities" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Cross-University Communities</CardTitle>
              <CardDescription>
                Join communities and networks across multiple universities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communities.map((community) => (
                  <div
                    key={community.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-0">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[
                            community.type as keyof typeof categoryColors
                          ] || "bg-green-500/10 text-green-500 border-green-500/20"
                        }`}
                      >
                        {community.type}
                      </div>
                      <div>
                        <div className="font-medium text-white/90">{community.title}</div>
                        <p className="text-sm text-white/70">
                          {community.members ? `Members: ${community.members}` : ""} 
                          {community.universities ? ` • Universities: ${community.universities}` : ""}
                          {community.mentors ? `Mentors: ${community.mentors}` : ""}
                          {community.fields ? ` • Fields: ${community.fields}` : ""}
                          {community.projects ? `Projects: ${community.projects}` : ""}
                        </p>
                        <p className="text-sm text-white/70 line-clamp-1 mt-1">
                          {community.description}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Connect with Students</CardTitle>
              <CardDescription>
                Network with students from universities across the country
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white/90">{student.name}</div>
                        <p className="text-sm text-white/70">
                          {student.university} • {student.major} • {student.year}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {student.interests.map((interest, i) => (
                            <span key={i} className="inline-flex px-2 py-0.5 bg-purple-500/10 text-purple-300 text-xs rounded">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <span className="text-xs text-white/60">{student.mutual} mutual connections</span>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Connect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                Stay in touch with your network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium">No messages yet</h3>
                  <p className="text-sm mt-2">
                    Connect with students and mentors to start conversations
                  </p>
                  <Button className="mt-4">Start Networking</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
