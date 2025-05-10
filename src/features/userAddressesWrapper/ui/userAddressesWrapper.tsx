"use client";

import { DataTable } from "@/shared/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { UserAddressesDto } from "@/shared/types/dto/userAddresses.dto";
import { UserDto } from "@/shared/types/dto/user.dto";
import { TownDto } from "@/shared/types/dto/town.dto";
import { UserAddressesCreateForm } from "../userAdressesCreateForm";
import { UserAddressesEditForm } from "../userAddressesEditForm";

type Props = {
  columns: ColumnDef<UserAddressesDto>[];
  data: UserAddressesDto[];
  deleteAction: (id: number) => Promise<void>;
  towns: TownDto[];
  users: UserDto[];
};

export const UserAddressesWrapper = ({
  columns,
  data,
  towns,
  users,
  deleteAction,
}: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      deleteAction={deleteAction}
      dialogTriggerTitle="адреса пользователя"
      filterField="street"
      formCreateAction={(onUpdate, closeDialog) => (
        <UserAddressesCreateForm
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
          towns={towns}
          users={users}
        />
      )}
      formEditAction={(deliveryPlace, onUpdate, closeDialog) => (
        <UserAddressesEditForm
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
          towns={towns}
          users={users}
          userAddress={deliveryPlace}
        />
      )}
    />
  );
};
