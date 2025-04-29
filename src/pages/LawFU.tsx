
import { LawEducation } from "@/components/learning/LawEducation";

export default function LawFU() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-500 bg-clip-text text-transparent animate-glow">
          LAW F U - Legal Education Platform
        </h1>
        <p className="text-muted-foreground">
          Understand your rights and learn essential legal knowledge to protect yourself
        </p>
      </div>
      <LawEducation />
    </div>
  );
}
