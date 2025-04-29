
import { useState } from "react";
import { Shield, Youtube, Languages, BookOpen, Film, Tags, Search, Lightbulb, BookMarked, Gavel, Scale, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  switch (category) {
    case "Fundamental Rights":
      return <Scale className="h-4 w-4" />;
    case "Self-Protection, Criminal Law":
      return <Shield className="h-4 w-4" />;
    case "Cyber Laws":
      return <Lightbulb className="h-4 w-4" />;
    case "Work":
      return <BookMarked className="h-4 w-4" />;
    case "Women & Children":
      return <Shield className="h-4 w-4" />;
    case "Student":
      return <BookOpen className="h-4 w-4" />;
    case "Home Safety & Family":
      return <Shield className="h-4 w-4" />;
    case "Consumer & Property":
      return <Gavel className="h-4 w-4" />;
    case "Emergencies":
      return <Info className="h-4 w-4" />;
    case "Technology":
      return <Lightbulb className="h-4 w-4" />;
    case "All":
      return <Tags className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

export function LawEducation() {
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "tamil">("english");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredArticles = lawContent[selectedLanguage].filter(
    (article) => 
      (activeCategory === "All" || article.category === activeCategory) &&
      (searchQuery === "" || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-gradient-to-br from-purple-900/40 to-black/60">
      <CardHeader className="border-b border-purple-800/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30">
              <Gavel className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-100">LAW F U</CardTitle>
              <CardDescription className="text-purple-200/80">
                Legal Education for Self-Protection
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-purple-500/30 hover:bg-purple-500/20 transition-all"
            onClick={() => setSelectedLanguage(selectedLanguage === "english" ? "tamil" : "english")}
          >
            <Languages className="h-4 w-4 mr-2" />
            {selectedLanguage === "english" ? "தமிழ்" : "English"}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={selectedLanguage === "english" ? "Search legal topics..." : "சட்ட தலைப்புகளைத் தேடுங்கள்..."}
                className="pl-9 border-purple-500/30 bg-purple-950/30 placeholder:text-purple-300/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={activeCategory === "All" ? "default" : "outline"}
              className={cn(
                "rounded-full transition-all duration-200",
                activeCategory === "All" 
                  ? "bg-purple-700 hover:bg-purple-600" 
                  : "hover:border-purple-400 hover:bg-purple-900/20"
              )}
              onClick={() => setActiveCategory("All")}
            >
              {getCategoryIcon("All")}
              <span className="ml-1">All</span>
            </Button>
            
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={activeCategory === cat ? "default" : "outline"}
                className={cn(
                  "rounded-full hover:scale-105 transition-all duration-200",
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                    : "border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-900/20"
                )}
                onClick={() => setActiveCategory(cat)}
              >
                {getCategoryIcon(cat)}
                <span className="ml-1">{cat}</span>
              </Button>
            ))}
          </div>
        </div>
        
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-purple-400/50 mb-4" />
            <h3 className="text-xl font-medium text-purple-300 mb-2">No topics found</h3>
            <p className="text-purple-300/70 max-w-md mx-auto">
              {selectedLanguage === "english"
                ? "Try a different search term or category."
                : "வேறு தேடல் சொற்றொடரை அல்லது வகையைப் முயற்சிக்கவும்."}
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <Accordion type="multiple" className="space-y-4">
              {filteredArticles.map((article) => (
                <AccordionItem 
                  key={article.id} 
                  value={article.id}
                  className="border border-purple-800/30 bg-purple-950/30 rounded-lg overflow-hidden hover:bg-purple-900/20 transition-colors"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline data-[state=open]:bg-purple-900/30 transition-colors">
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-600/20 text-purple-300 hover:bg-purple-600/30">
                          {article.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-medium text-purple-100 mt-2">{article.title}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-purple-950/20 px-4 py-4 text-purple-200/90">
                    <p className="mb-4">{article.description}</p>
                    <div className="flex items-center gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-700/40 text-purple-200"
                        onClick={() => window.open(article.videoUrl, "_blank")}
                      >
                        <Youtube className="h-4 w-4 mr-2 text-red-400" />
                        {selectedLanguage === "english" ? "Watch Video Explanation" : "வீடியோ விளக்கத்தைப் பார்க்கவும்"}
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-purple-800/30 px-6 py-4 flex justify-between">
        <div className="text-sm text-purple-300/70">
          {filteredArticles.length} {selectedLanguage === "english" ? "topics available" : "தலைப்புகள் கிடைக்கின்றன"}
        </div>
        <Button size="sm" variant="link" className="text-purple-300 hover:text-purple-200">
          {selectedLanguage === "english" ? "Suggest a Topic" : "ஒரு தலைப்பை பரிந்துரைக்க"}
        </Button>
      </CardFooter>
    </Card>
  );
}
