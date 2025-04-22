
import { useState } from "react";
import { MentorList } from "@/components/mentorship/MentorList";
import { VideoLibrary } from "@/components/mentorship/VideoLibrary";
import { MentorshipSessions } from "@/components/mentorship/MentorshipSessions";
import { SubscriptionCard } from "@/components/mentorship/SubscriptionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Mentorship() {
  const [selectedTab, setSelectedTab] = useState("browse");
  
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Mentorship Program</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with experienced mentors and accelerate your growth journey.
        </p>
      </div>
      
      <Tabs defaultValue="browse" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6">
          <TabsTrigger value="browse">Browse Mentors</TabsTrigger>
          <TabsTrigger value="videos">Video Library</TabsTrigger>
          <TabsTrigger value="sessions">My Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="space-y-6">
          <MentorList />
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-6">
          <VideoLibrary />
        </TabsContent>
        
        <TabsContent value="sessions" className="space-y-6">
          <MentorshipSessions />
        </TabsContent>
      </Tabs>
      
      {selectedTab === "browse" && (
        <div className="flex justify-center items-center py-8">
          <SubscriptionCard />
        </div>
      )}
    </div>
  );
}
