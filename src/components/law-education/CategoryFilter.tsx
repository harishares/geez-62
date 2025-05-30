
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
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
        Filter by Category
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <AnimatedButton
          size="sm"
          variant={activeCategory === "All" ? "default" : "outline"}
          className={cn(
            "rounded-lg transition-all duration-200 h-12 text-xs font-medium",
            activeCategory === "All" ? "bg-purple-700 text-white shadow-lg" : "hover:bg-purple-50 hover:border-purple-300",
            "border-2"
          )}
          onClick={() => onCategoryChange("All")}
        >
          <Tags className="h-4 w-4 mb-1" />
          <span className="block">All Topics</span>
        </AnimatedButton>
        
        {categories.map((cat) => (
          <AnimatedButton
            key={cat}
            size="sm"
            variant={activeCategory === cat ? "default" : "outline"}
            className={cn(
              "rounded-lg transition-all duration-200 h-12 text-xs font-medium flex-col gap-1",
              activeCategory === cat
                ? "bg-purple-600 text-white shadow-lg border-purple-500"
                : "hover:bg-purple-50 hover:border-purple-300",
              "border-2"
            )}
            onClick={() => onCategoryChange(cat)}
          >
            <CategoryIcon category={cat} className="h-4 w-4" />
            <span className="block text-center leading-tight">{cat}</span>
          </AnimatedButton>
        ))}
      </div>
    </div>
  );
};
