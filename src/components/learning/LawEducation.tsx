
import { useState, useEffect } from "react";
import { Shield, Youtube, Languages, BookOpen, Film, Tags, Search, Bookmark } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Category = "Fundamental Rights" | "Self-Protection, Criminal Law" | "Cyber Laws" | "Work" | "Home Safety & Family" | "Consumer & Property" | "Emergencies" | "Women & Children" | "Technology" | "Student" | "Others";

type LawArticle = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: Category;
};

const lawContent: Record<"english" | "tamil", LawArticle[]> = {
  english: [
    {
      id: "fundamental-rights",
      title: "Understanding Fundamental Rights",
      description: "Your basic rights guaranteed by the Constitution.",
      videoUrl: "https://youtube.com/watch?v=example1",
      category: "Fundamental Rights"
    },
    {
      id: "women-rights",
      title: "Women & Children Rights",
      description: "Protection laws for women and children.",
      videoUrl: "https://youtube.com/watch?v=example19",
      category: "Women & Children"
    },
    {
      id: "self-defense",
      title: "Self Defense & Harassment Laws",
      description: "How to legally protect yourself from physical and verbal abuse.",
      videoUrl: "https://youtube.com/watch?v=example18",
      category: "Self-Protection, Criminal Law"
    },
    {
      id: "criminal-laws",
      title: "Essential Criminal Laws for Self-Protection",
      description: "Key criminal laws to protect yourself.",
      videoUrl: "https://youtube.com/watch?v=example2",
      category: "Self-Protection, Criminal Law"
    },
    {
      id: "cyber-security",
      title: "Cyber Security and Digital Rights",
      description: "Stay safe and secure online.",
      videoUrl: "https://youtube.com/watch?v=example3",
      category: "Cyber Laws"
    },
    {
      id: "student-rights",
      title: "Student Rights & Exam Malpractices",
      description: "Rights and remedies for students.",
      videoUrl: "https://youtube.com/watch?v=example17",
      category: "Student"
    },
    {
      id: "workplace-rights",
      title: "Workplace Rights and Protection",
      description: "Protection from harassment and discrimination at work.",
      videoUrl: "https://youtube.com/watch?v=example4",
      category: "Work"
    },
    {
      id: "domestic-violence",
      title: "Protection Against Domestic Violence",
      description: "Legal remedies and protection at home.",
      videoUrl: "https://youtube.com/watch?v=example5",
      category: "Home Safety & Family"
    },
    {
      id: "consumer-rights",
      title: "Consumer Protection Laws",
      description: "Your rights as a consumer and how to handle fraud.",
      videoUrl: "https://youtube.com/watch?v=example6",
      category: "Consumer & Property"
    },
    {
      id: "property-rights",
      title: "Property Rights and Protection",
      description: "Protect your property from fraud.",
      videoUrl: "https://youtube.com/watch?v=example7",
      category: "Consumer & Property"
    },
    {
      id: "emergency-rights",
      title: "Rights During Emergency Situations",
      description: "Your rights and protection during emergencies and disasters.",
      videoUrl: "https://youtube.com/watch?v=example8",
      category: "Emergencies"
    },
    {
      id: "internet-technology",
      title: "Technology Use & Internet Laws",
      description: "Everything you need to know about technology law.",
      videoUrl: "https://youtube.com/watch?v=example20",
      category: "Technology"
    },
    {
      id: "other-laws",
      title: "Other Useful Laws",
      description: "Miscellaneous Indian laws everyone should know.",
      videoUrl: "https://youtube.com/watch?v=example21",
      category: "Others"
    }
  ],
  tamil: [
    {
      id: "fundamental-rights-tamil",
      title: "அடிப்படை உரிமைகள்",
      description: "அரசியலமைப்பால் உங்களுக்கான அடிப்படை உரிமைகள்.",
      videoUrl: "https://youtube.com/watch?v=example9",
      category: "Fundamental Rights"
    },
    {
      id: "women-rights-tamil",
      title: "பெண்கள் மற்றும் குழந்தைகள் உரிமைகள்",
      description: "பெண்கள் மற்றும் குழந்தைகளுக்கான பாதுகாப்பு சட்டங்கள்.",
      videoUrl: "https://youtube.com/watch?v=example23",
      category: "Women & Children"
    },
    {
      id: "self-defense-tamil",
      title: "சுய பாதுகாப்பு & தொல்லையின்மையைப் பாதுகாக்கும் சட்டங்கள்",
      description: "உங்களை உடல்/முயற்சித் தொல்லைிலிருந்து சட்டரீதியாக பாதுகாப்பது எப்படி.",
      videoUrl: "https://youtube.com/watch?v=example22",
      category: "Self-Protection, Criminal Law"
    },
    {
      id: "criminal-laws-tamil",
      title: "சுய பாதுகாப்புக்கான குற்றவியல் சட்டங்கள்",
      description: "உங்களைப் பாதுகாக்கும் முக்கிய சட்டங்கள்.",
      videoUrl: "https://youtube.com/watch?v=example10",
      category: "Self-Protection, Criminal Law"
    },
    {
      id: "cyber-security-tamil",
      title: "இணைய பாதுகாப்பு மற்றும் டிஜிட்டல் உரிமைகள்",
      description: "ஆன்லைன் பாதுகாப்பு மற்றும் சட்ட உரிமைகள்.",
      videoUrl: "https://youtube.com/watch?v=example11",
      category: "Cyber Laws"
    },
    {
      id: "student-rights-tamil",
      title: "மாணவர் உரிமைகள் மற்றும் பரீட்சை முறைகேடுகள்",
      description: "மாணவருக்கான உரிமைகள் மற்றும் தீர்வுகள்.",
      videoUrl: "https://youtube.com/watch?v=example24",
      category: "Student"
    },
    {
      id: "workplace-rights-tamil",
      title: "பணியிட உரிமைகள் மற்றும் பாதுகாப்பு",
      description: "பணியிடத்தில் சட்ட பாதுகாப்பு.",
      videoUrl: "https://youtube.com/watch?v=example12",
      category: "Work"
    },
    {
      id: "domestic-violence-tamil",
      title: "குடும்ப வன்முறைக்கு எதிரான பாதுகாப்பு",
      description: "வீட்டில் சட்ட பாதுகாப்பு.",
      videoUrl: "https://youtube.com/watch?v=example13",
      category: "Home Safety & Family"
    },
    {
      id: "consumer-rights-tamil",
      title: "நுகர்வோர் பாதுகாப்பு சட்டங்கள்",
      description: "நுகர்வோர் சட்ட உரிமைகள்.",
      videoUrl: "https://youtube.com/watch?v=example14",
      category: "Consumer & Property"
    },
    {
      id: "property-rights-tamil",
      title: "சொத்து உரிமைகள் மற்றும் பாதுகாப்பு",
      description: "சொத்துக்களை பாதுகாக்கும் சட்டங்கள்.",
      videoUrl: "https://youtube.com/watch?v=example15",
      category: "Consumer & Property"
    },
    {
      id: "emergency-rights-tamil",
      title: "அவசரகால உரிமைகள்",
      description: "அவசரநேரங்களில் சட்ட பாதுகாப்பு.",
      videoUrl: "https://youtube.com/watch?v=example16",
      category: "Emergencies"
    },
    {
      id: "internet-technology-tamil",
      title: "உயிர்நிலை மற்றும் இணைய சட்டங்கள்",
      description: "நுட்ப இந்து சட்டங்கள்.",
      videoUrl: "https://youtube.com/watch?v=example25",
      category: "Technology"
    },
    {
      id: "other-laws-tamil",
      title: "பிற பயனுள்ள சட்டங்கள்",
      description: "அனைவரும் அறிந்து கொள்ளவேண்டிய சட்டங்கள்.",
      videoUrl: "https://youtube.com/watch?v=example26",
      category: "Others"
    }
  ]
};

const categories: Category[] = [
  "Fundamental Rights",
  "Self-Protection, Criminal Law",
  "Women & Children",
  "Cyber Laws",
  "Student",
  "Work",
  "Home Safety & Family",
  "Consumer & Property",
  "Emergencies",
  "Technology",
  "Others"
];

const getCategoryIcon = (category: Category | "All") => {
  switch(category) {
    case "Fundamental Rights": return Shield;
    case "Self-Protection, Criminal Law": return Shield;
    case "Women & Children": return Shield;
    case "Cyber Laws": return Shield;
    case "Student": return BookOpen;
    case "Work": return Shield;
    case "Home Safety & Family": return Shield;
    case "Consumer & Property": return Shield;
    case "Emergencies": return Shield;
    case "Technology": return Shield;
    case "Others": return Shield;
    case "All": return Tags;
    default: return Shield;
  }
};

export function LawEducation() {
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "tamil">("english");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  // Filter articles based on category, search term, and saved status
  const filteredArticles = lawContent[selectedLanguage].filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSaved = !showSaved || savedArticles.includes(article.id);
    
    return matchesCategory && matchesSearch && (showSaved ? matchesSaved : true);
  });

  // Load saved articles from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedLawArticles");
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, []);

  // Save articles to localStorage when savedArticles changes
  useEffect(() => {
    localStorage.setItem("savedLawArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  const toggleSaveArticle = (id: string) => {
    setSavedArticles(prev => {
      if (prev.includes(id)) {
        return prev.filter(articleId => articleId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)] overflow-hidden hover:shadow-lg hover:shadow-purple-800/20 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 animate-float">
            <Shield className="h-6 w-6 text-purple-400" />
            <CardTitle>LAW F U - Legal Education for Self-Protection</CardTitle>
          </div>
          <AnimatedButton
            variant="outline"
            className="border-purple-500/30"
            onClick={() => setSelectedLanguage(selectedLanguage === "english" ? "tamil" : "english")}
            hoverScale={true}
            pulseEffect={false}
            glowColor="rgba(168, 85, 247, 0.5)"
          >
            <Languages className="h-4 w-4 mr-2" />
            {selectedLanguage === "english" ? "தமிழ்" : "English"}
          </AnimatedButton>
        </div>
        <CardDescription>
          {selectedLanguage === "english"
            ? "Learn essential Indian laws to protect yourself and understand your rights"
            : "உங்களைப் பாதுகாக்க அத்தியாவசிய இந்திய சட்டங்களைக் கற்றுக்கொள்ளுங்கள்"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={selectedLanguage === "english" ? "Search topics..." : "தலைப்புகளைத் தேடுங்கள்..."}
                className="pl-8 bg-background/50 border-purple-800/30 focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <AnimatedButton
              variant={showSaved ? "default" : "outline"}
              size="sm"
              className={cn(
                "rounded-full hover:scale-105 transition-all duration-200",
                showSaved ? "bg-purple-600 text-white" : "border-purple-500/30"
              )}
              onClick={() => setShowSaved(!showSaved)}
            >
              <Bookmark className="h-4 w-4 mr-1" />
              {showSaved ? "Showing Saved" : "Show Saved"}
            </AnimatedButton>
          </div>

          {/* Category Pills */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Filter by Category:</h3>
            <div className="flex flex-wrap gap-2">
              <AnimatedButton
                size="sm"
                variant={activeCategory === "All" ? "default" : "outline"}
                className={cn(
                  "rounded-full transition-all duration-200",
                  activeCategory === "All" ? "bg-purple-700 text-white animate-pulse" : "",
                  "hover-glow"
                )}
                onClick={() => setActiveCategory("All")}
              >
                <Tags className="h-4 w-4 mr-1" />
                All
              </AnimatedButton>
              {categories.map((cat) => {
                const CategoryIcon = getCategoryIcon(cat);
                return (
                  <AnimatedButton
                    key={cat}
                    size="sm"
                    variant={activeCategory === cat ? "default" : "outline"}
                    className={cn(
                      "rounded-full hover:scale-105 transition-all duration-200",
                      activeCategory === cat
                        ? "bg-purple-500 text-white shadow-lg animate-glow"
                        : ""
                    )}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <CategoryIcon className="h-3.5 w-3.5 mr-1" />
                    {cat}
                  </AnimatedButton>
                );
              })}
            </div>
          </div>
          
          {/* Content Area */}
          <ScrollArea className="h-[500px] pr-4">
            {filteredArticles.length > 0 ? (
              <div className="space-y-4">
                <Accordion type="multiple" className="w-full">
                  {filteredArticles.map((article) => (
                    <AccordionItem 
                      key={article.id} 
                      value={article.id}
                      className={cn(
                        "border border-purple-800/30 mb-3 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300",
                        "hover:border-purple-500/50 data-[state=open]:border-purple-500/50 data-[state=open]:shadow-md",
                        "backdrop-blur-sm bg-[rgba(38,30,65,0.2)]"
                      )}
                    >
                      <AccordionTrigger 
                        className={cn(
                          "px-4 py-3 hover:no-underline data-[state=open]:bg-purple-900/20",
                          "group transition-all duration-300"
                        )}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full text-left gap-2">
                          <div className="flex items-start gap-2">
                            <CategoryIcon className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-base group-hover:text-purple-300 transition-colors duration-200">
                                {article.title}
                              </h3>
                              <p className="text-xs text-muted-foreground">{article.category}</p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveArticle(article.id);
                            }}
                          >
                            <Bookmark 
                              className={cn(
                                "h-4 w-4", 
                                savedArticles.includes(article.id) 
                                  ? "fill-purple-500 text-purple-500" 
                                  : "text-muted-foreground"
                              )} 
                            />
                            <span className="sr-only">
                              {savedArticles.includes(article.id) ? "Unsave" : "Save"} article
                            </span>
                          </Button>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pt-2 pb-4 animate-fade-in">
                        <div className="pl-7 space-y-3">
                          <p className="text-sm">{article.description}</p>
                          <div className="flex items-center gap-2">
                            <Film className="h-4 w-4 text-purple-400" />
                            <span className="text-xs text-muted-foreground">Video Explanation</span>
                          </div>
                          <AnimatedButton
                            size="sm"
                            className="bg-purple-600/80 hover:bg-purple-600 text-white rounded-md"
                            onClick={() => window.open(article.videoUrl, '_blank')}
                          >
                            <Youtube className="h-4 w-4 mr-1.5" />
                            Watch Video
                          </AnimatedButton>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ) : (
              <div className="text-center text-muted-foreground mt-10 animate-fade-in">
                <BookOpen className="mx-auto h-8 w-8 mb-4" />
                <p>No topics found matching your criteria.</p>
                <Button 
                  variant="link" 
                  className="mt-2 text-purple-400"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("All");
                    setShowSaved(false);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border/30 bg-background/10 py-3 px-6">
        <div className="text-xs text-muted-foreground flex justify-between w-full">
          <span>Articles: {filteredArticles.length} of {lawContent[selectedLanguage].length}</span>
          <span>Last updated: April 2025</span>
        </div>
      </CardFooter>
    </Card>
  );
}

const CategoryIcon = ({ className }: { className?: string }) => {
  return <Shield className={className} />;
};
