import { useState } from "react";
import { Shield, Youtube, Languages } from "lucide-react"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      description: "Learn about your basic rights guaranteed by the Indian Constitution",
      videoUrl: "https://youtube.com/watch?v=example1"
    },
    {
      id: "criminal-laws",
      title: "Essential Criminal Laws for Self-Protection",
      description: "Important criminal laws to protect yourself from crimes",
      videoUrl: "https://youtube.com/watch?v=example2"
    },
    {
      id: "cyber-security",
      title: "Cyber Security and Digital Rights",
      description: "Protect yourself from online fraud, cyberbullying, and digital crimes",
      videoUrl: "https://youtube.com/watch?v=example3"
    },
    {
      id: "workplace-rights",
      title: "Workplace Rights and Protection",
      description: "Laws protecting employees from harassment, discrimination, and unfair practices",
      videoUrl: "https://youtube.com/watch?v=example4"
    },
    {
      id: "domestic-violence",
      title: "Protection Against Domestic Violence",
      description: "Legal remedies and protection measures against domestic violence",
      videoUrl: "https://youtube.com/watch?v=example5"
    },
    {
      id: "consumer-rights",
      title: "Consumer Protection Laws",
      description: "Your rights as a consumer and protection against fraud",
      videoUrl: "https://youtube.com/watch?v=example6"
    },
    {
      id: "property-rights",
      title: "Property Rights and Protection",
      description: "Laws protecting your property rights and preventing fraud",
      videoUrl: "https://youtube.com/watch?v=example7"
    },
    {
      id: "emergency-rights",
      title: "Rights During Emergency Situations",
      description: "Legal rights and protection during emergencies and disasters",
      videoUrl: "https://youtube.com/watch?v=example8"
    }
  ],
  tamil: [
    {
      id: "fundamental-rights-tamil",
      title: "அடிப்படை உரிமைகளைப் புரிந்துகொள்வது",
      description: "இந்திய அரசியலமைப்பால் உத்தரவாதம் அளிக்கப்பட்ட உங்கள் அடிப்படை உரிமைகளைப் பற்றி அறிக",
      videoUrl: "https://youtube.com/watch?v=example9"
    },
    {
      id: "criminal-laws-tamil",
      title: "சுய பாதுகாப்புக்கான குற்றவியல் சட்டங்கள்",
      description: "குற்றங்களில் இருந்து உங்களைப் பாதுகாக்க முக்கியமான குற்றவியல் சட்டங்கள்",
      videoUrl: "https://youtube.com/watch?v=example10"
    },
    {
      id: "cyber-security-tamil",
      title: "இணைய பாதுகாப்பு மற்றும் டிஜிட்டல் உரிமைகள்",
      description: "ஆன்லைன் மோசடி, சைபர் துன்புறுத்தல் மற்றும் டிஜிட்டல் குற்றங்களில் இருந்து பாதுகாப்பு",
      videoUrl: "https://youtube.com/watch?v=example11"
    },
    {
      id: "workplace-rights-tamil",
      title: "பணியிட உரிமைகள் மற்றும் பாதுகாப்பு",
      description: "துன்புறுத்தல், பாகுபாடு மற்றும் அநீதியான நடைமுறைகளில் இருந்து பணியாளர்களைப் பாதுகாக்கும் சட்டங்கள்",
      videoUrl: "https://youtube.com/watch?v=example12"
    },
    {
      id: "domestic-violence-tamil",
      title: "குடும்ப வன்முறைக்கு எதிரான பாதுகாப்பு",
      description: "குடும்ப வன்முறைக்கு எதிரான சட்ட தீர்வுகள் மற்றும் பாதுகாப்பு நடவடிக்கைகள்",
      videoUrl: "https://youtube.com/watch?v=example13"
    },
    {
      id: "consumer-rights-tamil",
      title: "நுகர்வோர் பாதுகாப்பு சட்டங்கள்",
      description: "நுகர்வோராக உங்கள் உரிமைகள் மற்றும் மோசடிக்கு எதிரான பாதுகாப்பு",
      videoUrl: "https://youtube.com/watch?v=example14"
    },
    {
      id: "property-rights-tamil",
      title: "சொத்து உரிமைகள் மற்றும் பாதுகாப்பு",
      description: "உங்கள் சொத்து உரிமைகளைப் பாதுகாக்கும் சட்டங்கள் மற்றும் மோசடியைத் தடுத்தல்",
      videoUrl: "https://youtube.com/watch?v=example15"
    },
    {
      id: "emergency-rights-tamil",
      title: "அவசரகால உரிமைகள்",
      description: "அவசரநிலைகள் மற்றும் பேரழிவுகளின் போது சட்ட உரிமைகள் மற்றும் பாதுகாப்பு",
      videoUrl: "https://youtube.com/watch?v=example16"
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
