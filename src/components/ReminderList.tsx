import { format } from "date-fns";
import { Bell, Calendar, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Reminder {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "medication" | "appointment";
}

interface ReminderListProps {
  reminders: Reminder[];
  onDelete: (id: string) => void;
}

const ReminderList = ({ reminders, onDelete }: ReminderListProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      {reminders.map((reminder) => (
        <Card
          key={reminder.id}
          className="p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                {reminder.type === "medication" ? (
                  <Bell className="h-5 w-5 text-primary" />
                ) : (
                  <Calendar className="h-5 w-5 text-secondary" />
                )}
              </div>
              <div>
                <h3 className="font-medium">{reminder.title}</h3>
                <p className="text-sm text-gray-500">
                  {format(reminder.date, "PPP")} at {reminder.time}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(reminder.id)}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ReminderList;