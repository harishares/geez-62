
import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Language, LawArticle, Category } from "./types";
import { lawContent } from "./law-data";
import { LanguageToggle } from "./LanguageToggle";
import { SearchBar } from "./SearchBar";
import { SavedToggle } from "./SavedToggle";
import { CategoryFilter } from "./CategoryFilter";
import { ArticlesList } from "./ArticlesList";

export function LawEducationContainer() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  // Filter articles based on category, search term, and saved status
  const filteredArticles = lawContent[selectedLanguage].filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSaved = !showSaved || savedArticles.includes(article.id);
    
    return matchesCategory && matchesSearch && (showSaved ? matchesSaved : true);
  });

  // Load saved articles from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedLawArticles");
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, []);

  // Save articles to localStorage when savedArticles changes
  useEffect(() => {
    localStorage.setItem("savedLawArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  const toggleSaveArticle = (id: string) => {
    setSavedArticles(prev => {
      if (prev.includes(id)) {
        return prev.filter(articleId => articleId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
    setShowSaved(false);
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
  };

  return (
    <Card className="bg-opacity-20 backdrop-blur-sm border-purple-800/40 bg-[rgba(38,30,65,0.4)] overflow-hidden hover:shadow-lg hover:shadow-purple-800/20 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 animate-float">
            <Shield className="h-6 w-6 text-purple-400" />
            <CardTitle>LAW F U - Legal Education for Self-Protection</CardTitle>
          </div>
          <LanguageToggle 
            selectedLanguage={selectedLanguage} 
            onToggle={handleLanguageChange}
          />
        </div>
        <CardDescription>
          {selectedLanguage === "english"
            ? "Learn essential Indian laws to protect yourself and understand your rights"
            : "உங்களைப் பாதுகாக்க அத்தியாவசிய இந்திய சட்டங்களைக் கற்றுக்கொள்ளுங்கள்"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder={selectedLanguage === "english" ? "Search topics..." : "தலைப்புகளைத் தேடுங்கள்..."}
            />
            <SavedToggle
              showSaved={showSaved}
              onToggle={() => setShowSaved(!showSaved)}
            />
          </div>

          {/* Category Pills */}
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          {/* Content Area */}
          <ArticlesList
            articles={filteredArticles}
            savedArticles={savedArticles}
            onToggleSave={toggleSaveArticle}
            onResetFilters={resetFilters}
          />
        </div>
      </CardContent>

      <CardFooter className="border-t border-border/30 bg-background/10 py-3 px-6">
        <div className="text-xs text-muted-foreground flex justify-between w-full">
          <span>Articles: {filteredArticles.length} of {lawContent[selectedLanguage].length}</span>
          <span>Last updated: April 2025</span>
        </div>
      </CardFooter>
    </Card>
  );
}
