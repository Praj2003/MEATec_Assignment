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

function saveSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}


const STATIC_USER = {
  username: "test",
  password: "test123",
};

const FAKE_JWT_TOKEN = "fake-jwt-token-1234567890";

export const handlers = [
  http.post("/login", async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (
      username === STATIC_USER.username &&
      password === STATIC_USER.password
    ) {
      const session: Session = {
        token: FAKE_JWT_TOKEN,
        username,
      };
      saveSession(session);

      return HttpResponse.json(session, { status: 200 });
    } else {
      return HttpResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }
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
