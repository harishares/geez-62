
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

export function SubscriptionCard() {
  const handlePaymentSuccess = () => {
    // Here we'll update the subscription status
    console.log("Payment successful");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Mentorship Pro</CardTitle>
        <CardDescription>Get unlimited access to all features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-2xl font-bold">₹50<span className="text-sm font-normal text-muted-foreground">/week</span></p>
          <p className="text-sm text-muted-foreground">First month only ₹50</p>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center">
            ✓ 1-on-1 Video Call scheduling
          </li>
          <li className="flex items-center">
            ✓ Audio calling
          </li>
          <li className="flex items-center">
            ✓ Private messaging/chat
          </li>
          <li className="flex items-center">
            ✓ Full library of pre-recorded content
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Start Free Trial</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <UPIPayment amount={50} onSuccess={handlePaymentSuccess} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
