"use client";

import { DataTable } from "@/shared/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { TownDto } from "@/shared/types/dto";
import { TownCreateForm } from "../townCreateForm/ui/townCreateForm";
import { TownEditForm } from "../townEditForm/ui/townEditForm";

type Props = {
  columns: ColumnDef<TownDto>[];
  data: TownDto[];
  deleteAction: (id: number) => Promise<void>;
};

export const TownWrapper = ({ columns, data, deleteAction }: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      deleteAction={deleteAction}
      dialogTriggerTitle="города"
      filterField="name"
      formCreateAction={(onUpdate, closeDialog) => (
        <TownCreateForm
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
        />
      )}
      formEditAction={(town, onUpdate, closeDialog) => (
        <TownEditForm
          town={town}
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
        />
      )}
    />
  );
};
