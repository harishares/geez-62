
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);
  
  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))] flex items-center justify-center relative px-4">
      <div className="text-center z-10 p-6 md:p-8 backdrop-blur-sm bg-background/30 rounded-xl border border-primary/20 shadow-lg max-w-md w-full">
        <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-primary/20">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Welcome to GEN Z CLG</h1>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-300">The Ultimate AI-Powered College Hub</h2>
        <p className="text-lg md:text-xl text-purple-200">Connect. Learn. Earn.</p>
        <p className="mt-4 mb-6 text-purple-100/80">Your gateway to a collaborative learning experience</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium shadow-md"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-900/20"
            onClick={() => navigate("/learning")}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
