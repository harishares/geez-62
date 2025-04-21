
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, MessageSquare, PhoneCall, Star, User, Video } from "lucide-react";
import { UPIPayment } from "@/components/payment/UPIPayment";
import { SubscriptionCard } from "./SubscriptionCard";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

type Mentor = {
  id: string;
  full_name: string;
  category: string;
  experience_years: number;
  languages: string[];
  rating: number;
  bio: string;
  intro_video_url?: string;
  available_slots?: string[] | Json;
  hourly_rate: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
};

type MentorProfileProps = {
  mentor: Mentor;
};

// Sample video lessons data
const VIDEO_LESSONS = [
  { id: "1", title: "Introduction to the Subject", duration: "10:24", thumbnail: "https://placehold.co/300x200/8B5CF6/ffffff?text=Intro" },
  { id: "2", title: "Core Concepts Explained", duration: "15:42", thumbnail: "https://placehold.co/300x200/7C3AED/ffffff?text=Core+Concepts" },
  { id: "3", title: "Advanced Techniques", duration: "23:18", thumbnail: "https://placehold.co/300x200/6D28D9/ffffff?text=Advanced" },
  { id: "4", title: "Problem-Solving Session", duration: "31:05", thumbnail: "https://placehold.co/300x200/5B21B6/ffffff?text=Problem+Solving" },
  { id: "5", title: "Q&A with Students", duration: "18:50", thumbnail: "https://placehold.co/300x200/4C1D95/ffffff?text=Q%26A" }
];

// Sample available time slots
const TIME_SLOTS = [
  "Monday, 10:00 AM - 11:00 AM",
  "Monday, 3:00 PM - 4:00 PM",
  "Tuesday, 11:00 AM - 12:00 PM",
  "Wednesday, 2:00 PM - 3:00 PM",
  "Friday, 9:00 AM - 10:00 AM"
];

export function MentorProfile({ mentor }: MentorProfileProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleSubscriptionSuccess = () => {
    setIsSubscribed(true);
    toast.success("You've successfully subscribed to Mentorship Pro!");
  };

  const handleBookSession = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot first");
      return;
    }
    
    toast.success(`Session booked for ${selectedSlot}`);
    setSelectedSlot(null);
  };

  const handleContactMentor = (type: 'video' | 'audio' | 'message') => {
    if (!isSubscribed) {
      toast.error("Please subscribe to Mentorship Pro to use this feature");
      return;
    }
    
    const actions = {
      'video': 'start a video call',
      'audio': 'start an audio call',
      'message': 'send a message'
    };
    
    toast.success(`You'll now ${actions[type]} with ${mentor.full_name}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left side - Mentor info */}
      <div className="md:col-span-1 space-y-4">
        <div className="flex flex-col items-center text-center space-y-3 p-4">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.full_name)}&background=8B5CF6&color=fff&size=128`} />
            <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
            <h2 className="text-xl font-bold">{mentor.full_name}</h2>
            <p className="text-sm text-muted-foreground">{mentor.category}</p>
            
            <div className="flex items-center justify-center">
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-amber-500" />
                <span className="text-sm ml-1">{mentor.rating}/5.0</span>
              </div>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{mentor.experience_years} years exp.</span>
            </div>
            
            <div className="flex flex-wrap gap-1 justify-center mt-2">
              {mentor.languages.map((lang) => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-3 p-4">
          <h3 className="font-medium">About Me</h3>
          <p className="text-sm text-muted-foreground">{mentor.bio}</p>
          
          {isSubscribed && (
            <div className="pt-4 space-y-2">
              <h3 className="font-medium">Contact Options</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button onClick={() => handleContactMentor('video')} variant="outline" size="sm" className="w-full">
                  <Video className="mr-2 h-4 w-4" />
                  Video
                </Button>
                <Button onClick={() => handleContactMentor('audio')} variant="outline" size="sm" className="w-full">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Audio
                </Button>
                <Button onClick={() => handleContactMentor('message')} variant="outline" size="sm" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {!isSubscribed && (
          <div className="p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Start Free Trial</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <UPIPayment amount={50} onSuccess={handleSubscriptionSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      
      {/* Right side - Tabs for different sections */}
      <div className="md:col-span-2">
        <Tabs defaultValue="videos">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="videos">Video Lessons</TabsTrigger>
            <TabsTrigger value="schedule">Available Slots</TabsTrigger>
          </TabsList>
          
          {/* Introduction tab with video */}
          <TabsContent value="intro" className="pt-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Meet Your Mentor</h3>
              
              <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-lg">
                {mentor.intro_video_url ? (
                  <iframe
                    src={mentor.intro_video_url}
                    className="h-full w-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-muted text-muted-foreground">
                    <Video className="h-12 w-12" />
                    <p className="ml-2">Introduction video coming soon</p>
                  </div>
                )}
              </AspectRatio>
              
              <div className="mt-4">
                <h3 className="font-semibold">What you'll learn</h3>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                  <li>Practical skills in {mentor.category}</li>
                  <li>Real-world problem solving techniques</li>
                  <li>Industry-specific best practices</li>
                  <li>Career guidance and mentorship</li>
                  <li>Personalized learning path</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          {/* Free video lessons tab */}
          <TabsContent value="videos" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Free Video Lessons</h3>
                {!isSubscribed && (
                  <Badge variant="outline" className="text-xs">5 of 20+ videos</Badge>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VIDEO_LESSONS.map((video) => (
                  <div key={video.id} className="rounded-lg overflow-hidden border group cursor-pointer hover:shadow-md transition-all">
                    <div className="relative">
                      <AspectRatio ratio={16 / 9}>
                        <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full" />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="text-white">
                          <Video className="h-8 w-8" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm">{video.title}</h4>
                      <p className="text-xs text-muted-foreground">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {!isSubscribed && (
                <div className="bg-muted p-4 rounded-lg text-center mt-4">
                  <p className="text-sm mb-2">Unlock all 20+ video lessons with a subscription</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Start Free Trial</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <UPIPayment amount={50} onSuccess={handleSubscriptionSuccess} />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Available time slots tab */}
          <TabsContent value="schedule" className="pt-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Available Time Slots</h3>
              
              <div className="grid grid-cols-1 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <div 
                    key={slot}
                    className={`p-3 border rounded-lg flex items-center cursor-pointer transition-all ${selectedSlot === slot ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{slot}</span>
                  </div>
                ))}
              </div>
              
              {!isSubscribed ? (
                <div className="bg-muted p-4 rounded-lg text-center mt-4">
                  <p className="text-sm mb-2">Subscribe to book sessions with this mentor</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Upgrade to Pro</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <UPIPayment amount={50} onSuccess={handleSubscriptionSuccess} />
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <Button 
                  className="w-full mt-4" 
                  disabled={!selectedSlot}
                  onClick={handleBookSession}
                >
                  Book Session
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
