"use client";

import { DataTable } from "@/shared/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { UserEditForm } from "@/features/userWrapper/userEditForm";
import { UserDto } from "@/shared/types/dto";
import { UserCreateForm } from "../userCreateForm/ui/userCreateForm";

type Props = {
  columns: ColumnDef<UserDto>[];
  data: UserDto[];
  deleteAction: (id: number) => Promise<void>;
};

export const UserWrapper = ({ columns, data, deleteAction }: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      deleteAction={deleteAction}
      dialogTriggerTitle="пользователя"
      filterField="first_name"
      formCreateAction={(onUpdate, closeDialog) => (
        <UserCreateForm
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
        />
      )}
      formEditAction={(user, onUpdate, closeDialog) => (
        <UserEditForm
          user={user}
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
        />
      )}
    />
  );
};
