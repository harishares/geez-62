import { BookOpen, Filter, GraduationCap, Plus, Search, ExternalLink, Check, Play, Award, Shield } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

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

  // Free courses data
  const freeCourses = [
    {
      id: 1,
      type: "Video Course",
      title: "Python for Beginners",
      provider: "freeCodeCamp",
      platform: "YouTube",
      duration: "4.5 hours",
      students: "2.3M+",
      description: "Complete Python tutorial covering all basics from variables to OOP concepts.",
      topics: ["Programming", "Python", "Data Structures"],
      link: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      featured: true,
    },
    {
      id: 2,
      type: "MOOC",
      title: "CS50: Introduction to Computer Science",
      provider: "Harvard University",
      platform: "edX",
      duration: "12 weeks",
      students: "3.7M+",
      description: "Harvard's introduction to the intellectual enterprises of computer science.",
      topics: ["Computer Science", "Programming", "Algorithms"],
      link: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x",
      featured: false,
    },
    {
      id: 3,
      type: "Interactive Course",
      title: "Responsive Web Design",
      provider: "freeCodeCamp",
      platform: "freeCodeCamp.org",
      duration: "300 hours",
      students: "1.4M+",
      description: "Learn HTML, CSS, and responsive design principles with interactive exercises.",
      topics: ["Web Development", "HTML", "CSS", "Responsive Design"],
      link: "https://www.freecodecamp.org/learn/responsive-web-design/",
      featured: false,
    },
    {
      id: 4,
      type: "Video Course",
      title: "JavaScript Crash Course",
      provider: "Traversy Media",
      platform: "YouTube",
      duration: "1.5 hours",
      students: "1.8M+",
      description: "Quick introduction to JavaScript fundamentals for beginners.",
      topics: ["Web Development", "JavaScript", "Frontend"],
      link: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
      featured: false,
    },
    {
      id: 5,
      type: "MOOC",
      title: "Machine Learning",
      provider: "Stanford University",
      platform: "Coursera",
      duration: "11 weeks",
      students: "4.8M+",
      description: "Learn the fundamentals of machine learning and how to apply these techniques.",
      topics: ["AI", "Machine Learning", "Data Science"],
      link: "https://www.coursera.org/learn/machine-learning",
      featured: true,
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
    "Video Course": "bg-red-500/20 text-red-400 border-red-500/20",
    "MOOC": "bg-blue-500/20 text-blue-400 border-blue-500/20",
    "Interactive Course": "bg-green-500/20 text-green-400 border-green-500/20",
  };

  const handleEnroll = (courseId: number) => {
    toast({
      title: "Enrolled Successfully",
      description: "You have been enrolled in this course. Start learning now!",
      variant: "default",
    });
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
          <Button variant="outline" size="icon" className="hover:bg-purple-900/20 hover:border-purple-500/50 transition-colors">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <AnimatedButton glowColor="rgba(139, 92, 246, 0.6)">
          <Plus className="h-4 w-4 mr-2" />
          Explore Resources
        </AnimatedButton>
      </div>

      <Tabs defaultValue="law" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="p-1 bg-black/20 backdrop-blur-sm border border-purple-800/30">
            <TabsTrigger value="law" className="spark-border data-[state=active]:bg-purple-800/30">
              <Shield className="h-4 w-4 mr-2" />
              LAW F U
            </TabsTrigger>
            <TabsTrigger value="free" className="spark-border data-[state=active]:bg-purple-800/30">
              <GraduationCap className="h-4 w-4 mr-2" />
              Free Courses
            </TabsTrigger>
            <TabsTrigger value="inprogress" className="spark-border data-[state=active]:bg-purple-800/30">
              <BookOpen className="h-4 w-4 mr-2" />
              In Progress
            </TabsTrigger>
            <TabsTrigger value="recommended" className="spark-border data-[state=active]:bg-purple-800/30">
              <Award className="h-4 w-4 mr-2" />
              Recommended
            </TabsTrigger>
            <TabsTrigger value="certifications" className="spark-border data-[state=active]:bg-purple-800/30">
              <Award className="h-4 w-4 mr-2" />
              Certifications
            </TabsTrigger>
          </TabsList>
          <div className="hidden sm:block">
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px] border-purple-800/30 bg-black/20 backdrop-blur-sm">
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

        <TabsContent value="law" className="mt-4">
          <LawEducation />
        </TabsContent>

        <TabsContent value="free" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Free Courses & Resources</CardTitle>
              <CardDescription>
                High-quality learning materials available at no cost
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {freeCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`flex flex-col p-4 rounded-lg border ${course.featured ? 'border-purple-500/50' : 'border-purple-800/30'} hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm ${course.featured ? 'shadow-[0_0_12px_rgba(139,92,246,0.3)]' : ''}`}
                  >
                    {course.featured && (
                      <Badge variant="default" className="self-start mb-2 bg-gradient-to-r from-purple-600 to-blue-600">
                        Featured Course
                      </Badge>
                    )}
                    
                    <div className="flex justify-between mb-2">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[
                            course.type as keyof typeof categoryColors
                          ] || "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        }`}
                      >
                        {course.type}
                      </div>
                      <span className="text-xs text-white/70">
                        {course.duration} • {course.students} students
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="font-medium text-white/90 text-lg">{course.title}</div>
                      <p className="text-sm text-white/70">
                        {course.provider} • {course.platform}
                      </p>
                      <p className="text-sm text-white/70 mt-1 line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.topics.map((topic, i) => (
                        <span key={i} className="inline-flex px-2 py-0.5 bg-purple-500/10 text-purple-300 text-xs rounded border border-purple-500/20">
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <AnimatedButton 
                        variant="outline" 
                        size="sm"
                        className="border-purple-500/30 hover:border-purple-400/60"
                        onClick={() => window.open(course.link, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Visit Course
                      </AnimatedButton>
                      <AnimatedButton 
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleEnroll(course.id)}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Enroll Free
                      </AnimatedButton>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                        <AnimatedButton variant="ghost" size="sm">
                          Resume
                        </AnimatedButton>
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

                    <AnimatedButton 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 sm:mt-0 border-purple-500/30 hover:border-purple-400/60"
                    >
                      Enroll
                    </AnimatedButton>
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
