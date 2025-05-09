"use server";

import { TownDto } from "@/shared/types/dto";
import { ColumnDef } from "@tanstack/react-table";
import { TownWrapper } from "@/features/townWrapper/ui/townWrapper";
import { deleteTown, getTowns } from "@/shared/api/towns";

export default async function Towns() {
  const towns = await getTowns();

  const columns: ColumnDef<TownDto>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "latitude",
      header: "latitude",
    },
    {
      accessorKey: "longitude",
      header: "longitude",
    },
  ];

  return (
    <div className="p-4">
      <TownWrapper columns={columns} data={towns} deleteAction={deleteTown} />
    </div>
  );
}
