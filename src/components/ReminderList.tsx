import { format } from "date-fns";
import { Bell, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Reminder {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "medication" | "appointment";
}

interface ReminderListProps {
  reminders: Reminder[];
}

const ReminderList = ({ reminders }: ReminderListProps) => {
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
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ReminderList;