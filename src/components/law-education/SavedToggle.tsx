
import { Bookmark } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";

interface SavedToggleProps {
  showSaved: boolean;
  onToggle: () => void;
}

export const SavedToggle = ({ showSaved, onToggle }: SavedToggleProps) => {
  return (
    <AnimatedButton
      variant={showSaved ? "default" : "outline"}
      size="sm"
      className={cn(
        "rounded-full hover:scale-105 transition-all duration-200",
        showSaved ? "bg-purple-600 text-white" : "border-purple-500/30"
      )}
      onClick={onToggle}
    >
      <Bookmark className="h-4 w-4 mr-1" />
      {showSaved ? "Showing Saved" : "Show Saved"}
    </AnimatedButton>
  );
};
