import { useState, useEffect } from "react";
import ReminderForm from "@/components/ReminderForm";
import ReminderList from "@/components/ReminderList";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

interface Reminder {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "medication" | "appointment";
}

const Index = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const { toast } = useToast();

  const addReminder = (reminderData: Omit<Reminder, "id">) => {
    const newReminder = { ...reminderData, id: uuidv4() };
    setReminders((prev) => [...prev, newReminder]);
    toast({
      title: "Reminder set!",
      description: `${reminderData.title} scheduled for ${reminderData.time}`,
    });

    // Play a notification sound
    const audio = new Audio("/notification.mp3");
    audio.play().catch((error) => console.log("Audio playback failed:", error));
  };

  useEffect(() => {
    // Check for reminders every minute
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach((reminder) => {
        const reminderTime = new Date(reminder.date);
        const [hours, minutes] = reminder.time.split(":");
        reminderTime.setHours(parseInt(hours), parseInt(minutes));

        if (Math.abs(now.getTime() - reminderTime.getTime()) < 60000) {
          // If current time is within 1 minute of reminder time
          toast({
            title: "Reminder!",
            description: reminder.title,
            duration: 10000,
          });
          const audio = new Audio("/notification.mp3");
          audio.play().catch((error) => console.log("Audio playback failed:", error));
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [reminders, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Medication & Appointment Reminder
          </h1>
          <p className="text-gray-600">Never miss an important reminder again</p>
        </div>

        <ReminderForm onSubmit={addReminder} />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Reminders</h2>
          <ReminderList reminders={reminders} />
        </div>
      </div>
    </div>
  );
};

export default Index;