
import { BookOpen, Film, Gavel, Info, Languages, Lightbulb, Scale, Search, Shield, Tags } from "lucide-react";
import { Category, LawContent } from "./types";

export const getCategoryIcon = (category: Category | "All") => {
  switch (category) {
    case "Fundamental Rights":
      return <Scale className="h-4 w-4" />;
    case "Self-Protection, Criminal Law":
      return <Shield className="h-4 w-4" />;
    case "Cyber Laws":
      return <Lightbulb className="h-4 w-4" />;
    case "Work":
      return <Lightbulb className="h-4 w-4" />;
    case "Women & Children":
      return <Shield className="h-4 w-4" />;
    case "Student":
      return <BookOpen className="h-4 w-4" />;
    case "Home Safety & Family":
      return <Shield className="h-4 w-4" />;
    case "Consumer & Property":
      return <Gavel className="h-4 w-4" />;
    case "Emergencies":
      return <Info className="h-4 w-4" />;
    case "Technology":
      return <Lightbulb className="h-4 w-4" />;
    case "All":
      return <Tags className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

export const lawContent: LawContent = {
  english: [
    {
      id: "fundamental-rights",
      title: "Understanding Fundamental Rights",
      description: "Your basic rights guaranteed by the Constitution.",
      videoUrl: "https://youtube.com/watch?v=example1",
      category: "Fundamental Rights"
    },
    {
      id: "women-rights",
      title: "Women & Children Rights",
      description: "Protection laws for women and children.",
      videoUrl: "https://youtube.com/watch?v=example19",
      category: "Women & Children"
    },
    {
      id: "self-defense",
      title: "Self Defense & Harassment Laws",
      description: "How to legally protect yourself from physical and verbal abuse.",
      videoUrl: "https://youtube.com/watch?v=example18",
      category: "Self-Protection, Criminal Law"
    },
    {
      id: "criminal-laws",
      title: "Essential Criminal Laws for Self-Protection",
      description: "Key criminal laws to protect yourself.",
      videoUrl: "https://youtube.com/watch?v=example2",
      category: "Self-Protection, Criminal Law"
    },
    {
      id: "cyber-security",
      title: "Cyber Security and Digital Rights",
      description: "Stay safe and secure online.",
      videoUrl: "https://youtube.com/watch?v=example3",
      category: "Cyber Laws"
    },
    {
      id: "student-rights",
      title: "Student Rights & Exam Malpractices",
      description: "Rights and remedies for students.",
      videoUrl: "https://youtube.com/watch?v=example17",
      category: "Student"
    },
    {
      id: "workplace-rights",
      title: "Workplace Rights and Protection",
      description: "Protection from harassment and discrimination at work.",
      videoUrl: "https://youtube.com/watch?v=example4",
      category: "Work"
    },
    {
      id: "domestic-violence",
      title: "Protection Against Domestic Violence",
      description: "Legal remedies and protection at home.",
      videoUrl: "https://youtube.com/watch?v=example5",
      category: "Home Safety & Family"
    },
    {
      id: "consumer-rights",
      title: "Consumer Protection Laws",
      description: "Your rights as a consumer and how to handle fraud.",
      videoUrl: "https://youtube.com/watch?v=example6",
      category: "Consumer & Property"
    },
    {
      id: "property-rights",
      title: "Property Rights and Protection",
      description: "Protect your property from fraud.",
      videoUrl: "https://youtube.com/watch?v=example7",
      category: "Consumer & Property"
    },
    {
      id: "emergency-rights",
      title: "Rights During Emergency Situations",
      description: "Your rights and protection during emergencies and disasters.",
      videoUrl: "https://youtube.com/watch?v=example8",
      category: "Emergencies"
    },
    {
      id: "internet-technology",
      title: "Technology Use & Internet Laws",
      description: "Everything you need to know about technology law.",
      videoUrl: "https://youtube.com/watch?v=example20",
      category: "Technology"
    },
    {
      id: "other-laws",
      title: "Other Useful Laws",
      description: "Miscellaneous Indian laws everyone should know.",
      videoUrl: "https://youtube.com/watch?v=example21",
      category: "Others"
    }
  ],
  tamil: [
    {
      id: "fundamental-rights-tamil",
      title: "அடிப்படை உரிமைகள்",
      description: "அரசியலமைப்பால் உங்களுக்கான அடிப்படை உரிமைகள்.",
      videoUrl: "https://youtube.com/watch?v=example9",
      category: "Fundamental Rights"
    },
    {
      id: "women-rights-tamil",
      title: "பெண்கள் மற்றும் குழந்தைகள் உரிமைகள்",
      description: "பெண்கள் மற்றும் குழந்தைகளுக்கான பாதுகாப்பு சட்டங்கள்.",
      videoUrl: "https://youtube.com/watch?v=example23",
      category: "Women & Children"
    },
    {
      id: "self-defense-tamil",
      title: "சுய பாதுகாப்பு & தொல்லையின்மையைப் பாதுகாக்கும் சட்டங்கள்",
      description: "உங்களை உடல்/முயற்சித் தொல்லைிலிருந்து சட்டரீதியாக பாதுகாப்பது எப்படி.",
      videoUrl: "https://youtube.com/watch?v=example22",
      category: "Self-Protection, Criminal Law"
    },
    {
      id: "criminal-laws-tamil",
      title: "சுய பாதுகாப்புக்கான குற்றவியல் சட்டங்கள்",
      description: "உங்களைப் பாதுகாக்கும் முக்கிய சட்டங்கள்.",
      videoUrl: "https://youtube.com/watch?v=example10",
      category: "Self-Protection, Criminal Law"
    },
    {
      id: "cyber-security-tamil",
      title: "இணைய பாதுகாப்பு மற்றும் டிஜிட்டல் உரிமைகள்",
      description: "ஆன்லைன் பாதுகாப்பு மற்றும் சட்ட உரிமைகள்.",
      videoUrl: "https://youtube.com/watch?v=example11",
      category: "Cyber Laws"
    },
    {
      id: "student-rights-tamil",
      title: "மாணவர் உரிமைகள் மற்றும் பரீட்சை முறைகேடுகள்",
      description: "மாணவருக்கான உரிமைகள் மற்றும் தீர்வுகள்.",
      videoUrl: "https://youtube.com/watch?v=example24",
      category: "Student"
    },
    {
      id: "workplace-rights-tamil",
      title: "பணியிட உரிமைகள் மற்றும் பாதுகாப்பு",
      description: "பணியிடத்தில் சட்ட பாதுகாப்பு.",
      videoUrl: "https://youtube.com/watch?v=example12",
      category: "Work"
    },
    {
      id: "domestic-violence-tamil",
      title: "குடும்ப வன்முறைக்கு எதிரான பாதுகாப்பு",
      description: "வீட்டில் சட்ட பாதுகாப்பு.",
      videoUrl: "https://youtube.com/watch?v=example13",
      category: "Home Safety & Family"
    },
    {
      id: "consumer-rights-tamil",
      title: "நுகர்வோர் பாதுகாப்பு சட்டங்கள்",
      description: "நுகர்வோர் சட்ட உரிமைகள்.",
      videoUrl: "https://youtube.com/watch?v=example14",
      category: "Consumer & Property"
    },
    {
      id: "property-rights-tamil",
      title: "சொத்து உரிமைகள் மற்றும் பாதுகாப்பு",
      description: "சொத்துக்களை பாதுகாக்கும் சட்டங்கள்.",
      videoUrl: "https://youtube.com/watch?v=example15",
      category: "Consumer & Property"
    },
    {
      id: "emergency-rights-tamil",
      title: "அவசரகால உரிமைகள்",
      description: "அவசரநேரங்களில் சட்ட பாதுகாப்பு.",
      videoUrl: "https://youtube.com/watch?v=example16",
      category: "Emergencies"
    },
    {
      id: "internet-technology-tamil",
      title: "உயிர்நிலை மற்றும் இணைய சட்டங்கள்",
      description: "நுட்ப இந்து சட்டங்கள்.",
      videoUrl: "https://youtube.com/watch?v=example25",
      category: "Technology"
    },
    {
      id: "other-laws-tamil",
      title: "பிற பயனுள்ள சட்டங்கள்",
      description: "அனைவரும் அறிந்து கொள்ளவேண்டிய சட்டங்கள்.",
      videoUrl: "https://youtube.com/watch?v=example26",
      category: "Others"
    }
  ]
};

export const categories: Category[] = [
  "Fundamental Rights",
  "Self-Protection, Criminal Law",
  "Women & Children",
  "Cyber Laws",
  "Student",
  "Work",
  "Home Safety & Family",
  "Consumer & Property",
  "Emergencies",
  "Technology",
  "Others"
];
