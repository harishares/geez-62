
import { useState } from "react";
import { Shield, Youtube, Languages } from "lucide-react"; // Fixed import: Language → Languages
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

type LawArticle = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
};

const lawContent = {
  english: [
    {
      id: "fundamental-rights",
      title: "Understanding Fundamental Rights",
      description: "Basic rights guaranteed by the Indian Constitution",
      videoUrl: "https://youtube.com/watch?v=example1"
    },
    {
      id: "criminal-laws",
      title: "Essential Criminal Laws",
      description: "Important criminal laws for self-protection",
      videoUrl: "https://youtube.com/watch?v=example2"
    }
  ],
  tamil: [
    {
      id: "fundamental-rights-tamil",
      title: "அடிப்படை உரிமைகளைப் புரிந்துகொள்வது",
      description: "இந்திய அரசியலமைப்பால் உத்தரவாதம் அளிக்கப்பட்ட அடிப்படை உரிமைகள்",
      videoUrl: "https://youtube.com/watch?v=example3"
    },
    {
      id: "criminal-laws-tamil",
      title: "அத்தியாவசிய குற்றவியல் சட்டங்கள்",
      description: "சுய பாதுகாப்புக்கான முக்கியமான குற்றவியல் சட்டங்கள்",
      videoUrl: "https://youtube.com/watch?v=example4"
    }
  ]
};

export function LawEducation() {
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "tamil">("english");

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
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {lawContent[selectedLanguage].map((article) => (
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
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Watch Video Explanation
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
