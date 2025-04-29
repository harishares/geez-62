
export type Category = 
  | "Fundamental Rights" 
  | "Self-Protection, Criminal Law" 
  | "Cyber Laws" 
  | "Work" 
  | "Home Safety & Family" 
  | "Consumer & Property" 
  | "Emergencies" 
  | "Women & Children" 
  | "Technology" 
  | "Student" 
  | "Others";

export interface LawArticle {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: Category;
}

export type Language = "english" | "tamil";

export interface LawContent {
  english: LawArticle[];
  tamil: LawArticle[];
}
