
import { Coins, Filter, Plus, Search, Award, Lightbulb } from "lucide-react";
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
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Preferences
        </Button>
      </div>

      <Tabs defaultValue="opportunities">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="apps">App Recommendations</TabsTrigger>
            <TabsTrigger value="influencer">Micro-Influencer</TabsTrigger>
            <TabsTrigger value="earnings">My Earnings</TabsTrigger>
          </TabsList>
          <div className="hidden sm:block">
            <Select defaultValue="earnings">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="earnings">Highest earnings</SelectItem>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="opportunities" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Earning Opportunities</CardTitle>
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

                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                      Apply
                    </Button>
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

                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                      Install
                    </Button>
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
                  <Button className="mt-4">Explore Opportunities</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
