
import { useState } from "react";
import { Filter, Plus, Search } from "lucide-react";
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
import { toast } from "@/hooks/use-toast";

export default function Events() {
  // State for registered events
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  
  // Sample data for the events section
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

  const categoryColors = {
    Workshop: "bg-primary/20 text-primary border-primary/20",
    Hackathon: "bg-secondary/20 text-secondary border-secondary/20",
    Webinar: "bg-accent/20 text-accent border-accent/20",
  };

  // Function to handle event registration
  const handleRegister = (eventId: number) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      toast({
        title: "Registration Cancelled",
        description: "You have cancelled your registration for this event.",
      });
    } else {
      setRegisteredEvents([...registeredEvents, eventId]);
      toast({
        title: "Registration Successful",
        description: "You have successfully registered for this event!",
      });
    }
  };

  // Function to add a new event
  const handleAddEvent = () => {
    toast({
      title: "Create Event",
      description: "Event creation form will be displayed here.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">
          Discover workshops, hackathons, webinars, and more
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={handleAddEvent}>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="registered">Registered</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
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

        <TabsContent value="upcoming" className="mt-4">
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

                    <Button 
                      variant={registeredEvents.includes(event.id) ? "default" : "outline"} 
                      size="sm" 
                      className={registeredEvents.includes(event.id) ? "bg-green-600 hover:bg-green-700" : "mt-2 sm:mt-0"}
                      onClick={() => handleRegister(event.id)}
                    >
                      {registeredEvents.includes(event.id) ? "Registered" : "Register"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registered" className="mt-4">
          <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
            <CardContent className="pt-6">
              {registeredEvents.length > 0 ? (
                <div className="space-y-4">
                  {events
                    .filter(event => registeredEvents.includes(event.id))
                    .map(event => (
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

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-red-600/20 hover:bg-red-700/30 hover:text-white border-red-500/30 text-red-200"
                          onClick={() => handleRegister(event.id)}
                        >
                          Cancel Registration
                        </Button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-12 text-muted-foreground">
                  <div className="text-center">
                    <p className="text-lg">You haven't registered for any events yet.</p>
                    <p className="text-sm mt-2">Browse upcoming events and register to see them here.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
