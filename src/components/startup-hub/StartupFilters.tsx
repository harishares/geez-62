
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

const categories = [
  "All Categories",
  "Tech",
  "Education",
  "Health",
  "Food",
  "Green Tech",
  "Finance",
  "Social Impact",
  "Entertainment",
];

const skillOptions = [
  "Developer",
  "Designer",
  "Marketer",
  "Sales",
  "Operations",
  "Product Manager",
  "UX/UI",
  "Data Scientist",
  "Content Creator",
];

export function StartupFilters() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [stage, setStage] = useState("all");
  const [budgetRange, setBudgetRange] = useState([0, 500000]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleReset = () => {
    setSearch("");
    setCategory("All Categories");
    setStage("all");
    setBudgetRange([0, 500000]);
    setSelectedSkills([]);
  };

  const formatBudget = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Filter Startup Ideas</h3>
          <Button variant="ghost" size="sm" onClick={handleReset} className="h-8">
            <X className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <div className="relative mt-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search startup ideas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="stage">Stage</Label>
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger id="stage" className="mt-1">
                <SelectValue placeholder="Select a stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="idea">Idea</SelectItem>
                <SelectItem value="prototype">Prototype</SelectItem>
                <SelectItem value="launch">Launch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex justify-between">
              <Label htmlFor="budget-range">Budget Range</Label>
              <span className="text-xs text-muted-foreground">
                {formatBudget(budgetRange[0])} - {formatBudget(budgetRange[1])}
              </span>
            </div>
            <Slider
              id="budget-range"
              min={0}
              max={1000000}
              step={10000}
              value={budgetRange}
              onValueChange={setBudgetRange}
              className="mt-5"
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Skills Needed</Label>
          <div className="flex flex-wrap gap-3">
            {skillOptions.map((skill) => (
              <div
                key={skill}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={`skill-${skill}`}
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={() => handleSkillToggle(skill)}
                />
                <label
                  htmlFor={`skill-${skill}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
