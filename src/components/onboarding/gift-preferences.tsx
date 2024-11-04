import { useState } from 'react';
import { Gift, Search, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface GiftPreferencesProps {
  onNext: (preferences: string[]) => void;
  onBack: () => void;
}

interface Occasion {
  id: string;
  label: string;
  date?: Date;
  isCustom?: boolean;
}

const PRESET_OCCASIONS: Occasion[] = [
  { id: 'christmas', label: 'Christmas', date: new Date(2024, 11, 25) },
  { id: 'valentines', label: "Valentine's Day", date: new Date(2024, 1, 14) },
  { id: 'halloween', label: 'Halloween', date: new Date(2024, 9, 31) },
  { id: 'birthday', label: 'Birthday' },
];

export function GiftPreferences({ onNext, onBack }: GiftPreferencesProps) {
  const [occasions, setOccasions] = useState<Occasion[]>(PRESET_OCCASIONS);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGifts, setSelectedGifts] = useState<
    Array<{ occasion: Occasion; gift: string }>
  >([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [occasionInput, setOccasionInput] = useState('');
  const [tempOccasion, setTempOccasion] = useState<Occasion | null>(null);
  const [isOccasionPopoverOpen, setIsOccasionPopoverOpen] = useState(false);

  const handleAddGift = () => {
    if (!searchTerm.trim()) {
      toast.error('Please enter a gift name');
      return;
    }
    if (!selectedOccasion) {
      toast.error('Please select an occasion');
      return;
    }
    setSelectedGifts([
      ...selectedGifts,
      { occasion: selectedOccasion, gift: searchTerm.trim() },
    ]);
    setSearchTerm('');
  };

  const handleRemoveGift = (index: number) => {
    setSelectedGifts(selectedGifts.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedGifts.length === 0) {
      toast.error('Please add at least one gift');
      return;
    }
    onNext(
      selectedGifts.map(
        (item) => `${item.occasion.id}:${item.gift}:${item.occasion.date || ''}`
      )
    );
  };

  const handleOccasionSelect = (occasion: Occasion) => {
    setSelectedOccasion(occasion);
    setIsOccasionPopoverOpen(false);
    setOccasionInput(occasion.label);
  };

  const handleCustomOccasion = () => {
    if (!occasionInput.trim()) return;

    const customId = occasionInput.toLowerCase().replace(/\s+/g, '-');
    const newOccasion: Occasion = {
      id: customId,
      label: occasionInput.trim(),
      isCustom: true,
    };

    setTempOccasion(newOccasion);
    setIsCalendarOpen(true);
    setIsOccasionPopoverOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && tempOccasion) {
      const newOccasion = { ...tempOccasion, date };
      setOccasions([...occasions, newOccasion]);
      setSelectedOccasion(newOccasion);
      setIsCalendarOpen(false);
      setTempOccasion(null);
    }
  };

  return (
    <Card className="border-0 md:border">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Gift className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl md:text-3xl">Gift Preferences</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add gifts you'd like to receive for different occasions
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Popover
              open={isOccasionPopoverOpen}
              onOpenChange={setIsOccasionPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between md:w-[250px]"
                >
                  {selectedOccasion?.label || 'Select occasion'}
                  <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search occasions..."
                    value={occasionInput}
                    onValueChange={setOccasionInput}
                  />
                  <CommandEmpty>
                    <button
                      className="flex w-full items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent"
                      onClick={handleCustomOccasion}
                    >
                      Add "{occasionInput}" as custom occasion
                    </button>
                  </CommandEmpty>
                  <CommandGroup>
                    {occasions.map((occasion) => (
                      <CommandItem
                        key={occasion.id}
                        value={occasion.label}
                        onSelect={() => handleOccasionSelect(occasion)}
                      >
                        {occasion.label}
                        {occasion.date && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            {format(occasion.date, 'MMM d')}
                          </span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search for a gift..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button
                size="icon"
                variant="secondary"
                onClick={handleAddGift}
                type="button"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className={cn(
              'min-h-[200px] bg-muted/50 rounded-lg p-4',
              selectedGifts.length === 0 && 'flex items-center justify-center'
            )}
          >
            <div className="flex flex-wrap gap-2">
              {selectedGifts.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer text-sm py-2 px-3"
                  onClick={() => handleRemoveGift(index)}
                >
                  {item.occasion.label}:{' '}
                  {item.occasion.date &&
                    `(${format(item.occasion.date, 'MMM d')}) `}
                  {item.gift} ×
                </Badge>
              ))}
              {selectedGifts.length === 0 && (
                <p className="text-sm text-muted-foreground text-center">
                  No gifts added yet. Start by selecting an occasion and adding
                  gifts!
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg">
          Continue
        </Button>
      </CardFooter>

      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Date for {tempOccasion?.label}</DialogTitle>
          </DialogHeader>
          <Calendar
            mode="single"
            selected={tempOccasion?.date}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}