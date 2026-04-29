# 📅 Calendar App

A React application for event management with full CRUD, drag & drop, and data persistence.

---

## ⚙️ Features

| Feature | Description |
| --- | --- |
| ➕ Add Event | Click on a day to open a popup. Fields: title (max 30 chars), date, time, notes, color |
| ✏️ Edit Event | Click on an event to open a popup with pre-filled data |
| 🗑️ Delete Event | «Discard» button inside the popup |
| 🎨 Color Picker | Palette of 6 colors when creating or editing an event |
| 🖱️ Drag & Drop | Drag events between days |
| 📆 View Switching | Month / Week / Day / Agenda |
| 💾 Data Persistence | `localStorage` — data is saved after page reload |

---

## 💾 Data Storage

All events are stored in the browser's **`localStorage`** under the key `calendar-events`.

```ts
// Save on every change
localStorage.setItem("calendar-events", JSON.stringify(events));

// Read on app start
const saved = localStorage.getItem("calendar-events");
return saved ? JSON.parse(saved) : initialEvents;
```

On first launch, initial events are loaded from `events.json`.

---

## 🧩 Tech Stack

| Technology | Purpose |
| --- | --- |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Vite** | Bundler and dev server |
| **FullCalendar** | Calendar component (`@fullcalendar/react`) |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI components (Popover, Sidebar) |
| **React Hook Form** | Form management in EventModal |
| **Zod** | Form data validation |
| **Lucide React** | Icons |

---

## 🏗 Architecture

The project follows a **modular architecture**:

- **`modules/Calendar`** — isolated module with its own components, hooks, types, and data
- **`hooks/useCalendarEvents`** — all business logic extracted into a custom hook (state, handlers, localStorage)
- **`components/ui`** — reusable shadcn UI components
- **`components/layout`** — global layout components (Sidebar, Header)
- **`shared/schema`** — shared Zod validation schema

### Data Flow

```
useCalendarEvents (state + logic)
        ↓
Calendar.tsx (passes props)
    ↙        ↘
FullCalendar   EventModal
(rendering)   (event form)
```

---

## 🗂 Project Structure

```
src/
├── assets/                          # Static files (avatar, images)
├── components/
│   ├── layout/
│   │   ├── AppSidebar.tsx           # Navigation sidebar
│   └── ui/                          # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       └── tooltip.tsx
├── hooks/
│   └── use-mobile.ts                # Mobile detection hook (shadcn)
├── lib/
│   └── utils.ts                     # Utilities (cn — class merging)
├── modules/
│   └── Calendar/
│       ├── components/
│       │   ├── Calendar.tsx         # Main calendar component
│       │   └── EventModal.tsx       # Popup for creating/editing events
│       ├── hooks/
│       │   └── useCalendarEvents.ts # All state logic and event handlers
│       ├── types/
│       │   └── event.ts             # TypeScript types for events
│       └── data/
│           └── events.json          # Initial seed events
├── shared/
│   └── schema/
│       └── eventSchema.ts           # Zod validation schema
├── App.tsx                          # Root component, layout
├── App.css                          # Global styles (FullCalendar overrides)
├── index.css                        # Tailwind directives + sidebar CSS variables
└── main.tsx                         # Entry point
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```
