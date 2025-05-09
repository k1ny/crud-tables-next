"use server";

import { ColumnDef } from "@tanstack/react-table";
import { OrderTypeDto } from "@/shared/types/dto/orderTypes.dto";
import { deleteOrderType, getOrderTypes } from "@/shared/api/orderTypes";
import { OrderTypesWrapper } from "@/features/orderTypesWrapper";

export default async function OrderTypes() {
  const orderTypes = await getOrderTypes();

  const columns: ColumnDef<OrderTypeDto>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "name",
    },
  ];

  return (
    <div className="p-4">
      <OrderTypesWrapper
        columns={columns}
        data={orderTypes}
        deleteAction={deleteOrderType}
      />
    </div>
  );
}
