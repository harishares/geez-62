
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  // Check if the user is already logged in, and if so, redirect to dashboard
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    if (userLoggedIn) {
      navigate("/dashboard"); // Redirect to dashboard if logged in
    }
  }, [navigate]);
  
  const handleGetStarted = () => {
    // Set user as logged in and redirect directly to dashboard
    localStorage.setItem("userLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <div className="fixed inset-0 w-full h-full">
        <img 
          src="/lovable-uploads/796b2bf1-a44e-4399-8064-677f9a614493.png" 
          alt="Digital Network Background" 
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="text-center z-10 p-6 md:p-8 backdrop-blur-xl bg-black/40 rounded-xl border border-purple-500/30 shadow-lg max-w-md w-full">
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
