import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
}

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);

  useEffect(() => {
    setActiveTasks(tasks);
  }, [tasks]);

  const handleComplete = async (taskId: number) => {
    const task = activeTasks.find((t) => t.id === taskId);
    if (!task) return;

    // Mock PATCH request
    await fetch(`/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "completed" }),
    });

    setActiveTasks((prev) => prev.filter((t) => t.id !== taskId));
    setCompletedTasks((prev) => [...prev, task]);

    window.location.reload;
  };

  const handleUpdate = async (task: Task) => {
    const updatedTitle = prompt("Enter new title:", task.title);
    if (!updatedTitle) return;

    const updatedTask = { ...task, title: updatedTitle };

    await fetch(`/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedTask),
    });

    setActiveTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updatedTask : t))
    );
    setCompletedTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updatedTask : t))
    );

    window.location.reload;
  };

  const handleDelete = async (taskId: number) => {
    await fetch(`/tasks/${taskId}`, { method: "DELETE" });

    setActiveTasks((prev) => prev.filter((t) => t.id !== taskId));
    setCompletedTasks((prev) => prev.filter((t) => t.id !== taskId));

    window.location.reload;
  };

  const renderTaskCard = (task: Task, isCompleted = false) => (
    <div
      key={task.id}
      className="bg-white grid grid-cols-2 rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
    >
      <div className="flex flex-col justify-between items-center mb-2 gap-4 col-span-1">
        <h2
          className={`text-xl font-semibold ${
            isCompleted ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </h2>
        {task.description && (
          <p
            className={`text-gray-600 mb-3 ${
              isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {task.description}
          </p>
        )}
        {task.dueDate && (
          <p className="text-sm text-gray-400">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        {!isCompleted && (
          <button
            onClick={() => handleComplete(task.id)}
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-lg w-full"
          >
            Mark Complete
          </button>
        )}
        <button
          onClick={() => handleUpdate(task)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-lg w-full"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-lg w-full"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
  
      <div>
        <h3 className="text-lg text-center font-semibold mb-4">
          📌 Active Tasks
        </h3>
        <div className="grid gap-4">
          {activeTasks.length === 0 ? (
            <div className="text-center text-gray-500">No active tasks 🎉</div>
          ) : (
            activeTasks.map((task) => renderTaskCard(task))
          )}
        </div>
      </div>

   
      <div>
        <h3 className="text-lg text-center font-semibold mb-4">
          ✅ Completed Tasks
        </h3>
        <div className="grid gap-4">
          {completedTasks.length === 0 ? (
            <div className="text-center text-gray-500">
              No completed tasks yet
            </div>
          ) : (
            completedTasks.map((task) => renderTaskCard(task, true))
          )}
        </div>
      </div>

      
    </div>
  );
};
