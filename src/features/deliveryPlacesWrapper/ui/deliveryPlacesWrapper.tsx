"use client";

import { DataTable } from "@/shared/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { DeliveryPlacesDto } from "@/shared/types/dto/deliveryPlaces.dto";
import { DeliveryPlacesCreateForm } from "../deliveryPlacesCreateForm";
import { TownDto } from "@/shared/types/dto";
import { DeliveryPlacesEditForm } from "../deliveryPlacesEditForm";

type Props = {
  columns: ColumnDef<DeliveryPlacesDto>[];
  data: DeliveryPlacesDto[];
  deleteAction: (id: number) => Promise<void>;
  towns: TownDto[];
};

export const DeliveryPlacesWrapper = ({
  columns,
  data,
  towns,
  deleteAction,
}: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      deleteAction={deleteAction}
      dialogTriggerTitle="пункта выдачи"
      filterField="latitude"
      formCreateAction={(onUpdate, closeDialog) => (
        <DeliveryPlacesCreateForm
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
          towns={towns}
        />
      )}
      formEditAction={(deliveryPlace, onUpdate, closeDialog) => (
        <DeliveryPlacesEditForm
          onUpdateAction={onUpdate}
          closeDialogAction={closeDialog}
          towns={towns}
          deliveryPlace={deliveryPlace}
        />
      )}
    />
  );
};
