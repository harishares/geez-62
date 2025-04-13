
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto">
      <div className="grid gap-6">
        <Card className="p-6 performance-card">
          <h1 className="text-3xl font-bold mb-4">Welcome to GEN Z CLG</h1>
          <p className="text-lg mb-6">Your portal to connect, learn, and earn in the digital economy.</p>
          
          <div className="flex flex-wrap gap-4">
            <Button className="hover-scale group" variant="default">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Get Started
              </span>
            </Button>
            <Button className="hover-scale group" variant="outline">
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Explore Features
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
