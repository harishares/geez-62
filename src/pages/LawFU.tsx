
import { useState } from "react";
import { LawEducation } from "@/components/learning/LawEducation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const languages = [
  { value: "english", label: "English" },
  { value: "tamil", label: "Tamil" }
];

export default function LawFU() {
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-400" />
            LAW F U - Legal Education Hub
          </h1>
          <p className="text-muted-foreground">
            Essential Indian laws and legal resources for self-protection
          </p>
        </div>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <LawEducation selectedLanguage={selectedLanguage} />
    </div>
  );
}
