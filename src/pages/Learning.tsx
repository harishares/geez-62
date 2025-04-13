
import { BookOpen, Filter, GraduationCap, Plus, Search } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

export default function Learning() {
  // Sample data for learning resources
  const resources = [
    {
      id: 1,
      type: "Course",
      title: "Full-Stack Development",
      provider: "CodeAcademy",
      duration: "8 weeks",
      description: "Comprehensive course covering modern web development technologies.",
      rating: "4.8/5",
      progress: 65,
    },
    {
      id: 2,
      type: "Tutorial",
      title: "Machine Learning Basics",
      provider: "AI Institute",
      duration: "3 hours",
      description: "Step-by-step guide to understanding and implementing ML algorithms.",
      rating: "4.6/5",
      progress: 30,
    },
    {
      id: 3,
      type: "E-Book",
      title: "Blockchain Fundamentals",
      provider: "Tech Publications",
      duration: "205 pages",
      description: "In-depth exploration of blockchain technology and its applications.",
      rating: "4.5/5",
      progress: 0,
    },
  ];

  const certifications = [
    {
      id: 1,
      type: "Certificate",
      title: "Data Science Fundamentals",
      provider: "IBM",
      duration: "4 weeks",
      description: "Industry-recognized certification in data science principles and practices.",
      popularity: "High demand",
    },
    {
      id: 2,
      type: "Certificate",
      title: "Cloud Computing Essentials",
      provider: "AWS",
      duration: "6 weeks",
      description: "Learn cloud architecture, deployment, and security best practices.",
      popularity: "Top rated",
    },
  ];

  const categoryColors = {
    Course: "bg-primary/20 text-primary border-primary/20",
    Tutorial: "bg-secondary/20 text-secondary border-secondary/20",
    "E-Book": "bg-accent/20 text-accent border-accent/20",
    Certificate: "bg-purple-500/20 text-purple-500 border-purple-500/20",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Learning</h1>
        <p className="text-muted-foreground">
          Courses, tutorials, and materials to expand your knowledge
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search learning resources..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Explore Resources
        </Button>
      </div>

      <Tabs defaultValue="inprogress">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="inprogress">In Progress</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>
          <div className="hidden sm:block">
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
                <SelectItem value="popularity">Most popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="inprogress" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>In Progress</CardTitle>
              <CardDescription>
                Continue your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources.filter(r => r.progress > 0).map((resource) => (
                  <div
                    key={resource.id}
                    className="flex flex-col p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex justify-between mb-2">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[
                            resource.type as keyof typeof categoryColors
                          ] || "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        }`}
                      >
                        {resource.type}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {resource.duration}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="font-medium text-white/90">{resource.title}</div>
                      <p className="text-sm text-white/70">
                        {resource.provider} • Rating: {resource.rating}
                      </p>
                      <p className="text-sm text-white/70 line-clamp-1 mt-1">
                        {resource.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>{resource.progress}% complete</span>
                        <Button variant="ghost" size="sm">Resume</Button>
                      </div>
                      <Progress value={resource.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Premium Certifications</CardTitle>
              <CardDescription>
                Industry-recognized credentials to boost your career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-0">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[
                            cert.type as keyof typeof categoryColors
                          ] || "bg-purple-500/10 text-purple-500 border-purple-500/20"
                        }`}
                      >
                        {cert.type}
                      </div>
                      <div>
                        <div className="font-medium text-white/90">{cert.title}</div>
                        <p className="text-sm text-white/70">
                          {cert.provider} • {cert.duration} • {cert.popularity}
                        </p>
                        <p className="text-sm text-white/70 line-clamp-1 mt-1">
                          {cert.description}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                      Enroll
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
