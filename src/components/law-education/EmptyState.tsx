
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState = ({ onReset }: EmptyStateProps) => {
  return (
    <div className="text-center text-muted-foreground mt-10 animate-fade-in">
      <BookOpen className="mx-auto h-8 w-8 mb-4" />
      <p>No topics found matching your criteria.</p>
      <Button 
        variant="link" 
        className="mt-2 text-purple-400"
        onClick={onReset}
      >
        Clear all filters
      </Button>
    </div>
  );
};
