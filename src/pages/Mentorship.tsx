
import { SubscriptionCard } from "@/components/mentorship/SubscriptionCard";

export default function Mentorship() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Mentorship Program</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get personalized guidance from experienced mentors to accelerate your growth.
        </p>
      </div>
      
      <div className="flex justify-center items-center py-8">
        <SubscriptionCard />
      </div>
    </div>
  );
}
