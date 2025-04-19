import { useState, useEffect } from "react";
import { StartupIdeaCard } from "./StartupIdeaCard";
import { StartupRequestForm } from "./StartupRequestForm";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { toast } from "sonner";

type StartupIdea = {
  id: string;
  name: string;
  description: string;
  budget: string;
  stage: "idea" | "prototype" | "launch";
  roles: string[];
  owner: {
    name: string;
    avatar: string;
  };
  isOpenForCollaboration: boolean;
  createdAt: string;
  category: string;
};

// Mock data for demonstration
const MOCK_STARTUP_IDEAS: StartupIdea[] = [
  {
    id: "1",
    name: "EcoDelivery",
    description: "Sustainable delivery service using electric vehicles and optimized routes to reduce carbon footprint.",
    budget: "150000",
    stage: "prototype",
    roles: ["Developer", "Marketing", "Operations"],
    owner: {
      name: "Alex Kim",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    isOpenForCollaboration: true,
    createdAt: "2025-03-15",
    category: "Green Tech"
  },
  {
    id: "2",
    name: "MindfulMe",
    description: "AI-powered meditation app that adapts to your emotional state and progress.",
    budget: "75000",
    stage: "idea",
    roles: ["UX Designer", "AI Engineer", "Content Creator"],
    owner: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    isOpenForCollaboration: true,
    createdAt: "2025-04-02",
    category: "Health"
  },
  {
    id: "3",
    name: "CodeBuddy",
    description: "Peer programming platform that matches developers based on skill level and learning goals.",
    budget: "200000",
    stage: "launch",
    roles: ["Frontend Developer", "Backend Developer", "Community Manager"],
    owner: {
      name: "Jordan Lee",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    isOpenForCollaboration: false,
    createdAt: "2025-02-28",
    category: "Education"
  },
  {
    id: "4",
    name: "LocalEats",
    description: "Platform connecting home chefs with local customers for authentic, homemade meals.",
    budget: "100000",
    stage: "prototype",
    roles: ["Mobile Developer", "Sales", "Food Safety Expert"],
    owner: {
      name: "Miguel Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    isOpenForCollaboration: true,
    createdAt: "2025-03-22",
    category: "Food"
  },
];

type StartupIdeasListProps = {
  filter: "all" | "trending" | "my-ideas" | "joined";
  search?: string;
  category?: string;
  stageFilter?: string;
  budgetRange?: [number, number];
  skillsNeeded?: string[];
};

export function StartupIdeasList({ filter, search, category, stageFilter, budgetRange, skillsNeeded }: StartupIdeasListProps) {
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [requestingIdeaId, setRequestingIdeaId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching ideas from a server
    // In a real app, this would be an API call
    let filteredIdeas = [...MOCK_STARTUP_IDEAS];

    if (filter === "my-ideas") {
      // Simulate current user's ideas
      filteredIdeas = filteredIdeas.filter(idea => idea.owner.name === "John Doe");
    } else if (filter === "joined") {
      // Simulate startups the user has joined
      // This would require a more complex data model in a real app
      filteredIdeas = filteredIdeas.filter(idea => idea.id === "3");
    } else if (filter === "trending") {
      // Simulate trending ideas (just reordering for this demo)
      filteredIdeas = [...filteredIdeas].sort((a, b) => a.name.localeCompare(b.name));
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredIdeas = filteredIdeas.filter(idea => 
        idea.name.toLowerCase().includes(searchLower) || 
        idea.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (category && category !== "all") {
      filteredIdeas = filteredIdeas.filter(idea => idea.category === category);
    }

    // Apply stage filter
    if (stageFilter && stageFilter !== "all") {
      filteredIdeas = filteredIdeas.filter(idea => idea.stage === stageFilter);
    }

    // Apply budget range filter
    if (budgetRange) {
      filteredIdeas = filteredIdeas.filter(idea => {
        const budget = parseInt(idea.budget);
        return budget >= budgetRange[0] && budget <= budgetRange[1];
      });
    }

    // Apply skills needed filter
    if (skillsNeeded && skillsNeeded.length > 0) {
      filteredIdeas = filteredIdeas.filter(idea => 
        skillsNeeded.some(skill => 
          idea.roles.some(role => role.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    setIdeas(filteredIdeas);
  }, [filter, search, category, stageFilter, budgetRange, skillsNeeded]);

  const handleRequestJoin = (ideaId: string) => {
    setRequestingIdeaId(ideaId);
  };

  const handleRequestSubmit = (ideaId: string, message: string) => {
    // In a real app, send this request to the backend
    console.log(`Requesting to join idea ${ideaId} with message: ${message}`);
    toast.success("Your request has been sent to the startup owner!");
    setRequestingIdeaId(null);
  };

  const requestingIdea = ideas.find(idea => idea.id === requestingIdeaId);

  return (
    <div>
      {requestingIdeaId && requestingIdea && (
        <Card className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-2xl rounded-lg border shadow-lg relative p-6">
            <button 
              onClick={() => setRequestingIdeaId(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold mb-1">Request to Join</h2>
            <p className="text-muted-foreground mb-4">{requestingIdea.name}</p>
            <StartupRequestForm 
              ideaId={requestingIdeaId} 
              onSubmit={handleRequestSubmit}
              onCancel={() => setRequestingIdeaId(null)}
            />
          </div>
        </Card>
      )}

      {ideas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No startup ideas found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map(idea => (
            <StartupIdeaCard 
              key={idea.id}
              idea={idea}
              onRequestJoin={handleRequestJoin}
            />
          ))}
        </div>
      )}
    </div>
  );
}
