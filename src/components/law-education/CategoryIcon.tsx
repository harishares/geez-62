
import { Shield, BookOpen, Tags } from "lucide-react";
import { Category } from "./types";

interface CategoryIconProps {
  category: Category | "All";
  className?: string;
}

export const CategoryIcon = ({ category, className }: CategoryIconProps) => {
  switch (category) {
    case "Student":
      return <BookOpen className={className} />;
    case "All":
      return <Tags className={className} />;
    default:
      return <Shield className={className} />;
  }
};
