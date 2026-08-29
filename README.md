## Run Locally

For the best performance, use the production build:

```bash
npm install
npm run build
npm start
```

For faster development with hot reload:

```bash
npm run dev
```

---

## 1. User Analysis & Core Needs (Step 01)

### Who is the user?

- **Primary users**: Small dev/design/marketing teams, agency project managers, freelancers managing client projects
- **Mixed audience**: Technical and non-technical users

### Top 3 things users want to do:

1. **See project overview at a glance** - Active projects, total tasks, overdue count, completed tasks
2. **Manage tasks visually on a Kanban board** - View tasks by status (To Do, In Progress, Done), filter by project/assignee
3. **Create and assign tasks quickly** - Simple form with title, project, assignee, due date, status, priority

### What should the app make easiest on first screen?

The **Dashboard/Overview** shows:

- Active projects count (3 hardcoded)
- Total tasks (live from data)
- Overdue tasks (highlighted in red)
- Completed tasks (highlighted in green)
- Tasks due in next 7 days (table view)
- Active projects list

**Why**: Users immediately see what's urgent (overdue), what's coming up (due soon), and project health - no navigation needed.

### Key Task Flow: Create New Task

1. User clicks "Create Task" button (Dashboard header or Task Board header)
2. Navigates to `/tasks/new` page
3. Fills form: Title (required), Project (dropdown), Assignee (dropdown), Status (dropdown), Priority (dropdown), Due Date (calendar picker)
4. Submits → Server Action creates task → Page revalidates → Redirects back to Task Board
5. New task appears in correct Kanban column based on status

### Assumptions Made:

- **Single team** (no multi-team support)
- **Multiple projects** supported (3 projects: Website Redesign, Mobile App, Marketing Campaign)
- **Session-based storage** (per-browser session via cookies + in-memory Map)
- **No authentication required** (auto-creates session on first visit)
- **3 fixed statuses**: Todo, In Progress, Done
- **3 priorities**: Low, Medium, High
- **4 assignees**: Khaled Farhad, Sadia Rahman, Khaled Shariar, Shantonu Debnath

---

## 2. Additional Features (Beyond Requirements)

| Feature               | Implementation                               |
| --------------------- | -------------------------------------------- |
| Server-side rendering | Pages use Server Components by default       |
| Revalidation          | `revalidatePath` after mutations             |
| Error boundaries      | Next.js default error handling               |
| Accessibility         | Semantic HTML, ARIA labels, focus management |
| Type safety           | Full TypeScript with strict mode             |
| SEO metadata          | `metadata` export in layout                  |

---

## 3. Project Structure

```

task-flow/
├── app/
│ ├── page.tsx # Dashboard (Screen 1)
│ ├── tasks/
│ │ ├── page.tsx # Task Board (Screen 2)
│ │ ├── new/page.tsx # Create Task (Screen 3)
│ │ └── [id]/page.tsx # Edit Task (Screen 3)
│ ├── layout.tsx # Root layout with Sidebar
│ └── globals.css # Tailwind + theme
├── components/
│ ├── home/ # Dashboard widgets
│ ├── tasks/ # Task Board components
│ ├── common/ # Layout (Sidebar, Header)
│ └── ui/ # shadcn/ui primitives
├── lib/
│ ├── common-data.ts # Types, sidebar config
│ └── utils.ts # cn() helper
├── actions/
│ └── task.ts # Server Actions (CRUD)
├── hooks/
│ └── use-mobile.ts # Responsive hook
└── public/ # Static assets

```

---

## 4. Data Flow Architecture

```

┌─────────────┐ ┌──────────────────┐ ┌─────────────────┐
│ Browser │────▶│ Next.js Server │────▶│ In-Memory Map │
│ (Client) │ │ (Server Actions)│ │ (per session) │
└─────────────┘ └──────────────────┘ └─────────────────┘
│ │ │
│ HTTP Request │ JWT Session Cookie │ Map<sessionId, Task[]>
│ │ │
▼ ▼ ▼
UI Updates createTask() taskStore.set()
(revalidation) updateTask() taskStore.get()
deleteTask()
getTasks()

```

---

Email: aftabrishad@gmail.com
Phone: +880 1707-79984

```

```
