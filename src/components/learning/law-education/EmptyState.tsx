
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  selectedLanguage: "english" | "tamil";
}

export function EmptyState({ selectedLanguage }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <BookOpen className="mx-auto h-12 w-12 text-purple-400/50 mb-4" />
      <h3 className="text-xl font-medium text-purple-300 mb-2">No topics found</h3>
      <p className="text-purple-300/70 max-w-md mx-auto">
        {selectedLanguage === "english"
          ? "Try a different search term or category."
          : "வேறு தேடல் சொற்றொடரை அல்லது வகையைப் முயற்சிக்கவும்."}
      </p>
    </div>
  );
}
