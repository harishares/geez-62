
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LawArticle } from "./types";
import { LawArticleItem } from "./LawArticleItem";
import { EmptyState } from "./EmptyState";

interface ArticlesListProps {
  articles: LawArticle[];
  savedArticles: string[];
  onToggleSave: (id: string) => void;
  onResetFilters: () => void;
}

export const ArticlesList = ({ 
  articles, 
  savedArticles, 
  onToggleSave,
  onResetFilters
}: ArticlesListProps) => {
  return (
    <ScrollArea className="h-[500px] pr-4">
      {articles.length > 0 ? (
        <div className="space-y-4">
          <Accordion type="multiple" className="w-full">
            {articles.map(article => (
              <LawArticleItem
                key={article.id}
                article={article}
                isSaved={savedArticles.includes(article.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </Accordion>
        </div>
      ) : (
        <EmptyState onReset={onResetFilters} />
      )}
    </ScrollArea>
  );
};
