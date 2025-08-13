import { http, HttpResponse } from "msw";

const TASKS_KEY = "tasks";
const SESSION_KEY = "session";

export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
}

export interface Session {
  token: string;
  username: string;
}

function getStoredTasks(): Task[] {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? (JSON.parse(tasks) as Task[]) : [];
}

function saveTasks(tasks: Task[]): void {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export const handlers = [

  http.post("/login", async ({ request }) => {
    const { username } = (await request.json()) as { username: string };
    const session: Session = { token: "fake-jwt", username };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return HttpResponse.json(session);
  }),


  http.get("/tasks", () => {
    return HttpResponse.json(getStoredTasks());
  }),

 
  http.post("/tasks", async ({ request }) => {
    const newTask = (await request.json()) as Omit<Task, "id">;
    const tasks = getStoredTasks();
    const taskWithId: Task = { id: Date.now(), ...newTask };
    tasks.push(taskWithId);
    saveTasks(tasks);
    return HttpResponse.json(taskWithId, { status: 201 });
  }),


  http.put("/tasks/:id", async ({ request, params }) => {
    const updatedTask = (await request.json()) as Partial<Task>;
    let tasks = getStoredTasks();
    tasks = tasks.map((task) =>
      task.id === Number(params.id) ? { ...task, ...updatedTask } : task
    );
    saveTasks(tasks);
    return HttpResponse.json({ success: true });
  }),

  
  http.delete("/tasks/:id", ({ params }) => {
    let tasks = getStoredTasks();
    tasks = tasks.filter((task) => task.id !== Number(params.id));
    saveTasks(tasks);
    return HttpResponse.json({ success: true });
  }),
];
