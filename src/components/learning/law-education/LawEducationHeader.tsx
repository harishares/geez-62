
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Gavel } from "lucide-react";
import { Language } from "./types";
import { LanguageToggle } from "./LanguageToggle";

interface LawEducationHeaderProps {
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
}

export function LawEducationHeader({ selectedLanguage, setSelectedLanguage }: LawEducationHeaderProps) {
  return (
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
      <LanguageToggle 
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage} 
      />
    </div>
  );
}
