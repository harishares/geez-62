
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "./types";
import { getCategoryIcon } from "./utils";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: Category | "All";
  setActiveCategory: (category: Category | "All") => void;
}

export function CategoryFilter({ categories, activeCategory, setActiveCategory }: CategoryFilterProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button
        size="sm"
        variant={activeCategory === "All" ? "default" : "outline"}
        className={cn(
          "rounded-full transition-all duration-200",
          activeCategory === "All" 
            ? "bg-purple-700 hover:bg-purple-600" 
            : "hover:border-purple-400 hover:bg-purple-900/20"
        )}
        onClick={() => setActiveCategory("All")}
      >
        {getCategoryIcon("All")}
        <span className="ml-1">All</span>
      </Button>
      
      {categories.map((cat) => (
        <Button
          key={cat}
          size="sm"
          variant={activeCategory === cat ? "default" : "outline"}
          className={cn(
            "rounded-full hover:scale-105 transition-all duration-200",
            activeCategory === cat
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
              : "border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-900/20"
          )}
          onClick={() => setActiveCategory(cat)}
        >
          {getCategoryIcon(cat)}
          <span className="ml-1">{cat}</span>
        </Button>
      ))}
    </div>
  );
}
