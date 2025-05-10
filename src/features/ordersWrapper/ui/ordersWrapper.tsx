"use client";

import { DataTable } from "@/shared/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { UserAddressesDto } from "@/shared/types/dto/userAddresses.dto";
import { UserDto } from "@/shared/types/dto/user.dto";
import { OrderTypeDto } from "@/shared/types/dto/orderTypes.dto";
import { DeliveryPlacesDto } from "@/shared/types/dto/deliveryPlaces.dto";
import { PackageTypeDto } from "@/shared/types/dto/packageType.dto";
import { OrdersCreateForm } from "../ordersCreateForm";
import { TownDto } from "@/shared/types/dto/town.dto";
import { OrderDto } from "@/shared/types/dto/orders.dto";
import { OrdersEditForm } from "../ordersEditForm";

type Props = {
  columns: ColumnDef<OrderDto>[];
  data: OrderDto[];
  deleteAction: (id: number) => Promise<void>;
  towns: TownDto[];
  users: UserDto[];
  orderTypes: OrderTypeDto[];
  deliveryPlaces: DeliveryPlacesDto[];
  userAddresses: UserAddressesDto[];
  packageTypes: PackageTypeDto[];
};

export const OrdersWrapper = ({
  columns,
  data,
  users,
  towns,
  orderTypes,
  deliveryPlaces,
  userAddresses,
  packageTypes,
  deleteAction,
}: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      deleteAction={deleteAction}
      dialogTriggerTitle="заказы"
      filterField="receiver_first_name"
      formCreateAction={(onUpdate, closeDialog) => (
        <OrdersCreateForm
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
          towns={towns}
          users={users}
          orderTypes={orderTypes}
          deliveryPlaces={deliveryPlaces}
          userAddresses={userAddresses}
          packageTypes={packageTypes}
        />
      )}
      formEditAction={(order, onUpdate, closeDialog) => (
        <OrdersEditForm
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
          towns={towns}
          users={users}
          order={order}
          orderTypes={orderTypes}
          deliveryPlaces={deliveryPlaces}
          userAddresses={userAddresses}
          packageTypes={packageTypes}
        />
      )}
    />
  );
};
