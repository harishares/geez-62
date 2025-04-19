
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  message: z.string().min(10, { message: "Your message must be at least 10 characters." }),
});

type StartupRequestFormProps = {
  ideaId: string;
  onSubmit: (ideaId: string, message: string) => void;
  onCancel: () => void;
};

export function StartupRequestForm({ ideaId, onSubmit, onCancel }: StartupRequestFormProps) {
  // Mock user profile data - in a real app, this would come from a user context or API
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    skills: ["Frontend Development", "UI/UX Design", "React"],
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(ideaId, values.message);
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/40 p-4 rounded-md">
        <h3 className="font-medium mb-2">Your Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Name</p>
            <p>{userProfile.name}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Email</p>
            <p>{userProfile.email}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-muted-foreground">Skills</p>
            <p>{userProfile.skills.join(", ")}</p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Why do you want to join this startup?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Explain how your skills can contribute to the success of this startup..."
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Send Request
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
