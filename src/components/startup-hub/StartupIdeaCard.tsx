
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Users } from "lucide-react";
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

type StartupIdeaCardProps = {
  idea: StartupIdea;
  onRequestJoin: (ideaId: string) => void;
};

export function StartupIdeaCard({ idea, onRequestJoin }: StartupIdeaCardProps) {
  const { id, name, description, budget, stage, roles, owner, isOpenForCollaboration } = idea;

  const formatBudget = (amount: string) => {
    const num = parseInt(amount);
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num}`;
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "idea":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "prototype":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "launch":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const truncateDescription = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleRequestJoin = () => {
    if (!isOpenForCollaboration) {
      toast.error("This startup is not open for collaboration at this time");
      return;
    }
    onRequestJoin(id);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant="outline" className={getStageColor(stage)}>
            {stage.charAt(0).toUpperCase() + stage.slice(1)}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={owner.avatar} alt={owner.name} />
            <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{owner.name}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {roles.slice(0, 3).map((role, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {role}
            </Badge>
          ))}
          {roles.length > 3 && (
            <Badge variant="secondary" className="font-normal">
              +{roles.length - 3} more
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {truncateDescription(description)}
        </p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>{formatBudget(budget)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{isOpenForCollaboration ? "Open to join" : "Closed"}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button 
          variant={isOpenForCollaboration ? "default" : "outline"}
          className="w-full"
          onClick={handleRequestJoin}
          disabled={!isOpenForCollaboration}
        >
          {isOpenForCollaboration ? "Request to Join" : "Not Open for Collaboration"}
        </Button>
      </CardFooter>
    </Card>
  );
}
