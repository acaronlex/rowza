# Rowza

> Flexible, developer-first dynamic data table engine for modern React applications.

---

## ✨ Features

- ⚡️ Dynamic, type-safe column definitions
- 🔎 Global search and per-column filters
- 🔄 Client-side pagination
- 🌍 Full internationalization (i18n) support
- 🎨 Built with TailwindCSS components (easy to theme)
- 🛠 Works with any backend or client-side data
- 🔋 Future-ready: server-side mode, CSV export, bulk actions, dark mode

---

## 🚀 Installation

```bash
npm install rowza
```

---

## 📦 Quick Start

Here's how to use Rowza for a simple users table:

```tsx
import { DataTable } from "rowza";
import { type ColumnDef } from "@tanstack/react-table";

// Define your data type
type User = {
  id: string;
  name: string;
  email: string;
  role: "Administrator" | "User";
  archived?: boolean;
};

// Define your columns
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => console.log("Edit", user.id)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => console.log("Archive", user.id)}
            className="text-red-600 hover:underline"
          >
            Archive
          </button>
        </div>
      );
    },
  },
];

// Example data
const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Administrator" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
];

// Optional: define filters
const filters = [
  {
    columnId: "role",
    placeholder: "Role",
    options: [
      { label: "All", value: "" },
      { label: "Administrator", value: "Administrator" },
      { label: "User", value: "User" },
    ],
  },
];

// Using the DataTable component
export function UsersPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <DataTable
        columns={columns}
        data={users}
        filters={filters}
        labels={{
          searchPlaceholder: "Search users...",
          resetFilters: "Clear Filters",
          noResults: "No users found.",
          pageLabel: (page, total) => `Page ${page} of ${total}`,
        }}
      />
    </div>
  );
}
```

---

## 🔥 Key Concepts

### Columns

Rowza uses [`@tanstack/react-table`](https://tanstack.com/table) definitions for full flexibility:
- `accessorKey` for basic columns
- `id` + `cell` for fully custom rendering
- Works with sorting, filtering and dynamic content

### Filters

Define per-column select filters:
```tsx
const filters = [
  {
    columnId: "role",
    placeholder: "Role",
    options: [
      { label: "Administrator", value: "Administrator" },
      { label: "User", value: "User" },
    ],
  },
];
```

### Labels (i18n)

Customize all visible text easily:
```tsx
labels={{
  searchPlaceholder: "Search...",
  resetFilters: "Reset Filters",
  noResults: "No data found.",
  pageLabel: (page, total) => `Page ${page} of ${total}`,
}}
```

---

## 🌍 Framework Compatibility

Rowza works with any modern React stack:

- ✅ Vite
- ✅ Next.js
- ✅ Create React App (CRA)
- ✅ Remix
- ✅ Astro (React)
- ✅ Inertia.js (Laravel, Rails, etc.)

---

## 📄 License

MIT License — free for personal and commercial use.

---

## 🤝 Contributing

Pull requests are welcome!  
Please open an issue first to discuss your idea if you'd like to contribute major features like:
- Server-side pagination
- CSV or Excel export
- Infinite scroll
- Bulk row selection
- Advanced themes support (dark mode)

---

# 👏 Thanks for using Rowza!

Let's build fast, beautiful tables for the modern web. 🚀

