"use server";

import { deleteUser, getUsers } from "@/shared/api/users";
import { UserDto } from "@/shared/types/dto";
import { ColumnDef } from "@tanstack/react-table";
import { UserWrapper } from "@/features/userWrapper";

export default async function Users() {
  const users = (await getUsers()).map((user) => ({
    ...user,
    created_at: new Date(user.created_at).toLocaleString(),
  }));

  const columns: ColumnDef<UserDto>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "first_name",
      header: "Name",
    },
    {
      accessorKey: "last_name",
      header: "Last name",
    },
    {
      accessorKey: "middle_name",
      header: "Middle name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "passport_serial",
      header: "Passport",
    },
    {
      accessorKey: "password_hash",
      header: "Password hash",
    },
    {
      accessorKey: "created_at",
      header: "Created at",
    },
  ];

  return (
    <div className="p-4">
      <UserWrapper columns={columns} data={users} deleteAction={deleteUser} />
    </div>
  );
}
