
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SearchBar } from "./law-education/SearchBar";
import { CategoryFilter } from "./law-education/CategoryFilter";
import { ArticlesList } from "./law-education/ArticlesList";
import { LawEducationHeader } from "./law-education/LawEducationHeader";
import { LawEducationFooter } from "./law-education/LawEducationFooter";
import { Category, Language } from "./law-education/types";
import { categories, lawContent } from "./law-education/utils";

export function LawEducation() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredArticles = lawContent[selectedLanguage].filter(
    (article) => 
      (activeCategory === "All" || article.category === activeCategory) &&
      (searchQuery === "" || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-gradient-to-br from-purple-900/40 to-black/60">
      <CardHeader className="border-b border-purple-800/30">
        <LawEducationHeader 
          selectedLanguage={selectedLanguage} 
          setSelectedLanguage={setSelectedLanguage} 
        />
      </CardHeader>
      
      <CardContent className="p-4 pt-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              selectedLanguage={selectedLanguage} 
            />
          </div>
          
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
        </div>
        
        <ArticlesList 
          filteredArticles={filteredArticles} 
          selectedLanguage={selectedLanguage} 
        />
      </CardContent>
      
      <CardFooter className="border-t border-purple-800/30 px-6 py-4 flex justify-between">
        <LawEducationFooter 
          filteredArticlesCount={filteredArticles.length} 
          selectedLanguage={selectedLanguage} 
        />
      </CardFooter>
    </Card>
  );
}
