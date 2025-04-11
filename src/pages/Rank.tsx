
import { useState } from "react";
import { 
  Award, 
  Check, 
  Edit2, 
  Medal, 
  Save, 
  Star, 
  Trophy, 
  UserCircle
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
import { 
  Avatar, 
  AvatarFallback 
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

// Dummy data for user rankings
const initialRankings = [
  { id: 1, name: "John Doe", points: 1250, tasks: 48, rank: 1, avatar: "JD" },
  { id: 2, name: "Sarah Smith", points: 1120, tasks: 42, rank: 2, avatar: "SS" },
  { id: 3, name: "Michael Johnson", points: 980, tasks: 35, rank: 3, avatar: "MJ" },
  { id: 4, name: "Emily Brown", points: 860, tasks: 29, rank: 4, avatar: "EB" },
  { id: 5, name: "Alex Turner", points: 750, tasks: 27, rank: 5, avatar: "AT" },
  { id: 6, name: "Lisa Chen", points: 680, tasks: 25, rank: 6, avatar: "LC" },
  { id: 7, name: "David Wilson", points: 620, tasks: 22, rank: 7, avatar: "DW" },
  { id: 8, name: "Olivia Martinez", points: 550, tasks: 18, rank: 8, avatar: "OM" },
  { id: 9, name: "James Baker", points: 480, tasks: 15, rank: 9, avatar: "JB" },
  { id: 10, name: "Sophia Lee", points: 400, tasks: 12, rank: 10, avatar: "SL" },
];

export default function Rank() {
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    bio: "Computer Science major at State University",
    email: "john.doe@example.com",
    college: "State University",
    interests: "AI, Machine Learning, Web Development"
  });
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [rankings, setRankings] = useState(initialRankings);
  
  // Profile editing functions
  const handleEdit = () => {
    setEditMode(true);
    setEditedProfile(userProfile);
  };

  const handleSave = () => {
    setUserProfile(editedProfile);
    setEditMode(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  // Rank badge component
  const RankBadge = ({ rank }: { rank: number }) => {
    const getBadgeDetails = (rank: number) => {
      if (rank === 1) return { icon: Trophy, color: "text-yellow-400 bg-yellow-400/20" };
      if (rank === 2) return { icon: Medal, color: "text-gray-300 bg-gray-400/20" };
      if (rank === 3) return { icon: Medal, color: "text-amber-600 bg-amber-600/20" };
      return { icon: Star, color: "text-purple-400 bg-purple-400/20" };
    };

    const { icon: Icon, color } = getBadgeDetails(rank);
    
    return (
      <div className={`flex items-center justify-center h-8 w-8 rounded-full ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rank & Leaderboard</h1>
        <p className="text-muted-foreground">
          Track your performance and compare with other users
        </p>
      </div>

      <Tabs defaultValue="leaderboard">
        <TabsList>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="my-profile">My Profile</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leaderboard" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>
                Users ranked by task completion and points earned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rankings.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4">
                      <RankBadge rank={user.rank} />
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                          <AvatarFallback className="bg-purple-950/50 text-purple-200">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.tasks} tasks • {user.points} points
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-purple-300">
                        #{user.rank}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-profile" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>
                    Your information and statistics
                  </CardDescription>
                </div>
                {!editMode ? (
                  <AnimatedButton onClick={handleEdit} variant="outline" slideContent={true}>
                    <Edit2 className="h-4 w-4" /> Edit Profile
                  </AnimatedButton>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleCancel} variant="outline">Cancel</Button>
                    <AnimatedButton 
                      onClick={handleSave} 
                      glowColor="rgba(124, 58, 237, 0.7)"
                    >
                      <Save className="h-4 w-4" /> Save Changes
                    </AnimatedButton>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-24 w-24 border-4 border-purple-500/30">
                      <AvatarFallback className="bg-purple-950/50 text-purple-200 text-2xl">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <Award className="h-5 w-5 text-yellow-400" />
                      <span className="font-medium">Rank #1</span>
                    </div>
                    <div className="text-sm text-muted-foreground">1250 points</div>
                  </div>

                  <div className="flex-1 space-y-4">
                    {!editMode ? (
                      <>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                          <p className="text-lg">{userProfile.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                          <p>{userProfile.bio}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                            <p>{userProfile.email}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">College</h3>
                            <p>{userProfile.college}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Interests</h3>
                          <p>{userProfile.interests}</p>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Name</label>
                          <Input 
                            name="name"
                            value={editedProfile.name}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Bio</label>
                          <Input 
                            name="bio"
                            value={editedProfile.bio}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Email</label>
                            <Input 
                              name="email"
                              value={editedProfile.email}
                              onChange={handleInputChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">College</label>
                            <Input 
                              name="college"
                              value={editedProfile.college}
                              onChange={handleInputChange}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Interests</label>
                          <Input 
                            name="interests"
                            value={editedProfile.interests}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-black/20 border-purple-800/20">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-300">48</div>
                        <p className="text-muted-foreground mt-1">Tasks Completed</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/20 border-purple-800/20">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-300">1250</div>
                        <p className="text-muted-foreground mt-1">Total Points</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/20 border-purple-800/20">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-300">12</div>
                        <p className="text-muted-foreground mt-1">Achievements</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Track your badges and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "Early Adopter", desc: "Joined during the first month", icon: Star, unlocked: true },
                  { name: "Task Master", desc: "Completed 50 tasks", icon: Check, unlocked: false },
                  { name: "Networking Pro", desc: "Connected with 20+ users", icon: UserCircle, unlocked: true },
                  { name: "Point Collector", desc: "Earned 1000+ points", icon: Award, unlocked: true },
                  { name: "Top Performer", desc: "Ranked #1 for a week", icon: Trophy, unlocked: true },
                  { name: "Consistent User", desc: "Logged in for 30 consecutive days", icon: Check, unlocked: false }
                ].map((achievement, i) => (
                  <Card key={i} className={`border-purple-800/20 ${achievement.unlocked ? 'bg-purple-950/30' : 'bg-black/30 opacity-60'}`}>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-3">
                        <div className={`mx-auto rounded-full w-14 h-14 flex items-center justify-center ${achievement.unlocked ? 'bg-purple-500/20' : 'bg-gray-800/50'}`}>
                          <achievement.icon className={`h-7 w-7 ${achievement.unlocked ? 'text-purple-300' : 'text-gray-500'}`} />
                        </div>
                        <h3 className="font-medium">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                        {achievement.unlocked ? (
                          <div className="text-xs bg-purple-500/20 text-purple-300 py-1 px-2 rounded-full inline-block">
                            Unlocked
                          </div>
                        ) : (
                          <div className="text-xs bg-gray-800/50 text-gray-400 py-1 px-2 rounded-full inline-block">
                            Locked
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
