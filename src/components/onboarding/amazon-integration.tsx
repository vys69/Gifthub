import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

interface AmazonIntegrationProps {
  onNext: (connected: boolean) => void;
  onBack: () => void;
}

export function AmazonIntegration({ onNext, onBack }: AmazonIntegrationProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate Amazon OAuth flow
    setTimeout(() => {
      setIsConnecting(false);
      toast.success('Successfully connected to Amazon');
      onNext(true);
    }, 1500);
  };

  const handleSkip = () => {
    onNext(false);
  };

  return (
    <Card className="border-0 md:border">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl md:text-3xl">Connect with Amazon</CardTitle>
        <p className="text-sm text-muted-foreground">
          Link your Amazon account to enable one-click purchasing
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-semibold">Real-time Pricing</h3>
            <p className="text-sm text-muted-foreground">
              Get up-to-date prices from Amazon for all your wishlist items
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">One-Click Purchase</h3>
            <p className="text-sm text-muted-foreground">
              Buy gifts directly through our app using your Amazon account
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Shipping Integration</h3>
            <p className="text-sm text-muted-foreground">
              Use your saved Amazon shipping addresses for convenience
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Order Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Track your gift orders directly within the app
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row justify-between gap-4">
        <Button variant="ghost" onClick={onBack} className="w-full md:w-auto">
          Back
        </Button>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="w-full md:w-auto"
          >
            Skip for now
          </Button>
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full md:w-auto"
          >
            {isConnecting ? 'Connecting...' : 'Connect Amazon'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}