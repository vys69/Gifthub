import { useState } from 'react';
import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface JoinGroupProps {
  onNext: (groupCode: string) => void;
}

export function JoinGroup({ onNext }: JoinGroupProps) {
  const [groupCode, setGroupCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupCode.length !== 4) {
      toast.error('Please enter a valid 4-character group code');
      return;
    }
    onNext(groupCode.toUpperCase());
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 flex items-center text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Gift className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Join Gift Group</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the 4-character group code to join
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter group code (e.g., ABCD)"
              value={groupCode}
              onChange={(e) =>
                setGroupCode(e.target.value.replace(/[^A-Za-z0-9]/g, ''))
              }
              maxLength={4}
              className="text-center text-2xl tracking-widest uppercase"
            />
          </div>
          <Button type="submit" className="w-full">
            Join Group
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}