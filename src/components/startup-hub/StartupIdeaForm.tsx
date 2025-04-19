
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, Upload } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, { message: "Startup name must be at least 2 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  budget: z.string().min(1, { message: "Please enter an estimated budget." }),
  stage: z.enum(["idea", "prototype", "launch"]),
  roles: z.string().min(2, { message: "Please enter at least one role/skill needed." }),
  isOpenForCollaboration: z.boolean().default(true),
});

type StartupIdeaFormProps = {
  onSubmitted: () => void;
};

export function StartupIdeaForm({ onSubmitted }: StartupIdeaFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      budget: "",
      stage: "idea",
      roles: "",
      isOpenForCollaboration: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would send this data to your backend
    console.log("Form values:", values);
    console.log("Files:", files);
    
    // Show success message
    toast.success("Your startup idea has been submitted!");
    
    // Reset form
    form.reset();
    setFiles([]);
    
    // Close the form
    onSubmitted();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Startup Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your startup name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Detailed Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your startup idea in detail..." 
                    className="min-h-32" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Budget ($)</FormLabel>
                <FormControl>
                  <Input placeholder="10000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Stage</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="idea">Idea</SelectItem>
                    <SelectItem value="prototype">Prototype</SelectItem>
                    <SelectItem value="launch">Launch</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Roles/Skills Needed</FormLabel>
                <FormControl>
                  <Input placeholder="Developer, Designer, Marketer, etc." {...field} />
                </FormControl>
                <FormDescription>
                  Separate multiple roles with commas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormLabel className="block mb-2">Upload Images or Files</FormLabel>
            <div className="border border-input rounded-md p-4 bg-background">
              <label className="flex flex-col items-center justify-center cursor-pointer gap-2">
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                <Input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>
              
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Uploaded files:</h4>
                  <ul className="text-sm">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="isOpenForCollaboration"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 md:col-span-2">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Open for Collaboration</FormLabel>
                  <FormDescription>
                    Allow others to request to join your startup idea
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSubmitted}>
            Cancel
          </Button>
          <Button type="submit">
            Submit Startup Idea
          </Button>
        </div>
      </form>
    </Form>
  );
}
