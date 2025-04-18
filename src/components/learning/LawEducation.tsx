
import { Shield, BookOpen, Scale, Gavel } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export function LawEducation() {
  return (
    <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-purple-400" />
          <CardTitle>LAW F U - Legal Education for Self-Protection</CardTitle>
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
                  <ScrollArea className="h-[300px] rounded-md border border-purple-800/30 p-4">
                    <div className="space-y-4">
                      {category.topics.map((topic, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-900/20 transition-colors border border-purple-800/30"
                        >
                          {index % 2 === 0 ? (
                            <Scale className="h-5 w-5 text-purple-400 mt-0.5" />
                          ) : (
                            <Gavel className="h-5 w-5 text-purple-400 mt-0.5" />
                          )}
                          <div>
                            <h4 className="font-medium text-white/90">{topic}</h4>
                            <p className="text-sm text-white/70">
                              Click to learn more about your rights and protections under this law
                            </p>
                          </div>
                        </div>
                      ))}
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
