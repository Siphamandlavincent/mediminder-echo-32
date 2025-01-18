import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReminderFormProps {
  onSubmit: (reminder: {
    title: string;
    date: Date;
    time: string;
    type: "medication" | "appointment";
  }) => void;
}

const ReminderForm = ({ onSubmit }: ReminderFormProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [type, setType] = useState<"medication" | "appointment">("medication");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && date && time) {
      onSubmit({ title, date, time, type });
      setTitle("");
      setDate(undefined);
      setTime("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="title">Reminder Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter medication name or appointment title"
          required
          className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal transition-all duration-300 hover:bg-primary/10 hover:border-primary/50",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 animate-neon-pulse hover:animate-scale-bounce"
      >
        Add Reminder
      </Button>
    </form>
  );
};

export default ReminderForm;