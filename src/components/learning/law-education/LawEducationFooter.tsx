
import { Button } from "@/components/ui/button";
import { Language } from "./types";

interface LawEducationFooterProps {
  filteredArticlesCount: number;
  selectedLanguage: Language;
}

export function LawEducationFooter({ filteredArticlesCount, selectedLanguage }: LawEducationFooterProps) {
  return (
    <div className="flex justify-between">
      <div className="text-sm text-purple-300/70">
        {filteredArticlesCount} {selectedLanguage === "english" ? "topics available" : "தலைப்புகள் கிடைக்கின்றன"}
      </div>
      <Button size="sm" variant="link" className="text-purple-300 hover:text-purple-200">
        {selectedLanguage === "english" ? "Suggest a Topic" : "ஒரு தலைப்பை பரிந்துரைக்க"}
      </Button>
    </div>
  );
}
