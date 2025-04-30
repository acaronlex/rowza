"use client";

import { DataTable } from "rowza";
import { getColumns } from "./columns";

const mockUsers = [
  {
    id: "1",
    name: "Alice Tremblay",
    email: "alice@example.com",
    archived: false,
    roles: [{ name: "Admin" }, { name: "Manager" }],
  },
  {
    id: "2",
    name: "Bob Dubois",
    email: "bob@example.com",
    archived: true,
    roles: [{ name: "User" }],
  },
];

const allRoles = [
  { name: "Admin" },
  { name: "Manager" },
  { name: "User" },
];

export default function UsersExample() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Users Table Example</h1>

      <DataTable
        columns={getColumns({
          onEdit: (user) => alert("Edit " + user.name),
          onArchive: (user) => alert("Archive " + user.name),
          onUnarchive: (user) => alert("Unarchive " + user.name),
        })}
        data={mockUsers}
        labels={{
          searchPlaceholder: "Search users...",
          resetFilters: "Clear filters",
          noResults: "No users found",
          pageLabel: (page, total) => `Page ${page} of ${total}`,
        }}
        filters={[
          {
            columnId: "archived",
            placeholder: "Status",
            options: [
              { label: "Active", value: "Actif" },
              { label: "Archived", value: "Archivé" },
            ],
          },
          {
            columnId: "roles",
            placeholder: "Role",
            options: allRoles.map((role) => ({
              label: role.name,
              value: role.name,
            })),
          },
        ]}
      />
    </div>
  );
}
