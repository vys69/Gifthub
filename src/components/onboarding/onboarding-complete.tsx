import { PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OnboardingCompleteProps {
  userData: {
    groupCode: string;
    name: string;
    avatar: string;
    preferences: string[];
    amazonConnected: boolean;
  };
}

export function OnboardingComplete({ userData }: OnboardingCompleteProps) {
  return (
    <Card className="border-0 md:border">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <PartyPopper className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl md:text-3xl">Welcome to the Group!</CardTitle>
        <p className="text-sm text-muted-foreground">
          You're all set to start gifting with your friends
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-foreground/50 rounded-full blur opacity-75" />
            <img
              src={userData.avatar}
              alt="Your avatar"
              className="relative w-32 h-32 rounded-full border-2 border-background"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-semibold">Your Profile</h3>
            <p className="text-lg">{userData.name}</p>
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-semibold">Group Code</h3>
            <p className="text-lg font-mono">{userData.groupCode}</p>
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-semibold">Gift Preferences</h3>
            <p className="text-lg">{userData.preferences.length} items added</p>
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-semibold">Amazon Integration</h3>
            <p className="text-lg">
              {userData.amazonConnected ? 'Connected' : 'Not connected'}
            </p>
          </div>
        </div>
        <Button className="w-full" size="lg">
          Start Gifting
        </Button>
      </CardContent>
    </Card>
  );
}