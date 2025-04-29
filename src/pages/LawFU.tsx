
import { LawEducation } from "@/components/learning/LawEducation";
import { Helmet } from "react-helmet";

export default function LawFU() {
  return (
    <>
      <Helmet>
        <title>LAW F U - Legal Education for Self-Protection</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">LAW F U - Legal Education Platform</h1>
          <p className="text-muted-foreground">
            Understand your rights and learn essential legal knowledge to protect yourself
          </p>
        </div>
        <LawEducation />
      </div>
    </>
  );
}
