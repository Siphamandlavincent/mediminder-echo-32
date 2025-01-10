import { useState, useEffect } from "react";
import ReminderForm from "@/components/ReminderForm";
import ReminderList from "@/components/ReminderList";
import Clock from "@/components/Clock";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { v4 as uuidv4 } from "uuid";
import { QRCodeSVG } from "qrcode.react";

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
  const currentUrl = window.location.href;

  const addReminder = (reminderData: Omit<Reminder, "id">) => {
    const newReminder = { ...reminderData, id: uuidv4() };
    setReminders((prev) => [...prev, newReminder]);
    toast({
      title: "Reminder set!",
      description: `${reminderData.title} scheduled for ${reminderData.time}`,
    });

    const audio = new Audio("/notification.mp3");
    audio.play().catch((error) => console.log("Audio playback failed:", error));
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
    toast({
      title: "Reminder deleted",
      description: "The reminder has been successfully deleted.",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach((reminder) => {
        const reminderTime = new Date(reminder.date);
        const [hours, minutes] = reminder.time.split(":");
        reminderTime.setHours(parseInt(hours), parseInt(minutes));

        if (Math.abs(now.getTime() - reminderTime.getTime()) < 60000) {
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
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/10 p-6">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <Clock />
          <h1 className="text-3xl font-bold text-secondary mb-2">
            Medication & Appointment Reminder
          </h1>
          <p className="text-gray-600">Never miss an important reminder again</p>
        </div>

        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Add Reminder</TabsTrigger>
            <TabsTrigger value="view">View Reminders</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <ReminderForm onSubmit={addReminder} />
            <div className="mt-6 flex justify-center">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <QRCodeSVG
                  value={currentUrl}
                  size={128}
                  level="L"
                  includeMargin={true}
                />
                <p className="text-xs text-center mt-2 text-gray-600">
                  Scan to open on your phone
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="view">
            <ReminderList reminders={reminders} onDelete={deleteReminder} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;