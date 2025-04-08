
import { Filter, Network, GraduationCap, Coins, Plus, Search, Activity } from "lucide-react";
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
  // Sample data for the new sections
  const events = [
    {
      id: 1,
      type: "Workshop",
      title: "AI for Beginners",
      date: "April 12, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Virtual",
      description: "Learn the basics of artificial intelligence and how it's changing the world.",
    },
    {
      id: 2,
      type: "Hackathon",
      title: "GenZ Code Jam",
      date: "April 15-16, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Innovation Hub",
      description: "48-hour coding challenge with prizes for the most innovative solutions.",
    },
    {
      id: 3,
      type: "Webinar",
      title: "Future of Tech",
      date: "April 20, 2025",
      time: "5:30 PM - 7:00 PM",
      location: "Virtual",
      description: "Industry experts discuss emerging technology trends for the next decade.",
    },
  ];

  const learningResources = [
    {
      id: 1,
      type: "Course",
      title: "Full-Stack Development",
      provider: "CodeAcademy",
      duration: "8 weeks",
      description: "Comprehensive course covering modern web development technologies.",
      rating: "4.8/5",
    },
    {
      id: 2,
      type: "Tutorial",
      title: "Machine Learning Basics",
      provider: "AI Institute",
      duration: "3 hours",
      description: "Step-by-step guide to understanding and implementing ML algorithms.",
      rating: "4.6/5",
    },
    {
      id: 3,
      type: "E-Book",
      title: "Blockchain Fundamentals",
      provider: "Tech Publications",
      duration: "205 pages",
      description: "In-depth exploration of blockchain technology and its applications.",
      rating: "4.5/5",
    },
  ];

  const networking = [
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

  const careers = [
    {
      id: 1,
      type: "Internship",
      company: "TechGiant Inc.",
      position: "Software Engineer Intern",
      location: "Remote",
      duration: "3 months",
      deadline: "April 30, 2025",
    },
    {
      id: 2,
      type: "Fellowship",
      company: "Future Labs",
      position: "AI Research Fellow",
      location: "New York, NY",
      duration: "6 months",
      deadline: "May 15, 2025",
    },
    {
      id: 3,
      type: "Entry Level",
      company: "StartupX",
      position: "Junior UX Designer",
      location: "San Francisco, CA",
      duration: "Full-time",
      deadline: "Open until filled",
    },
  ];

  const categoryColors = {
    Workshop: "bg-primary/20 text-primary border-primary/20",
    Hackathon: "bg-secondary/20 text-secondary border-secondary/20",
    Webinar: "bg-accent/20 text-accent border-accent/20",
    Course: "bg-purple-500/20 text-purple-500 border-purple-500/20",
    Tutorial: "bg-blue-500/20 text-blue-500 border-blue-500/20",
    Community: "bg-green-500/20 text-green-500 border-green-500/20",
    Internship: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activities</h1>
        <p className="text-muted-foreground">
          Discover events, learning resources, networking opportunities, and careers.
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

      <Tabs defaultValue="events">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="networking">Networking</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
          </TabsList>
          <div className="hidden sm:block">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="popular">Most popular</SelectItem>
                <SelectItem value="recommended">Recommended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="events" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Discover workshops, hackathons, webinars, and more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-0">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[
                            event.type as keyof typeof categoryColors
                          ] || "bg-purple-500/10 text-purple-500 border-purple-500/20"
                        }`}
                      >
                        {event.type}
                      </div>
                      <div>
                        <div className="font-medium text-white/90">{event.title}</div>
                        <p className="text-sm text-white/70">
                          {event.date} • {event.time} • {event.location}
                        </p>
                        <p className="text-sm text-white/70 line-clamp-1 mt-1">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                      Register
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>
                Courses, tutorials, and materials to expand your knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-0">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[
                            resource.type as keyof typeof categoryColors
                          ] || "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        }`}
                      >
                        {resource.type}
                      </div>
                      <div>
                        <div className="font-medium text-white/90">{resource.title}</div>
                        <p className="text-sm text-white/70">
                          {resource.provider} • {resource.duration} • Rating: {resource.rating}
                        </p>
                        <p className="text-sm text-white/70 line-clamp-1 mt-1">
                          {resource.description}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                      Access
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networking" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader>
              <CardTitle>Networking</CardTitle>
              <CardDescription>
                Cross-university student connections and communities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networking.map((network) => (
                  <div
                    key={network.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-0">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[
                            network.type as keyof typeof categoryColors
                          ] || "bg-green-500/10 text-green-500 border-green-500/20"
                        }`}
                      >
                        {network.type}
                      </div>
                      <div>
                        <div className="font-medium text-white/90">{network.title}</div>
                        <p className="text-sm text-white/70">
                          {network.members ? `Members: ${network.members}` : ""} 
                          {network.universities ? ` • Universities: ${network.universities}` : ""}
                          {network.mentors ? `Mentors: ${network.mentors}` : ""}
                          {network.fields ? ` • Fields: ${network.fields}` : ""}
                          {network.projects ? `Projects: ${network.projects}` : ""}
                        </p>
                        <p className="text-sm text-white/70 line-clamp-1 mt-1">
                          {network.description}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="careers" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader>
              <CardTitle>Career Opportunities</CardTitle>
              <CardDescription>
                Internships, fellowships, and entry-level positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careers.map((career) => (
                  <div
                    key={career.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-0">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[
                            career.type as keyof typeof categoryColors
                          ] || "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }`}
                      >
                        {career.type}
                      </div>
                      <div>
                        <div className="font-medium text-white/90">{career.position}</div>
                        <p className="text-sm text-white/70">
                          {career.company} • {career.location} • {career.duration}
                        </p>
                        <p className="text-sm text-white/70 mt-1">
                          Apply by: {career.deadline}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                      Apply
                    </Button>
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
