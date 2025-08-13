import { TaskCard } from "@/components/TaskCard";
import { useEffect, useState } from "react";
import { TaskList } from "@/components/TaskList";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
}

const ActivityPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/tasks");
        if (!res.ok) throw new Error(`Failed to fetch tasks (${res.status})`);
        const data: Task[] = await res.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-w-full min-h-screen grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
      <div className="hidden w-full lg:flex md:flex items-center justify-center mt-14">
        <TaskCard />
      </div>
      <div className="flex flex-col items-center mt-24">
        <TaskList tasks={tasks} />
      </div>

      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="lg:hidden">
          <TaskCard />
        </DialogContent>
      </Dialog>

      <div className="fixed flex items-center justify-center flex-col gap-4 bottom-16 right-6">
        <button
          onClick={() => setFormDialogOpen(true)}
          className="w-[80px] h-[80px] rounded-full lg:hidden md:hidden  bg-gray-500 text-white font-bold text-md shadow-2xl cursor-pointer"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default ActivityPage;
