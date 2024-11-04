import { useState } from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface UserProfileProps {
  onNext: (name: string, avatar: string) => void;
  onBack: () => void;
}

const AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Max&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella&backgroundColor=d1d4f9',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie&backgroundColor=ffd5dc',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy&backgroundColor=ffdfbf',
];

export function UserProfile({ onNext, onBack }: UserProfileProps) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!selectedAvatar) {
      toast.error('Please select an avatar');
      return;
    }
    onNext(name.trim(), selectedAvatar);
  };

  return (
    <Card className="border-0 md:border">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <User className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl md:text-3xl">Create Your Profile</CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose a name and avatar for your gifting profile
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-center text-lg h-12"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AVATARS.map((avatar) => (
              <button
                key={avatar}
                type="button"
                onClick={() => setSelectedAvatar(avatar)}
                className={cn(
                  'aspect-square rounded-xl p-2 transition-all hover:scale-105',
                  selectedAvatar === avatar
                    ? 'ring-2 ring-primary bg-primary/10'
                    : 'hover:bg-accent'
                )}
              >
                <img
                  src={avatar}
                  alt="Avatar option"
                  className="w-full h-full object-contain rounded-lg"
                />
              </button>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}