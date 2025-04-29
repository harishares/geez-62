
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLanguage: "english" | "tamil";
}

export function SearchBar({ searchQuery, setSearchQuery, selectedLanguage }: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={selectedLanguage === "english" ? "Search legal topics..." : "சட்ட தலைப்புகளைத் தேடுங்கள்..."}
        className="pl-9 border-purple-500/30 bg-purple-950/30 placeholder:text-purple-300/50"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
