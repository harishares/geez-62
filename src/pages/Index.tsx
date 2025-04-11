
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
          Gen Z CLG – The Ultimate AI-Powered College Hub
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Your all-in-one platform for modern college life
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold mb-2">Smart Learning</h2>
            <p className="text-gray-600">AI-powered study tools and resources to boost your academic performance</p>
          </Card>
          
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold mb-2">Campus Connect</h2>
            <p className="text-gray-600">Stay connected with events, clubs, and activities happening around campus</p>
          </Card>
          
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold mb-2">Career Launch</h2>
            <p className="text-gray-600">Get personalized career guidance and internship opportunities</p>
          </Card>
        </div>
        
        <Button className="mt-10 text-lg px-8 py-6" size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
