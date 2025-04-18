
import { Shield, BookOpen, Scale, Gavel, Youtube } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface LawEducationProps {
  selectedLanguage: string;
}

const lawContent = {
  english: {
    fundamental: {
      videos: [
        {
          title: "Understanding Fundamental Rights",
          url: "https://youtube.com/watch?v=example1",
          channel: "Legal Education India"
        },
        {
          title: "Right to Equality Explained",
          url: "https://youtube.com/watch?v=example2",
          channel: "Indian Law Guide"
        }
      ]
    },
    criminal: {
      videos: [
        {
          title: "Self Defense Laws in India",
          url: "https://youtube.com/watch?v=example3",
          channel: "Legal Rights"
        },
        {
          title: "How to File an FIR",
          url: "https://youtube.com/watch?v=example4",
          channel: "Law Guide"
        }
      ]
    }
  },
  tamil: {
    fundamental: {
      videos: [
        {
          title: "அடிப்படை உரிமைகள் விளக்கம்",
          url: "https://youtube.com/watch?v=example5",
          channel: "சட்ட கல்வி"
        },
        {
          title: "சமத்துவ உரிமை பற்றிய விளக்கம்",
          url: "https://youtube.com/watch?v=example6",
          channel: "இந்திய சட்ட வழிகாட்டி"
        }
      ]
    },
    criminal: {
      videos: [
        {
          title: "தற்காப்பு சட்டங்கள்",
          url: "https://youtube.com/watch?v=example7",
          channel: "சட்ட உரிமைகள்"
        },
        {
          title: "FIR எப்படி பதிவு செய்வது",
          url: "https://youtube.com/watch?v=example8",
          channel: "சட்ட வழிகாட்டி"
        }
      ]
    }
  }
};

const lawCategories = [
  {
    id: "fundamental",
    title: "Fundamental Rights",
    description: "Basic rights guaranteed by the Indian Constitution",
    topics: [
      "Right to Equality (Article 14-18)",
      "Right to Freedom (Article 19-22)",
      "Right against Exploitation (Article 23-24)",
      "Right to Freedom of Religion (Article 25-28)",
      "Educational and Cultural Rights (Article 29-30)",
      "Right to Constitutional Remedies (Article 32)"
    ]
  },
  {
    id: "criminal",
    title: "Criminal Laws",
    description: "Essential criminal laws for self-protection",
    topics: [
      "Right to Self-Defense (IPC Section 96-106)",
      "Filing FIR and Police Complaints",
      "Cybercrime Laws and Protection",
      "Laws Against Harassment",
      "Domestic Violence Protection",
      "Consumer Protection Rights"
    ]
  },
  {
    id: "civil",
    title: "Civil Rights",
    description: "Important civil laws and protections",
    topics: [
      "Property Rights",
      "Tenant Rights",
      "Consumer Rights",
      "Employment Laws",
      "Marriage and Family Laws",
      "RTI (Right to Information)"
    ]
  },
  {
    id: "youth",
    title: "Youth Protection",
    description: "Laws specifically protecting young citizens",
    topics: [
      "POCSO Act",
      "Anti-Ragging Laws",
      "Child Labor Laws",
      "Educational Rights",
      "Juvenile Justice",
      "Online Safety Laws"
    ]
  }
];

export function LawEducation({ selectedLanguage }: LawEducationProps) {
  return (
    <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-purple-400" />
          <CardTitle>Legal Education for Self-Protection</CardTitle>
        </div>
        <CardDescription>
          Learn essential Indian laws to protect yourself and understand your rights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="fundamental" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-black/20 p-1">
            {lawCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-purple-800/30"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {lawCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <Badge variant="secondary" className="bg-purple-500/20">
                      Essential Knowledge
                    </Badge>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] rounded-md border border-purple-800/30 p-4">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {category.topics.map((topic, index) => (
                          <div
                            key={index}
                            className="flex flex-col gap-3 p-4 rounded-lg hover:bg-purple-900/20 transition-colors border border-purple-800/30"
                          >
                            <div className="flex items-start gap-3">
                              {index % 2 === 0 ? (
                                <Scale className="h-5 w-5 text-purple-400 mt-0.5" />
                              ) : (
                                <Gavel className="h-5 w-5 text-purple-400 mt-0.5" />
                              )}
                              <div>
                                <h4 className="font-medium text-white/90">{topic}</h4>
                                <p className="text-sm text-white/70 mt-1">
                                  Click to learn more about your rights and protections under this law
                                </p>
                              </div>
                            </div>
                            
                            {lawContent[selectedLanguage as keyof typeof lawContent]?.[category.id as keyof typeof lawContent.english]?.videos && (
                              <div className="mt-3 pl-8">
                                <div className="text-sm font-medium text-purple-400 mb-2">Related Videos:</div>
                                <div className="space-y-2">
                                  {lawContent[selectedLanguage as keyof typeof lawContent][category.id as keyof typeof lawContent.english].videos.map((video, idx) => (
                                    <Button
                                      key={idx}
                                      variant="ghost"
                                      className="w-full justify-start gap-2 text-white/70 hover:text-white hover:bg-purple-900/30"
                                      onClick={() => window.open(video.url, "_blank")}
                                    >
                                      <Youtube className="h-4 w-4 text-red-500" />
                                      <div className="text-left">
                                        <div className="font-medium">{video.title}</div>
                                        <div className="text-xs text-white/50">{video.channel}</div>
                                      </div>
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
