
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Star, Book, User } from "lucide-react";
import { MentorProfile } from "./MentorProfile";
import { supabase } from "@/integrations/supabase/client";

// Define the mentor data structure
type Mentor = {
  id: string;
  full_name: string;
  category: string;
  experience_years: number;
  languages: string[];
  rating: number;
  bio: string;
  intro_video_url?: string;
  available_slots?: string[];
  hourly_rate: number;
};

const SAMPLE_MENTORS: Mentor[] = [
  {
    id: "1",
    full_name: "Dr. Rajiv Sharma",
    category: "Computer Science",
    experience_years: 8,
    languages: ["English", "Hindi"],
    rating: 4.8,
    bio: "PhD in Computer Science with expertise in AI and Machine Learning. I love helping students understand complex concepts in simple terms.",
    hourly_rate: 1200
  },
  {
    id: "2",
    full_name: "Priya Mehta",
    category: "Business Strategy",
    experience_years: 5,
    languages: ["English", "Gujarati"],
    rating: 4.6,
    bio: "MBA from IIM-A with experience in startup consulting. I help students build practical business skills.",
    hourly_rate: 1500
  },
  {
    id: "3",
    full_name: "Amit Kumar",
    category: "Law",
    experience_years: 12,
    languages: ["English", "Hindi", "Bengali"],
    rating: 4.9,
    bio: "Former High Court advocate who specializes in teaching corporate law and business regulations.",
    hourly_rate: 2000
  }
];

export function MentorList() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  useEffect(() => {
    async function fetchMentors() {
      try {
        // Attempt to fetch mentors from Supabase
        const { data, error } = await supabase
          .from('mentors')
          .select('*');
          
        if (error) {
          console.error("Error fetching mentors:", error);
          // Fall back to sample data if there's an error
          setMentors(SAMPLE_MENTORS);
        } else if (data && data.length > 0) {
          setMentors(data);
        } else {
          // Use sample data if no mentors found
          setMentors(SAMPLE_MENTORS);
        }
      } catch (err) {
        console.error("Failed to fetch mentors:", err);
        setMentors(SAMPLE_MENTORS);
      } finally {
        setLoading(false);
      }
    }

    fetchMentors();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeletons
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-6">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))
        ) : (
          mentors.map((mentor) => (
            <Card key={mentor.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.full_name)}&background=8B5CF6&color=fff`} />
                    <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{mentor.full_name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/5">
                        {mentor.category}
                      </Badge>
                      <div className="flex items-center text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500" />
                        <span className="text-xs ml-1">{mentor.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Book className="h-4 w-4" />
                    <span>{mentor.experience_years} years experience</span>
                  </div>
                  <p className="text-sm line-clamp-2">{mentor.bio}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mentor.languages.map((lang) => (
                      <Badge key={lang} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="bg-muted/50 p-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full"
                      onClick={() => setSelectedMentor(mentor)}
                    >
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl">
                    {selectedMentor && <MentorProfile mentor={selectedMentor} />}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
