
import { AnimatedButton } from "@/components/ui/animated-button";
import { CategoryIcon } from "./CategoryIcon";
import { cn } from "@/lib/utils";
import { Category } from "./types";
import { Tags } from "lucide-react";
import { categories } from "./law-data";

interface CategoryFilterProps {
  activeCategory: Category | "All";
  onCategoryChange: (category: Category | "All") => void;
}

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2 text-muted-foreground">Filter by Category:</h3>
      <div className="flex flex-wrap gap-2">
        <AnimatedButton
          size="sm"
          variant={activeCategory === "All" ? "default" : "outline"}
          className={cn(
            "rounded-full transition-all duration-200",
            activeCategory === "All" ? "bg-purple-700 text-white animate-pulse" : "",
            "hover-glow"
          )}
          onClick={() => onCategoryChange("All")}
        >
          <Tags className="h-4 w-4 mr-1" />
          All
        </AnimatedButton>
        
        {categories.map((cat) => (
          <AnimatedButton
            key={cat}
            size="sm"
            variant={activeCategory === cat ? "default" : "outline"}
            className={cn(
              "rounded-full hover:scale-105 transition-all duration-200",
              activeCategory === cat
                ? "bg-purple-500 text-white shadow-lg animate-glow"
                : ""
            )}
            onClick={() => onCategoryChange(cat)}
          >
            <CategoryIcon category={cat} className="h-3.5 w-3.5 mr-1" />
            {cat}
          </AnimatedButton>
        ))}
      </div>
    </div>
  );
};
