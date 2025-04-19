
import { useState } from "react";
import { StartupIdeasList } from "@/components/startup-hub/StartupIdeasList";
import { StartupIdeaForm } from "@/components/startup-hub/StartupIdeaForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { StartupFilters } from "@/components/startup-hub/StartupFilters";

export default function StartupHub() {
  const [showAddNew, setShowAddNew] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Startup Hub</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button 
              size="sm"
              onClick={() => setShowAddNew(!showAddNew)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Startup Idea
            </Button>
          </div>
        </div>
        
        <p className="text-muted-foreground">
          Connect with fellow entrepreneurs, share your startup ideas, or join exciting new ventures.
        </p>
      </div>

      {showFilters && <StartupFilters />}

      {showAddNew ? (
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Submit Your Startup Idea</h2>
          <StartupIdeaForm onSubmitted={() => setShowAddNew(false)} />
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="all">All Ideas</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="my-ideas">My Ideas</TabsTrigger>
            <TabsTrigger value="joined">Startups I've Joined</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <StartupIdeasList filter="all" />
          </TabsContent>
          <TabsContent value="trending">
            <StartupIdeasList filter="trending" />
          </TabsContent>
          <TabsContent value="my-ideas">
            <StartupIdeasList filter="my-ideas" />
          </TabsContent>
          <TabsContent value="joined">
            <StartupIdeasList filter="joined" />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
