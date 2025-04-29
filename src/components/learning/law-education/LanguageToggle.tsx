
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { Language } from "./types";

interface LanguageToggleProps {
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
}

export function LanguageToggle({ selectedLanguage, setSelectedLanguage }: LanguageToggleProps) {
  return (
    <Button
      variant="outline"
      className="border-purple-500/30 hover:bg-purple-500/20 transition-all"
      onClick={() => setSelectedLanguage(selectedLanguage === "english" ? "tamil" : "english")}
    >
      <Languages className="h-4 w-4 mr-2" />
      {selectedLanguage === "english" ? "தமிழ்" : "English"}
    </Button>
  );
}
