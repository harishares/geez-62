
import { Bookmark, Film, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CategoryIcon } from "./CategoryIcon";
import { LawArticle } from "./types";

interface LawArticleItemProps {
  article: LawArticle;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const LawArticleItem = ({ article, isSaved, onToggleSave }: LawArticleItemProps) => {
  return (
    <AccordionItem 
      key={article.id} 
      value={article.id}
      className={cn(
        "border border-purple-800/30 mb-3 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300",
        "hover:border-purple-500/50 data-[state=open]:border-purple-500/50 data-[state=open]:shadow-md",
        "backdrop-blur-sm bg-[rgba(38,30,65,0.2)]"
      )}
    >
      <AccordionTrigger 
        className={cn(
          "px-4 py-3 hover:no-underline data-[state=open]:bg-purple-900/20",
          "group transition-all duration-300"
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full text-left gap-2">
          <div className="flex items-start gap-2">
            <CategoryIcon category={article.category} className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-base group-hover:text-purple-300 transition-colors duration-200">
                {article.title}
              </h3>
              <p className="text-xs text-muted-foreground">{article.category}</p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(article.id);
            }}
          >
            <Bookmark 
              className={cn(
                "h-4 w-4", 
                isSaved 
                  ? "fill-purple-500 text-purple-500" 
                  : "text-muted-foreground"
              )} 
            />
            <span className="sr-only">
              {isSaved ? "Unsave" : "Save"} article
            </span>
          </Button>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-2 pb-4 animate-fade-in">
        <div className="pl-7 space-y-3">
          <p className="text-sm">{article.description}</p>
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-purple-400" />
            <span className="text-xs text-muted-foreground">Video Explanation</span>
          </div>
          <AnimatedButton
            size="sm"
            className="bg-purple-600/80 hover:bg-purple-600 text-white rounded-md"
            onClick={() => window.open(article.videoUrl, '_blank')}
          >
            <Youtube className="h-4 w-4 mr-1.5" />
            Watch Video
          </AnimatedButton>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
