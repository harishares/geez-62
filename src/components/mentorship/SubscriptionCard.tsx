
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UPIPayment } from "../payment/UPIPayment";
import { Check, Video, PhoneCall, MessageSquare, BookOpen } from "lucide-react";
import { toast } from "sonner";

export function SubscriptionCard() {
  // Simulate free trial by default -- if "isSubscribed" allow all premium features
  const [isSubscribed, setIsSubscribed] = useState(true);

  const handlePaymentSuccess = () => {
    setIsSubscribed(true);
    toast.success("You're now subscribed to Mentorship Pro!");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Mentorship Pro</CardTitle>
        <CardDescription>Get unlimited access to all mentorship features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-3xl font-bold">₹50<span className="text-sm font-normal text-muted-foreground">/week</span></p>
          <p className="text-sm text-muted-foreground">First month only ₹50</p>
        </div>
        
        <ul className="space-y-3">
          <li className="flex items-center">
            <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="space-y-1">
              <span className="font-medium flex items-center">
                <Video className="mr-2 h-4 w-4 text-primary" />
                1-on-1 Video Call scheduling
              </span>
              <p className="text-xs text-muted-foreground">Schedule personalized sessions with mentors</p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="space-y-1">
              <span className="font-medium flex items-center">
                <PhoneCall className="mr-2 h-4 w-4 text-primary" />
                Audio calling
              </span>
              <p className="text-xs text-muted-foreground">Talk directly with your mentors</p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="space-y-1">
              <span className="font-medium flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                Private messaging/chat
              </span>
              <p className="text-xs text-muted-foreground">Get instant answers to your questions</p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="space-y-1">
              <span className="font-medium flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-primary" />
                Full library of pre-recorded content
              </span>
              <p className="text-xs text-muted-foreground">Access all learning materials and video lessons</p>
            </div>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        {isSubscribed ? (
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" disabled>
            <Check className="mr-2 h-4 w-4" />
            You're Subscribed
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Start Free Trial</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <UPIPayment amount={50} onSuccess={handlePaymentSuccess} />
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
