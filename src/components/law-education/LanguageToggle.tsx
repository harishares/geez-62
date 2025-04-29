
import { Languages } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Language } from "./types";

interface LanguageToggleProps {
  selectedLanguage: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle = ({ selectedLanguage, onToggle }: LanguageToggleProps) => {
  return (
    <AnimatedButton
      variant="outline"
      className="border-purple-500/30"
      onClick={() => onToggle(selectedLanguage === "english" ? "tamil" : "english")}
      hoverScale={true}
      pulseEffect={false}
      glowColor="rgba(168, 85, 247, 0.5)"
    >
      <Languages className="h-4 w-4 mr-2" />
      {selectedLanguage === "english" ? "தமிழ்" : "English"}
    </AnimatedButton>
  );
};
