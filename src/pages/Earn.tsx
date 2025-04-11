
import { Coins, Filter, Plus, Search, Award, Lightbulb, Briefcase, DollarSign, ExternalLink } from "lucide-react";
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
import { toast } from "@/hooks/use-toast";

export default function Earn() {
  // Sample data for earning opportunities
  const opportunities = [
    {
      id: 1,
      type: "Brand Ambassador",
      company: "TechGadget",
      earnings: "$15-25/hr",
      duration: "Flexible",
      requirements: "Active social media presence, tech enthusiasm",
      description: "Promote our latest tech gadgets on your campus and social media.",
    },
    {
      id: 2,
      type: "Content Creator",
      company: "EduPlatform",
      earnings: "$50-100/piece",
      duration: "Project-based",
      requirements: "Strong writing skills, subject expertise",
      description: "Create engaging educational content in your field of study.",
    },
    {
      id: 3,
      type: "Research Participant",
      company: "InnovateLabs",
      earnings: "$20-30/session",
      duration: "1-2 hours",
      requirements: "No special skills required",
      description: "Participate in user research studies for new products and services.",
    },
  ];

  // New corporate projects data
  const corporateProjects = [
    {
      id: 1,
      type: "Web Development",
      company: "TechSolutions Inc.",
      project: "E-commerce Platform Redesign",
      compensation: "$2,000-3,500",
      duration: "2-3 months",
      skills: ["React", "Node.js", "UI/UX"],
      deadline: "Apr 30, 2025",
      description: "Collaborate with our design team to implement a modern e-commerce experience for a leading retail client.",
      featured: true,
    },
    {
      id: 2,
      type: "Data Analysis",
      company: "FinTech Innovations",
      project: "Customer Behavior Analysis",
      compensation: "$1,500-2,000",
      duration: "1-2 months",
      skills: ["Python", "SQL", "Data Visualization"],
      deadline: "May 15, 2025",
      description: "Analyze customer transaction data to identify patterns and provide actionable insights for product improvement.",
      featured: false,
    },
    {
      id: 3,
      type: "UX Research",
      company: "HealthTech Solutions",
      project: "Medical App User Testing",
      compensation: "$1,800-2,200",
      duration: "6-8 weeks",
      skills: ["User Testing", "Prototyping", "Research Methods"],
      deadline: "Apr 25, 2025",
      description: "Conduct user testing sessions for a new healthcare app, analyze feedback and provide recommendations for improvements.",
      featured: true,
    },
  ];

  const appRecommendations = [
    {
      id: 1,
      name: "StudySmart",
      category: "Productivity",
      earnings: "Up to $150",
      description: "Earn by completing study sessions and referring friends.",
      userRating: "4.8/5",
    },
    {
      id: 2,
      name: "SurveyPro",
      category: "Market Research",
      earnings: "$5-20/survey",
      description: "Complete surveys from top brands and research companies.",
      userRating: "4.5/5",
    },
    {
      id: 3,
      name: "SkillShare",
      category: "Education",
      earnings: "Variable",
      description: "Teach skills you're good at to other students and get paid.",
      userRating: "4.7/5",
    },
  ];

  const categoryColors = {
    "Brand Ambassador": "bg-green-500/20 text-green-500 border-green-500/20",
    "Content Creator": "bg-blue-500/20 text-blue-500 border-blue-500/20",
    "Research Participant": "bg-purple-500/20 text-purple-500 border-purple-500/20",
    "Web Development": "bg-indigo-500/20 text-indigo-400 border-indigo-500/20",
    "Data Analysis": "bg-cyan-500/20 text-cyan-400 border-cyan-500/20",
    "UX Research": "bg-pink-500/20 text-pink-400 border-pink-500/20",
  };

  const handleApply = (projectId: number) => {
    toast({
      title: "Application Submitted",
      description: "Your application has been received. We'll notify you of updates.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Earn</h1>
        <p className="text-muted-foreground">
          Discover opportunities to earn while you learn
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search opportunities..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon" className="hover:bg-purple-900/20 hover:border-purple-500/50 transition-colors">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <AnimatedButton glowColor="rgba(139, 92, 246, 0.6)">
          <Plus className="h-4 w-4 mr-2" />
          Set Earning Preferences
        </AnimatedButton>
      </div>

      <Tabs defaultValue="corporate">
        <div className="flex items-center justify-between">
          <TabsList className="p-1 bg-black/20 backdrop-blur-sm border border-purple-800/30">
            <TabsTrigger value="corporate" className="spark-border data-[state=active]:bg-purple-800/30">
              <Briefcase className="h-4 w-4 mr-2" />
              Corporate Projects
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="spark-border data-[state=active]:bg-purple-800/30">
              <DollarSign className="h-4 w-4 mr-2" />
              Quick Opportunities
            </TabsTrigger>
            <TabsTrigger value="apps" className="spark-border data-[state=active]:bg-purple-800/30">
              <Lightbulb className="h-4 w-4 mr-2" />
              App Recommendations
            </TabsTrigger>
            <TabsTrigger value="earnings" className="spark-border data-[state=active]:bg-purple-800/30">
              <Coins className="h-4 w-4 mr-2" />
              My Earnings
            </TabsTrigger>
          </TabsList>
          <div className="hidden sm:block">
            <Select defaultValue="earnings">
              <SelectTrigger className="w-[180px] border-purple-800/30 bg-black/20 backdrop-blur-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="earnings">Highest earnings</SelectItem>
                <SelectItem value="deadline">Upcoming deadline</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="recommended">Recommended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="corporate" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Corporate Projects</CardTitle>
              <CardDescription>
                Real-world projects from companies looking for student talent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {corporateProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`relative flex flex-col p-4 rounded-lg border ${project.featured ? 'border-purple-500/50' : 'border-purple-800/30'} hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm ${project.featured ? 'shadow-[0_0_12px_rgba(139,92,246,0.3)]' : ''}`}
                  >
                    {project.featured && (
                      <div className="absolute -top-3 right-4 px-3 py-1 bg-purple-600 rounded-full text-xs font-medium text-white shadow-lg">
                        Featured Project
                      </div>
                    )}
                    <div className="flex justify-between mb-2 mt-2">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[
                            project.type as keyof typeof categoryColors
                          ] || "bg-violet-500/10 text-violet-400 border-violet-500/20"
                        }`}
                      >
                        {project.type}
                      </div>
                      <span className="text-xs text-red-300/80 font-medium flex items-center">
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Deadline: {project.deadline}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="font-medium text-white/90 text-lg mb-1">{project.project}</div>
                      <p className="text-sm text-white/70">
                        {project.company} • {project.compensation} • {project.duration}
                      </p>
                      <p className="text-sm text-white/70 mt-2">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.skills.map((skill, i) => (
                          <span key={i} className="inline-flex px-2 py-0.5 bg-purple-500/10 text-purple-300 text-xs rounded border border-purple-500/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">Skills match: Strong</span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-purple-900/30 hover:border-purple-500/50 transition-colors group"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform duration-200">Details</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                        <AnimatedButton 
                          size="sm"
                          onClick={() => handleApply(project.id)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Apply Now
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Quick Earning Opportunities</CardTitle>
              <CardDescription>
                AI-matched opportunities based on your profile and skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-0">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[
                            opportunity.type as keyof typeof categoryColors
                          ] || "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }`}
                      >
                        {opportunity.type}
                      </div>
                      <div>
                        <div className="font-medium text-white/90">{opportunity.company}</div>
                        <p className="text-sm text-white/70">
                          {opportunity.earnings} • {opportunity.duration}
                        </p>
                        <p className="text-sm text-white/70">
                          Requirements: {opportunity.requirements}
                        </p>
                        <p className="text-sm text-white/70 line-clamp-1 mt-1">
                          {opportunity.description}
                        </p>
                      </div>
                    </div>

                    <AnimatedButton 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 sm:mt-0 border-purple-500/30 hover:border-purple-400/60"
                    >
                      Apply
                    </AnimatedButton>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apps" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>App Recommendations</CardTitle>
              <CardDescription>
                Apps that match your interests and can help you earn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appRecommendations.map((app) => (
                  <div
                    key={app.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-white/80" />
                      </div>
                      <div>
                        <div className="font-medium text-white/90">{app.name}</div>
                        <p className="text-sm text-white/70">
                          {app.category} • {app.earnings} • Rating: {app.userRating}
                        </p>
                        <p className="text-sm text-white/70 line-clamp-1 mt-1">
                          {app.description}
                        </p>
                      </div>
                    </div>

                    <AnimatedButton 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 sm:mt-0 border-purple-500/30 hover:border-purple-400/60"
                    >
                      Install
                    </AnimatedButton>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>My Earnings</CardTitle>
              <CardDescription>
                Track your earnings from various sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                <div className="text-center">
                  <Coins className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium">No earnings yet</h3>
                  <p className="text-sm mt-2">
                    Apply for opportunities to start earning
                  </p>
                  <AnimatedButton className="mt-4 bg-purple-600 hover:bg-purple-700">
                    Explore Opportunities
                  </AnimatedButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
