"use server";

import { PackageTypeDto } from "@/shared/types/dto";
import { ColumnDef } from "@tanstack/react-table";
import { deletePackageType, getPackageTypes } from "@/shared/api/packageTypes";
import { PackageTypeWrapper } from "@/features/packageTypeWrapper";

export default async function PackageTypes() {
  const packageTypes = await getPackageTypes();

  const columns: ColumnDef<PackageTypeDto>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "name",
    },
    {
      accessorKey: "length",
      header: "length",
    },
    {
      accessorKey: "height",
      header: "height",
    },
    {
      accessorKey: "width",
      header: "width",
    },
    {
      accessorKey: "weight",
      header: "weight",
    },
  ];

  return (
    <div className="p-4">
      <PackageTypeWrapper
        columns={columns}
        data={packageTypes}
        deleteAction={deletePackageType}
      />
    </div>
  );
}
