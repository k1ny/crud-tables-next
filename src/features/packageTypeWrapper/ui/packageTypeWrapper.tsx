"use client";

import { DataTable } from "@/shared/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { PackageTypeDto } from "@/shared/types/dto";
import { PackageTypeCreateForm } from "../packageTypeCreateForm";
import { PackageTypeEditForm } from "../packageTypeEditForm";

type Props = {
  columns: ColumnDef<PackageTypeDto>[];
  data: PackageTypeDto[];
  deleteAction: (id: number) => Promise<void>;
};

export const PackageTypeWrapper = ({ columns, data, deleteAction }: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      deleteAction={deleteAction}
      dialogTriggerTitle="Тип посылки"
      filterField="name"
      formCreateAction={(onUpdate, closeDialog) => (
        <PackageTypeCreateForm
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
        />
      )}
      formEditAction={(packageType, onUpdate, closeDialog) => (
        <PackageTypeEditForm
          packageType={packageType}
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
        />
      )}
    />
  );
};
