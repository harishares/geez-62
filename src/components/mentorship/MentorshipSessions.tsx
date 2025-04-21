
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VideoIcon, PhoneCall, MessageSquare, Calendar, Star, Clock, User } from "lucide-react";
import { toast } from "sonner";

type Session = {
  id: string;
  mentor_name: string;
  mentor_avatar?: string;
  session_type: 'video' | 'audio' | 'message';
  status: 'scheduled' | 'completed' | 'cancelled';
  scheduled_at: string;
  duration_minutes: number;
  topic?: string;
  rated?: boolean;
};

// Sample sessions data
const SAMPLE_SESSIONS: Session[] = [
  {
    id: "1",
    mentor_name: "Dr. Rajiv Sharma",
    session_type: 'video',
    status: 'scheduled',
    scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
    duration_minutes: 30,
    topic: "JavaScript Fundamentals"
  },
  {
    id: "2",
    mentor_name: "Priya Mehta",
    session_type: 'audio',
    status: 'scheduled',
    scheduled_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days later
    duration_minutes: 45,
    topic: "Business Strategy Discussion"
  },
  {
    id: "3",
    mentor_name: "Dr. Rajiv Sharma",
    session_type: 'video',
    status: 'completed',
    scheduled_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    duration_minutes: 60,
    topic: "React Performance Optimization"
  },
  {
    id: "4",
    mentor_name: "Amit Kumar",
    session_type: 'message',
    status: 'completed',
    scheduled_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    duration_minutes: 30,
    topic: "Legal Questions & Answers",
    rated: true
  },
  {
    id: "5",
    mentor_name: "Priya Mehta",
    session_type: 'video',
    status: 'cancelled',
    scheduled_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // yesterday
    duration_minutes: 45,
    topic: "Marketing Strategy Review"
  }
];

export function MentorshipSessions() {
  const [sessions, setSessions] = useState<Session[]>(SAMPLE_SESSIONS);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [rating, setRating] = useState<number>(0);
  
  const upcomingSessions = sessions.filter(s => s.status === 'scheduled');
  const pastSessions = sessions.filter(s => s.status === 'completed' || s.status === 'cancelled');
  
  const handleJoinSession = (session: Session) => {
    toast.success(`Joining ${session.session_type} session with ${session.mentor_name}`);
  };
  
  const handleCancelSession = (sessionId: string) => {
    setSessions(sessions.map(s => s.id === sessionId ? {...s, status: 'cancelled'} : s));
    toast.success("Session cancelled successfully");
  };
  
  const handleRateSession = (sessionId: string, rating: number) => {
    setSessions(sessions.map(s => s.id === sessionId ? {...s, rated: true} : s));
    setSelectedSession(null);
    setRating(0);
    toast.success("Thank you for rating your session!");
  };
  
  const formatSessionDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const getSessionIcon = (type: 'video' | 'audio' | 'message') => {
    switch (type) {
      case 'video': return <VideoIcon className="h-5 w-5" />;
      case 'audio': return <PhoneCall className="h-5 w-5" />;
      case 'message': return <MessageSquare className="h-5 w-5" />;
    }
  };
  
  const getSessionTypeLabel = (type: 'video' | 'audio' | 'message') => {
    switch (type) {
      case 'video': return 'Video Call';
      case 'audio': return 'Audio Call';
      case 'message': return 'Chat Session';
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        
        {/* Upcoming Sessions Tab */}
        <TabsContent value="upcoming" className="pt-4">
          {upcomingSessions.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Upcoming Sessions</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                You don't have any scheduled mentorship sessions. Browse mentors to book your first session.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingSessions.map((session) => (
                <Card key={session.id} className="relative overflow-hidden">
                  {/* Colorful ribbon based on session type */}
                  <div className={`absolute top-0 left-0 w-2 h-full 
                    ${session.session_type === 'video' ? 'bg-primary' : 
                     session.session_type === 'audio' ? 'bg-orange-500' : 'bg-emerald-500'}`} 
                  />
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={session.mentor_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.mentor_name)}&background=8B5CF6&color=fff`} />
                          <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{session.mentor_name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{session.topic}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getSessionIcon(session.session_type)}
                        <span>{getSessionTypeLabel(session.session_type)}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatSessionDate(session.scheduled_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{session.duration_minutes} minutes</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-2 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCancelSession(session.id)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleJoinSession(session)}
                    >
                      Join Session
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Past Sessions Tab */}
        <TabsContent value="past" className="pt-4">
          {pastSessions.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Past Sessions</h3>
              <p className="text-muted-foreground">
                You haven't completed any mentorship sessions yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastSessions.map((session) => (
                <Card key={session.id} className={`relative overflow-hidden ${
                  session.status === 'cancelled' ? 'opacity-70' : ''
                }`}>
                  {/* Status indicator */}
                  <div className={`absolute top-0 left-0 w-2 h-full 
                    ${session.status === 'completed' ? 'bg-emerald-500' : 'bg-muted-foreground'}`} 
                  />
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={session.mentor_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.mentor_name)}&background=8B5CF6&color=fff`} />
                          <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{session.mentor_name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{session.topic}</p>
                        </div>
                      </div>
                      <Badge variant={session.status === 'cancelled' ? "destructive" : "secondary"}>
                        {session.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatSessionDate(session.scheduled_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getSessionIcon(session.session_type)}
                          <span>{getSessionTypeLabel(session.session_type)}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-2 flex justify-end">
                    {session.status === 'completed' && !session.rated && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm"
                            onClick={() => setSelectedSession(session)}
                          >
                            Rate Session
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Rate Your Session</DialogTitle>
                            <DialogDescription>
                              How was your session with {selectedSession?.mentor_name}? Your feedback helps improve our mentorship program.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4 flex flex-col items-center">
                            <div className="flex items-center space-x-2 mb-4">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  className="focus:outline-none"
                                  onClick={() => setRating(star)}
                                >
                                  <Star
                                    className={`h-8 w-8 ${
                                      star <= rating
                                        ? "text-amber-500 fill-amber-500"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                            <p className="text-center text-sm text-muted-foreground">
                              {rating === 1 && "Poor"}
                              {rating === 2 && "Fair"}
                              {rating === 3 && "Good"}
                              {rating === 4 && "Very Good"}
                              {rating === 5 && "Excellent"}
                            </p>
                          </div>
                          
                          <DialogFooter>
                            <Button 
                              type="submit"
                              disabled={rating === 0}
                              onClick={() => selectedSession && handleRateSession(selectedSession.id, rating)}
                            >
                              Submit Rating
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    {session.status === 'completed' && session.rated && (
                      <Badge variant="outline" className="text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500 mr-1" />
                        Rated
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
