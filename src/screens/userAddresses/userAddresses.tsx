"use server";

import { ColumnDef } from "@tanstack/react-table";
import { getTowns } from "@/shared/api/towns";
import { UserAddressesWrapper } from "@/features/userAddressesWrapper/ui/userAddressesWrapper";
import { UserAddressesDto } from "@/shared/types/dto/userAddresses.dto";
import { getUsers } from "@/shared/api/users";
import {
  deleteUserAddress,
  getUserAddresses,
} from "@/shared/api/userAddresses";

export default async function UserAddresses() {
  const towns = await getTowns();
  const users = await getUsers();
  const userAddresses = await getUserAddresses();

  const columns: ColumnDef<UserAddressesDto>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "user_id",
      header: "user_id",
    },
    {
      accessorKey: "town_id",
      header: "town_id",
    },
    {
      accessorKey: "street",
      header: "street",
    },
    {
      accessorKey: "entrance",
      header: "entrance",
    },
    {
      accessorKey: "floor",
      header: "floor",
    },
    {
      accessorKey: "apartment_number",
      header: "apartment_number",
    },
    {
      accessorKey: "intercom_code",
      header: "intercom_code",
    },
  ];

  return (
    <div className="p-4">
      <UserAddressesWrapper
        columns={columns}
        data={userAddresses}
        deleteAction={deleteUserAddress}
        users={users}
        towns={towns}
      />
    </div>
  );
}
