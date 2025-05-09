"use client";

import { DataTable } from "@/shared/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { OrderTypeDto } from "@/shared/types/dto/orderTypes.dto";
import { OrderTypesCreateForm } from "../orderTypesCreateForm";
import { OrderTypesEditForm } from "../orderTypesEditForm";

type Props = {
  columns: ColumnDef<OrderTypeDto>[];
  data: OrderTypeDto[];
  deleteAction: (id: number) => Promise<void>;
};

export const OrderTypesWrapper = ({ columns, data, deleteAction }: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      deleteAction={deleteAction}
      dialogTriggerTitle="Тип заказа"
      filterField="name"
      formCreateAction={(onUpdate, closeDialog) => (
        <OrderTypesCreateForm
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
        />
      )}
      formEditAction={(orderType, onUpdate, closeDialog) => (
        <OrderTypesEditForm
          orderType={orderType}
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
        />
      )}
    />
  );
};
