import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
} from "@tanstack/react-table";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ColumnFiltersState } from "@tanstack/react-table";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  columnId: string;
  placeholder: string;
  options: FilterOption[];
  defaultValue?: string;
}

interface DataTableLabels {
  searchPlaceholder?: string;
  resetFilters?: string;
  noResults?: string;
  pageLabel?: (pageIndex: number, pageCount: number) => string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: FilterConfig[];
  labels?: DataTableLabels;
}

const defaultLabels: Required<DataTableLabels> = {
  searchPlaceholder: "Search...",
  resetFilters: "Reset Filters",
  noResults: "No results found",
  pageLabel: (pageIndex, pageCount) => `Page ${pageIndex} of ${pageCount}`,
};

export function DataTable<TData, TValue>({
  columns,
  data,
  filters = [],
  labels = {},
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState<string | undefined>("");

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 25,
  });

  // 👇 Initialize columnFilters from filters with defaultValue
  const initialColumnFilters: ColumnFiltersState = filters
    .filter((f) => f.defaultValue !== undefined)
    .map((f) => ({
      id: f.columnId,
      value: f.defaultValue!,
    }));

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialColumnFilters
  );

  const mergedLabels = { ...defaultLabels, ...labels };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const hasActiveFilters =
    (globalFilter?.trim() ?? "").trim() !== "" ||
    columnFilters.some((f) => String(f.value ?? "").trim() !== "");

  const handleResetFilters = () => {
    setGlobalFilter("");
    const resetToDefaults = filters
      .filter((f) => f.defaultValue !== undefined)
      .map((f) => ({
        id: f.columnId,
        value: f.defaultValue!,
      }));
    setColumnFilters(resetToDefaults);
    table.setColumnFilters(resetToDefaults);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder={mergedLabels.searchPlaceholder}
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-[250px]"
        />

        {filters.map(({ columnId, placeholder, options }) => (
          <Select
            key={columnId}
            value={String(columnFilters.find((f) => f.id === columnId)?.value ?? "")}
            onValueChange={(value) => {
              const v = value === "" ? undefined : value;
              table.getColumn(columnId)?.setFilterValue(v);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            {mergedLabels.resetFilters}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {mergedLabels.noResults}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 pt-4">
        <span className="text-sm text-muted-foreground">
          {mergedLabels.pageLabel(
            table.getState().pagination.pageIndex + 1,
            table.getPageCount()
          )}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
