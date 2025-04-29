
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LawArticle, Language } from "./types";
import { LawArticleCard } from "./LawArticleCard";
import { EmptyState } from "./EmptyState";

interface ArticlesListProps {
  filteredArticles: LawArticle[];
  selectedLanguage: Language;
}

export function ArticlesList({ filteredArticles, selectedLanguage }: ArticlesListProps) {
  if (filteredArticles.length === 0) {
    return <EmptyState selectedLanguage={selectedLanguage} />;
  }

  return (
    <ScrollArea className="h-[500px] pr-4">
      <Accordion type="multiple" className="space-y-4">
        {filteredArticles.map((article) => (
          <LawArticleCard 
            key={article.id} 
            article={article} 
            selectedLanguage={selectedLanguage} 
          />
        ))}
      </Accordion>
    </ScrollArea>
  );
}
