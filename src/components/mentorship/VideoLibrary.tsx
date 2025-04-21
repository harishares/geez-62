
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Bookmark, Download, Search, Video } from "lucide-react";
import { UPIPayment } from "@/components/payment/UPIPayment";
import { toast } from "sonner";

type VideoContent = {
  id: string;
  title: string;
  mentor: string;
  thumbnail: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  is_free: boolean;
  video_url?: string;
};

// Sample video library data
const SAMPLE_VIDEOS: VideoContent[] = [
  {
    id: "1",
    title: "Introduction to Web Development",
    mentor: "Dr. Rajiv Sharma",
    thumbnail: "https://placehold.co/400x225/8B5CF6/ffffff?text=Web+Dev",
    duration: "45:20",
    difficulty: "beginner",
    category: "Computer Science",
    is_free: true
  },
  {
    id: "2",
    title: "Advanced JavaScript Patterns",
    mentor: "Dr. Rajiv Sharma",
    thumbnail: "https://placehold.co/400x225/7C3AED/ffffff?text=JavaScript",
    duration: "32:15",
    difficulty: "advanced",
    category: "Computer Science",
    is_free: false
  },
  {
    id: "3",
    title: "Business Strategy Fundamentals",
    mentor: "Priya Mehta",
    thumbnail: "https://placehold.co/400x225/6D28D9/ffffff?text=Business",
    duration: "58:30",
    difficulty: "beginner",
    category: "Business Strategy",
    is_free: true
  },
  {
    id: "4",
    title: "Startup Valuation Techniques",
    mentor: "Priya Mehta",
    thumbnail: "https://placehold.co/400x225/5B21B6/ffffff?text=Valuation",
    duration: "49:45",
    difficulty: "intermediate",
    category: "Business Strategy",
    is_free: false
  },
  {
    id: "5",
    title: "Corporate Law Essentials",
    mentor: "Amit Kumar",
    thumbnail: "https://placehold.co/400x225/4C1D95/ffffff?text=Law",
    duration: "65:10",
    difficulty: "intermediate",
    category: "Law",
    is_free: true
  },
  {
    id: "6",
    title: "Legal Aspects of Startups",
    mentor: "Amit Kumar",
    thumbnail: "https://placehold.co/400x225/4338CA/ffffff?text=Legal",
    duration: "53:25",
    difficulty: "intermediate",
    category: "Law",
    is_free: false
  }
];

export function VideoLibrary() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  
  const handleSubscriptionSuccess = () => {
    setIsSubscribed(true);
    toast.success("You've successfully subscribed to Mentorship Pro!");
  };
  
  const handleBookmark = (video: VideoContent) => {
    if (!isSubscribed && !video.is_free) {
      toast.error("Please subscribe to bookmark premium videos");
      return;
    }
    toast.success(`"${video.title}" has been bookmarked`);
  };
  
  const handleDownload = (video: VideoContent) => {
    if (!isSubscribed && !video.is_free) {
      toast.error("Please subscribe to download premium videos");
      return;
    }
    toast.success(`Downloading "${video.title}"`);
  };
  
  // Filter videos based on search, difficulty and category
  const filteredVideos = SAMPLE_VIDEOS.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         video.mentor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficulty === "all" || video.difficulty === difficulty;
    const matchesCategory = category === "all" || video.category === category;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });
  
  // Group categories for filter
  const categories = Array.from(new Set(SAMPLE_VIDEOS.map(video => video.category)));
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tabs for All/Free/Premium */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="all">All Videos</TabsTrigger>
          <TabsTrigger value="free">Free</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-4">
          <VideoGrid 
            videos={filteredVideos} 
            isSubscribed={isSubscribed} 
            onBookmark={handleBookmark}
            onDownload={handleDownload}
            onSelect={setSelectedVideo}
          />
        </TabsContent>
        
        <TabsContent value="free" className="pt-4">
          <VideoGrid 
            videos={filteredVideos.filter(v => v.is_free)} 
            isSubscribed={isSubscribed} 
            onBookmark={handleBookmark}
            onDownload={handleDownload}
            onSelect={setSelectedVideo}
          />
        </TabsContent>
        
        <TabsContent value="premium" className="pt-4">
          <VideoGrid 
            videos={filteredVideos.filter(v => !v.is_free)} 
            isSubscribed={isSubscribed} 
            onBookmark={handleBookmark}
            onDownload={handleDownload}
            onSelect={setSelectedVideo}
          />
        </TabsContent>
      </Tabs>
      
      {/* Video Player Dialog */}
      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
          <DialogContent className="sm:max-w-3xl">
            <div className="space-y-4">
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                {(isSubscribed || selectedVideo.is_free) ? (
                  <iframe
                    src={selectedVideo.video_url || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                    className="h-full w-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full bg-muted p-6">
                    <Video className="h-16 w-16 mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Subscribe to Mentorship Pro to unlock this video and all other premium content.
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Upgrade to Pro</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <UPIPayment amount={50} onSuccess={handleSubscriptionSuccess} />
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </AspectRatio>
              
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedVideo.title}</h2>
                    <p className="text-sm text-muted-foreground">By {selectedVideo.mentor}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleBookmark(selectedVideo)}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDownload(selectedVideo)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-2">
                  <Badge variant={selectedVideo.is_free ? "default" : "secondary"}>
                    {selectedVideo.is_free ? "Free" : "Premium"}
                  </Badge>
                  <Badge variant="outline">{selectedVideo.difficulty}</Badge>
                  <Badge variant="outline">{selectedVideo.category}</Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Subscription prompt for non-subscribers */}
      {!isSubscribed && (
        <div className="bg-muted/50 p-6 rounded-lg border border-border mt-8">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <BookOpen className="mx-auto h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Unlock Full Video Library</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to Mentorship Pro to access all premium videos, download content, and get personalized mentorship.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-2">Upgrade to Pro</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <UPIPayment amount={50} onSuccess={handleSubscriptionSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}

type VideoGridProps = {
  videos: VideoContent[];
  isSubscribed: boolean;
  onBookmark: (video: VideoContent) => void;
  onDownload: (video: VideoContent) => void;
  onSelect: (video: VideoContent) => void;
};

function VideoGrid({ videos, isSubscribed, onBookmark, onDownload, onSelect }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No videos match your filters</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden group cursor-pointer transition-all hover:shadow-md">
          <CardContent className="p-0">
            <div className="relative" onClick={() => onSelect(video)}>
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="object-cover w-full h-full" 
                />
              </AspectRatio>
              
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="text-white">
                  <Video className="h-8 w-8" />
                </Button>
              </div>
              
              {!video.is_free && !isSubscribed && (
                <div className="absolute top-2 right-2">
                  <Badge>Premium</Badge>
                </div>
              )}
              
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium line-clamp-1">{video.title}</h3>
                  <p className="text-xs text-muted-foreground">{video.mentor}</p>
                </div>
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => { e.stopPropagation(); onBookmark(video); }}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => { e.stopPropagation(); onDownload(video); }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {video.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {video.category}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
