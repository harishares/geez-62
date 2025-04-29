
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder: string;
}

export const SearchBar = ({ searchTerm, onSearchChange, placeholder }: SearchBarProps) => {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-8 bg-background/50 border-purple-800/30 focus:border-purple-500"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
