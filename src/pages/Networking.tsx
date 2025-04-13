
import { useState } from "react";
import { Network, Filter, Plus, Search, Users, MessageSquare, UserPlus, Mail, ExternalLink, Share2, Send } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function Networking() {
  // State for connections and messaging
  const [connectedStudents, setConnectedStudents] = useState<number[]>([]);
  const [connectedMentors, setConnectedMentors] = useState<number[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);
  const [openChat, setOpenChat] = useState<{id: number, type: string, name: string} | null>(null);
  const [messageText, setMessageText] = useState("");
  const [chatMessages, setChatMessages] = useState<{senderId: number, text: string, timestamp: Date}[]>([]);

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
      online: true,
      avatar: null,
    },
    {
      id: 2,
      name: "Maya Patel",
      university: "MIT",
      major: "Electrical Engineering",
      year: "Senior",
      interests: ["Robotics", "IoT", "Sustainable Energy"],
      mutual: 5,
      online: false,
      avatar: null,
    },
    {
      id: 3,
      name: "Carlos Rodriguez",
      university: "UC Berkeley",
      major: "Data Science",
      year: "Sophomore",
      interests: ["Machine Learning", "Big Data", "Analytics"],
      mutual: 2,
      online: true,
      avatar: null,
    },
    {
      id: 4,
      name: "Sophia Chen",
      university: "NYU",
      major: "Digital Marketing",
      year: "Senior",
      interests: ["Social Media", "Content Strategy", "Analytics"],
      mutual: 1,
      online: true,
      avatar: null,
    },
    {
      id: 5,
      name: "James Wilson",
      university: "Georgia Tech",
      major: "Mechanical Engineering",
      year: "Junior",
      interests: ["Robotics", "3D Printing", "Sustainable Design"],
      mutual: 4,
      online: false,
      avatar: null,
    },
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Miller",
      position: "AI Research Lead",
      company: "TechInnovate",
      expertise: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
      availability: "2 slots available",
      rating: "4.9/5",
      avatar: null,
    },
    {
      id: 2,
      name: "Michael Chan",
      position: "Senior Software Engineer",
      company: "Google",
      expertise: ["Cloud Architecture", "System Design", "Backend Development"],
      availability: "1 slot available",
      rating: "4.8/5",
      avatar: null,
    },
    {
      id: 3,
      name: "Elena Kowalski",
      position: "Product Manager",
      company: "Microsoft",
      expertise: ["Product Strategy", "User Research", "Go-to-market"],
      availability: "Waitlist open",
      rating: "4.7/5",
      avatar: null,
    },
  ];

  const categoryColors = {
    Community: "bg-green-500/20 text-green-500 border-green-500/20",
    Mentorship: "bg-blue-500/20 text-blue-500 border-blue-500/20",
    "Project Teams": "bg-purple-500/20 text-purple-500 border-purple-500/20",
  };

  // Function to handle student connection
  const handleConnect = (id: number, type: string) => {
    if (type === "student") {
      if (connectedStudents.includes(id)) {
        setConnectedStudents(connectedStudents.filter(studentId => studentId !== id));
        toast({
          title: "Connection Removed",
          description: "You have disconnected from this student.",
        });
      } else {
        setConnectedStudents([...connectedStudents, id]);
        toast({
          title: "Connection Request Sent",
          description: "Your request has been sent. We'll notify you when they respond.",
        });
      }
    } else if (type === "mentor") {
      if (connectedMentors.includes(id)) {
        setConnectedMentors(connectedMentors.filter(mentorId => mentorId !== id));
        toast({
          title: "Mentorship Cancelled",
          description: "You have cancelled your mentorship request.",
        });
      } else {
        setConnectedMentors([...connectedMentors, id]);
        toast({
          title: "Mentorship Request Sent",
          description: "Your request has been sent. We'll notify you when they respond.",
        });
      }
    }
  };

  // Function to handle joining a community
  const handleJoin = (id: number) => {
    if (joinedCommunities.includes(id)) {
      setJoinedCommunities(joinedCommunities.filter(communityId => communityId !== id));
      toast({
        title: "Left Community",
        description: "You have left the community.",
      });
    } else {
      setJoinedCommunities([...joinedCommunities, id]);
      toast({
        title: "Community Joined",
        description: "Welcome to the community! You can now access all resources.",
      });
    }
  };

  // Function to open chat with a connection
  const handleOpenChat = (id: number, type: string, name: string) => {
    setOpenChat({id, type, name});
    // In a real app, we would fetch previous messages here
    setChatMessages([]);
  };

  // Function to send a message
  const handleSendMessage = () => {
    if (!messageText.trim() || !openChat) return;
    
    const newMessage = {
      senderId: 0, // 0 represents the current user
      text: messageText,
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessageText("");
    
    // Simulate a response after a delay
    setTimeout(() => {
      const responseMessage = {
        senderId: openChat.id,
        text: `Thanks for your message! This is an automated response from ${openChat.name}.`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, responseMessage]);
    }, 1000);
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
          <Button variant="outline" size="icon" className="hover:bg-purple-900/20 hover:border-purple-500/50 transition-colors">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <AnimatedButton glowColor="rgba(139, 92, 246, 0.6)">
          <Plus className="h-4 w-4 mr-2" />
          Connect
        </AnimatedButton>
      </div>

      <Tabs defaultValue="students">
        <div className="flex items-center justify-between">
          <TabsList className="p-1 bg-black/20 backdrop-blur-sm border border-purple-800/30">
            <TabsTrigger value="students" className="spark-border data-[state=active]:bg-purple-800/30">
              <Users className="h-4 w-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger value="mentors" className="spark-border data-[state=active]:bg-purple-800/30">
              <UserPlus className="h-4 w-4 mr-2" />
              Mentors
            </TabsTrigger>
            <TabsTrigger value="communities" className="spark-border data-[state=active]:bg-purple-800/30">
              <Network className="h-4 w-4 mr-2" />
              Communities
            </TabsTrigger>
            <TabsTrigger value="messages" className="spark-border data-[state=active]:bg-purple-800/30">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>
          <div className="hidden sm:block">
            <Select defaultValue="suggested">
              <SelectTrigger className="w-[180px] border-purple-800/30 bg-black/20 backdrop-blur-sm">
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
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-purple-800/30 bg-purple-900/30">
                          <AvatarFallback className="bg-gradient-to-br from-purple-600/70 to-indigo-600/70 text-white">
                            {student.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {student.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-white/90">{student.name}</span>
                          {student.online && (
                            <span className="ml-2 text-xs text-green-400">Online</span>
                          )}
                        </div>
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
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-purple-900/20 hover:border-purple-500/50 transition-colors group w-full sm:w-auto"
                          onClick={() => handleOpenChat(student.id, "student", student.name)}
                          disabled={!connectedStudents.includes(student.id)}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          <span className="group-hover:translate-x-0.5 transition-transform duration-200">Message</span>
                        </Button>
                        <AnimatedButton 
                          size="sm" 
                          className={connectedStudents.includes(student.id) ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}
                          onClick={() => handleConnect(student.id, "student")}
                        >
                          {connectedStudents.includes(student.id) ? "Connected" : "Connect"}
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardHeader className="pb-2">
              <CardTitle>Industry Mentors</CardTitle>
              <CardDescription>
                Connect with industry professionals for guidance and mentorship
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <Avatar className="h-12 w-12 border-2 border-blue-500/30 bg-blue-900/30">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600/70 to-purple-600/70 text-white">
                          {mentor.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white/90">{mentor.name}</div>
                        <p className="text-sm text-white/70">
                          {mentor.position} • {mentor.company} • Rating: {mentor.rating}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {mentor.expertise.map((skill, i) => (
                            <span key={i} className="inline-flex px-2 py-0.5 bg-blue-500/10 text-blue-300 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <span className="text-xs text-white/60">{mentor.availability}</span>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-purple-900/20 hover:border-purple-500/50 transition-colors group w-full sm:w-auto"
                          onClick={() => handleOpenChat(mentor.id, "mentor", mentor.name)}
                          disabled={!connectedMentors.includes(mentor.id)}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          <span className="group-hover:translate-x-0.5 transition-transform duration-200">Message</span>
                        </Button>
                        <AnimatedButton 
                          size="sm" 
                          className={connectedMentors.includes(mentor.id) ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
                          onClick={() => handleConnect(mentor.id, "mentor")}
                        >
                          {connectedMentors.includes(mentor.id) ? "Connected" : "Request Mentorship"}
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hover:bg-purple-900/20 hover:border-purple-500/50 transition-colors group">
                        <Share2 className="h-3 w-3 mr-1" />
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">Share</span>
                      </Button>
                      <AnimatedButton 
                        variant="default" 
                        size="sm" 
                        className={joinedCommunities.includes(community.id) ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700"}
                        onClick={() => handleJoin(community.id)}
                      >
                        {joinedCommunities.includes(community.id) ? "Joined" : "Join"}
                      </AnimatedButton>
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
              {openChat ? (
                <div className="flex flex-col h-[400px]">
                  <div className="flex items-center gap-3 border-b border-purple-800/30 pb-3 mb-3">
                    <Avatar className="h-10 w-10 border-2 border-purple-800/30 bg-purple-900/30">
                      <AvatarFallback className="bg-gradient-to-br from-purple-600/70 to-indigo-600/70 text-white">
                        {openChat.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-white/90">{openChat.name}</div>
                      <p className="text-xs text-white/70">
                        {openChat.type === "student" ? "Student" : "Mentor"}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-auto"
                      onClick={() => setOpenChat(null)}
                    >
                      Close
                    </Button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto mb-3 space-y-3 p-2">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <p>No messages yet</p>
                        <p className="text-sm">Send a message to start the conversation</p>
                      </div>
                    ) : (
                      chatMessages.map((message, index) => (
                        <div 
                          key={index}
                          className={`flex ${message.senderId === 0 ? "justify-end" : "justify-start"}`}
                        >
                          <div 
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              message.senderId === 0 
                                ? "bg-purple-600/50 text-white" 
                                : "bg-black/30 border border-purple-800/30"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs text-white/60 mt-1">
                              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    <Input 
                      placeholder="Type a message..." 
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                connectedStudents.length > 0 || connectedMentors.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium mb-2">Recent Connections</h3>
                    
                    {connectedStudents.map(id => {
                      const student = students.find(s => s.id === id);
                      if (!student) return null;
                      
                      return (
                        <div 
                          key={`student-${id}`}
                          className="flex items-center gap-3 p-3 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm cursor-pointer"
                          onClick={() => handleOpenChat(id, "student", student.name)}
                        >
                          <Avatar className="h-10 w-10 border-2 border-purple-800/30 bg-purple-900/30">
                            <AvatarFallback className="bg-gradient-to-br from-purple-600/70 to-indigo-600/70 text-white">
                              {student.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-white/90">{student.name}</div>
                            <p className="text-xs text-white/70">
                              Student • {student.university}
                            </p>
                          </div>
                          <MessageSquare className="h-4 w-4 ml-auto text-purple-400" />
                        </div>
                      );
                    })}
                    
                    {connectedMentors.map(id => {
                      const mentor = mentors.find(m => m.id === id);
                      if (!mentor) return null;
                      
                      return (
                        <div 
                          key={`mentor-${id}`}
                          className="flex items-center gap-3 p-3 rounded-lg border border-purple-800/30 hover:bg-purple-900/20 transition-colors bg-black/15 backdrop-blur-sm cursor-pointer"
                          onClick={() => handleOpenChat(id, "mentor", mentor.name)}
                        >
                          <Avatar className="h-10 w-10 border-2 border-blue-500/30 bg-blue-900/30">
                            <AvatarFallback className="bg-gradient-to-br from-blue-600/70 to-purple-600/70 text-white">
                              {mentor.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-white/90">{mentor.name}</div>
                            <p className="text-xs text-white/70">
                              Mentor • {mentor.company}
                            </p>
                          </div>
                          <MessageSquare className="h-4 w-4 ml-auto text-blue-400" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-12 text-muted-foreground">
                    <div className="text-center">
                      <MessageSquare className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                      <h3 className="text-lg font-medium">No messages yet</h3>
                      <p className="text-sm mt-2">
                        Connect with students and mentors to start conversations
                      </p>
                      <AnimatedButton className="mt-4 bg-purple-600 hover:bg-purple-700">
                        Start Networking
                      </AnimatedButton>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
