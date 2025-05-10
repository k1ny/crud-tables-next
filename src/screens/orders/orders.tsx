"use server";

import { ColumnDef } from "@tanstack/react-table";
import { getTowns } from "@/shared/api/towns";
import { OrderDto } from "@/shared/types/dto/orders.dto";
import { getUsers } from "@/shared/api/users";
import { getUserAddresses } from "@/shared/api/userAddresses";
import { getPackageTypes } from "@/shared/api/packageTypes";
import { getOrderTypes } from "@/shared/api/orderTypes";
import { deleteOrder, getOrders } from "@/shared/api/orders";
import { getDeliveryPlaces } from "@/shared/api/deliveryPlaces";
import { OrdersWrapper } from "@/features/ordersWrapper";

export default async function Orders() {
  const towns = await getTowns();
  const users = await getUsers();
  const userAddresses = await getUserAddresses();
  const packageTypes = await getPackageTypes();
  const orderTypes = await getOrderTypes();
  const orders = await getOrders();
  const deliveryPlaces = await getDeliveryPlaces();

  const columns: ColumnDef<OrderDto>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "order_type",
      header: "order_type",
    },
    {
      accessorKey: "package_id",
      header: "package_type",
    },
    {
      accessorKey: "sender_id",
      header: "sender_id",
    },
    {
      accessorKey: "sender_address",
      header: "sender_address",
    },
    {
      accessorKey: "receiver_last_name",
      header: "receiver_last_name",
    },
    {
      accessorKey: "receiver_first_name",
      header: "receiver_first_name",
    },
    {
      accessorKey: "receiver_middle_name",
      header: "receiver_middle_name",
    },
    {
      accessorKey: "receiver_address_id",
      header: "receiver_middle_name",
    },
    {
      accessorKey: "receiver_point_id",
      header: "receiver_point_id",
    },
    {
      accessorKey: "price",
      header: "price",
    },
    {
      accessorKey: "created_at",
      header: "created_at",
    },
    {
      accessorKey: "approximate_delivery_date",
      header: "approximate_delivery_date",
    },
    {
      accessorKey: "delivered",
      header: "delivered",
    },
  ];

  return (
    <div className="p-4">
      <OrdersWrapper
        columns={columns}
        data={orders}
        deleteAction={deleteOrder}
        towns={towns}
        users={users}
        packageTypes={packageTypes}
        orderTypes={orderTypes}
        userAddresses={userAddresses}
        deliveryPlaces={deliveryPlaces}
      />
    </div>
  );
}
