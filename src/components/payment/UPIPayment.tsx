
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UPI_ID = "6380566449@fam";

export function UPIPayment({ amount, onSuccess }: { amount: number, onSuccess?: () => void }) {
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast({
      title: "UPI ID Copied",
      description: "The UPI ID has been copied to your clipboard",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId) {
      toast({
        title: "Error",
        description: "Please enter the transaction ID",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Here we'll submit the transaction ID to be verified later
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Payment Submitted",
        description: "Your payment is being verified.",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit payment verification",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>UPI Payment</CardTitle>
        <CardDescription>
          Complete your payment using any UPI app (GPay, PhonePe, Paytm, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Amount to Pay</Label>
              <span className="text-xl font-bold">₹{amount}</span>
            </div>
            <div className="space-y-1">
              <Label>UPI ID</Label>
              <div className="flex gap-2">
                <Input value={UPI_ID} readOnly />
                <Button variant="outline" onClick={handleCopyUPI}>
                  Copy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Open your UPI app, select "Pay to UPI ID" and enter this UPI ID
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transactionId">UPI Transaction ID</Label>
              <Input
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter the transaction ID from your UPI app"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify Payment"}
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        Please save the transaction ID for your records
      </CardFooter>
    </Card>
  );
}
