import { useState } from "react";
import { Shield, Youtube, Languages, BookOpen, Film, Tags } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export function LawEducation() {
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "tamil">("english");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const articles = lawContent[selectedLanguage].filter(
    (article) => activeCategory === "All" || article.category === activeCategory
  );

  return (
    <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-400" />
            <CardTitle>LAW F U - Legal Education for Self-Protection</CardTitle>
          </div>
          <Button
            variant="outline"
            className="border-purple-500/30"
            onClick={() => setSelectedLanguage(selectedLanguage === "english" ? "tamil" : "english")}
          >
            <Languages className="h-4 w-4 mr-2" />
            {selectedLanguage === "english" ? "தமிழ்" : "English"}
          </Button>
        </div>
        <CardDescription>
          {selectedLanguage === "english"
            ? "Learn essential Indian laws to protect yourself and understand your rights"
            : "உங்களைப் பாதுகாக்க அத்தியாவசிய இந்திய சட்டங்களைக் கற்றுக்கொள்ளுங்கள்"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={activeCategory === "All" ? "default" : "outline"}
              className={cn(
                "rounded-full transition-all duration-200",
                activeCategory === "All" ? "bg-purple-700 text-white animate-pulse" : ""
              )}
              onClick={() => setActiveCategory("All")}
            >
              <Tags className="h-4 w-4 mr-1" />
              All
            </Button>
            {categories.map((cat) => (
              <Button
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
                {cat}
              </Button>
            ))}
          </div>
        </div>
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {articles.map((article) => (
              <Card key={article.id} className="border border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-purple-400" />
                    <a
                      href={article.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors underline"
                    >
                      Watch Video Explanation
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
            {articles.length === 0 && (
              <div className="text-center text-muted-foreground mt-10">
                <BookOpen className="mx-auto h-8 w-8 mb-4" />
                No topics for this category yet.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
