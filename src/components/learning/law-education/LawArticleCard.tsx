
import { Badge } from "@/components/ui/badge";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import { LawArticle } from "./types";

interface LawArticleCardProps {
  article: LawArticle;
  selectedLanguage: "english" | "tamil";
}

export function LawArticleCard({ article, selectedLanguage }: LawArticleCardProps) {
  return (
    <AccordionItem 
      key={article.id} 
      value={article.id}
      className="border border-purple-800/30 bg-purple-950/30 rounded-lg overflow-hidden hover:bg-purple-900/20 transition-colors"
    >
      <AccordionTrigger className="px-4 py-3 hover:no-underline data-[state=open]:bg-purple-900/30 transition-colors">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-600/20 text-purple-300 hover:bg-purple-600/30">
              {article.category}
            </Badge>
          </div>
          <h3 className="text-lg font-medium text-purple-100 mt-2">{article.title}</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-purple-950/20 px-4 py-4 text-purple-200/90">
        <p className="mb-4">{article.description}</p>
        <div className="flex items-center gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-purple-900/30 border-purple-500/30 hover:bg-purple-700/40 text-purple-200"
            onClick={() => window.open(article.videoUrl, "_blank")}
          >
            <Youtube className="h-4 w-4 mr-2 text-red-400" />
            {selectedLanguage === "english" ? "Watch Video Explanation" : "வீடியோ விளக்கத்தைப் பார்க்கவும்"}
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
