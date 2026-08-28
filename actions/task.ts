"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { revalidatePath } from "next/cache";

export type TaskStatus = "Todo" | "In Progress" | "Done";

export type Task = {
  id: string;
  title: string;
  project: string;
  assignee: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: TaskStatus;
  createdAt: string;
};

type SessionPayload = {
  sessionId: string;
};

const COOKIE_NAME = "taskflow_session";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "taskflow-development-secret",
);

const taskStore = new Map<string, Task[]>();

async function createSessionToken(sessionId: string) {
  return new SignJWT({
    sessionId,
  } satisfies SessionPayload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

async function verifySessionToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secret);

    if (typeof payload.sessionId !== "string") {
      return null;
    }

    return payload.sessionId;
  } catch {
    return null;
  }
}

async function getExistingSessionId(): Promise<string | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

async function createSession(): Promise<string> {
  const cookieStore = await cookies();

  const sessionId = crypto.randomUUID();

  const token = await createSessionToken(sessionId);

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  taskStore.set(sessionId, []);

  return sessionId;
}

export async function getTasks(): Promise<Task[]> {
  const sessionId = await getExistingSessionId();

  if (!sessionId) {
    return [];
  }

  return taskStore.get(sessionId) ?? [];
}

export async function createTask(
  task: Omit<Task, "id" | "createdAt">,
): Promise<Task> {
  let sessionId = await getExistingSessionId();

  if (!sessionId) {
    sessionId = await createSession();
  }

  const tasks = taskStore.get(sessionId) ?? [];

  const newTask: Task = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  taskStore.set(sessionId, tasks);

  revalidatePath("/");
  revalidatePath("/tasks");

  return newTask;
}

export async function getTask(id: string): Promise<Task | null> {
  const tasks = await getTasks();

  return tasks.find((task) => task.id === id) ?? null;
}

export async function updateTask(
  id: string,
  data: Partial<Omit<Task, "id" | "createdAt">>,
): Promise<Task | null> {
  const sessionId = await getExistingSessionId();

  if (!sessionId) {
    return null;
  }

  const tasks = taskStore.get(sessionId) ?? [];

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  const updatedTask: Task = {
    ...tasks[taskIndex],
    ...data,
  };

  tasks[taskIndex] = updatedTask;

  taskStore.set(sessionId, tasks);

  revalidatePath("/");
  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);

  return updatedTask;
}

export async function updateTaskStatus(
  id: string,
  status: TaskStatus,
): Promise<Task | null> {
  return updateTask(id, {
    status,
  });
}

export async function deleteTask(id: string): Promise<boolean> {
  const sessionId = await getExistingSessionId();

  if (!sessionId) {
    return false;
  }

  const tasks = taskStore.get(sessionId) ?? [];

  const exists = tasks.some((task) => task.id === id);

  if (!exists) {
    return false;
  }

  const updatedTasks = tasks.filter((task) => task.id !== id);

  taskStore.set(sessionId, updatedTasks);

  revalidatePath("/");
  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);

  return true;
}

export async function clearTasks(): Promise<void> {
  const sessionId = await getExistingSessionId();

  if (!sessionId) {
    return;
  }

  taskStore.delete(sessionId);

  revalidatePath("/");
  revalidatePath("/tasks");
}
