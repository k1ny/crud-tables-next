"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "./button";
import { DialogWrapper } from "./dialogWrapper";
import { ReactNode, useMemo, useState } from "react";
import { Input } from "./input";

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  deleteAction: (id: number) => Promise<void>;
  formEditAction: (
    item: TData,
    onUpdate: (updatedItem: TData) => void,
    closeDialog: () => void,
  ) => ReactNode;
  formCreateAction: (
    onUpdate: (updatedItem: TData) => void,
    closeDialog: () => void,
  ) => ReactNode;
  dialogTriggerTitle: string;
  filterField: keyof TData;
};

export function DataTable<TData extends { id: number }>({
  columns,
  data: initialData,
  deleteAction,
  formEditAction,
  dialogTriggerTitle,
  filterField,
  formCreateAction,
}: DataTableProps<TData>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreateOpen, setOpenCreate] = useState(false);

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        (item[filterField] as string)
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
      ),
    [data, searchQuery, filterField],
  );

  const table = useReactTable({
    data: filteredData,
    columns: [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex gap-2 justify-end">
            <DialogWrapper
              triggerName="Редактировать"
              title={`Редактирование ${dialogTriggerTitle}`}
              open={editingId === row.original.id}
              setOpen={(open) => setEditingId(open ? row.original.id : null)}
            >
              {formEditAction(
                row.original,
                (updatedItem) => {
                  setData((prevData) =>
                    prevData.map((item) =>
                      item.id === updatedItem.id ? updatedItem : item,
                    ),
                  );
                },
                () => setEditingId(null),
              )}
            </DialogWrapper>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleDelete(row.original.id)}
            >
              Удалить
            </Button>
          </div>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteAction(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4">
        <Input
          placeholder={`Поиск по ${String(filterField)}`}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <DialogWrapper
          triggerName="Создать"
          title={`Создание ${dialogTriggerTitle}`}
          open={isCreateOpen}
          setOpen={setOpenCreate}
        >
          {formCreateAction(
            (newItem) => {
              setData((prevData) => [...prevData, newItem]);
            },
            () => setOpenCreate(false),
          )}
        </DialogWrapper>
      </div>

      <div className="rounded-md border overflow-x-auto w-full">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap px-4 py-2 text-center"
                    style={{
                      width:
                        header.getSize() !== 150
                          ? `${header.getSize()}px`
                          : "auto",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="text-center">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-2"
                      style={{
                        width:
                          cell.column.getSize() !== 150
                            ? `${cell.column.getSize()}px`
                            : "auto",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  Нет данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
