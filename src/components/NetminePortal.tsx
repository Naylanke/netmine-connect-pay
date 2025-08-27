import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wifi, Clock, Calendar, Shield, CheckCircle, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import netmineLogo from "@/assets/netmine-logo.png";

interface PricingPlan {
  duration: string;
  price: number;
  popular?: boolean;
  icon: React.ReactNode;
  description: string;
}

const pricingPlans: PricingPlan[] = [
  { duration: "1 Hour", price: 5, icon: <Clock className="h-5 w-5" />, description: "Quick browsing session" },
  { duration: "4 Hours", price: 20, icon: <Clock className="h-5 w-5" />, description: "Extended work session" },
  { duration: "6 Hours", price: 30, icon: <Clock className="h-5 w-5" />, description: "Half-day access" },
  { duration: "1 Day", price: 40, popular: true, icon: <Calendar className="h-5 w-5" />, description: "Full day unlimited" },
  { duration: "2 Days", price: 90, icon: <Calendar className="h-5 w-5" />, description: "Weekend package" },
  { duration: "3 Days", price: 120, icon: <Calendar className="h-5 w-5" />, description: "Extended stay" },
  { duration: "1 Week", price: 400, icon: <Calendar className="h-5 w-5" />, description: "Weekly unlimited" },
  { duration: "2 Weeks", price: 600, icon: <Calendar className="h-5 w-5" />, description: "Bi-weekly access" },
  { duration: "4 Weeks", price: 1000, icon: <Calendar className="h-5 w-5" />, description: "Monthly unlimited" },
];

export default function NetminePortal() {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, "");
    
    // Handle different input formats
    if (cleaned.startsWith("254")) {
      return `+${cleaned}`;
    } else if (cleaned.startsWith("0")) {
      return `+254${cleaned.slice(1)}`;
    } else if (cleaned.length <= 9) {
      return `+254${cleaned}`;
    }
    return `+${cleaned}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handlePayment = async () => {
    if (!selectedPlan || !phoneNumber) return;
    
    setIsProcessing(true);
    
    // Simulate MPesa payment process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Payment Initiated",
      description: `MPesa payment request sent to ${phoneNumber}. Please complete the payment on your phone.`,
    });
    
    setIsProcessing(false);
    setDialogOpen(false);
    setPhoneNumber("");
    setSelectedPlan(null);
  };

  const selectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-primary shadow-elevation-2">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-white rounded-2xl p-3 shadow-elevation-2">
              <img src={netmineLogo} alt="Netmine" className="w-full h-full object-contain" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Netmine</h1>
              <p className="text-white/90 text-lg">Premium WiFi Access Portal</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Wifi className="h-5 w-5" />
              <span>High-Speed Internet</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Secure Connection</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Instant Access</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Internet Plan</h2>
          <p className="text-muted-foreground text-lg">
            Select the perfect plan for your connectivity needs. Pay securely with MPesa.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.duration}
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-elevation-3 hover:-translate-y-1 animate-fade-in border-2 ${
                plan.popular 
                  ? 'border-primary shadow-elevation-2 bg-gradient-card' 
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => selectPlan(plan)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-firebase text-white px-4 py-1 rounded-full text-sm font-semibold shadow-button">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold">{plan.duration}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">KSH {plan.price}</span>
                  <p className="text-muted-foreground mt-2">One-time payment</p>
                </div>
                
                <Button 
                  variant="pricing" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectPlan(plan);
                  }}
                >
                  <Smartphone className="h-4 w-4" />
                  Pay with MPesa
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MPesa Payment Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md bg-card border-border shadow-elevation-3">
            <DialogHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-safaricom/10 rounded-full flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-safaricom" />
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold">MPesa Payment</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {selectedPlan && (
                  <>Complete your payment for <strong>{selectedPlan.duration}</strong> access (KSH {selectedPlan.price})</>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="text-center text-lg font-mono shadow-elevation-1"
                  maxLength={13}
                />
                <p className="text-xs text-muted-foreground text-center">
                  Enter your Safaricom number to receive MPesa prompt
                </p>
              </div>
              
              {selectedPlan && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Plan:</span>
                    <span className="font-medium">{selectedPlan.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="font-bold text-lg text-primary">KSH {selectedPlan.price}</span>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setDialogOpen(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  variant="mpesa"
                  className="flex-1"
                  onClick={handlePayment}
                  disabled={!phoneNumber || phoneNumber.length < 13 || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-pulse-subtle">Processing...</div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Pay Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 Netmine. Secure WiFi access powered by Safaricom MPesa.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              For support, contact your network administrator.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}