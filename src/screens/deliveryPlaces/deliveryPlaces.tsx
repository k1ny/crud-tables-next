"use server";

import { ColumnDef } from "@tanstack/react-table";
import {
  deleteDeliveryPlaces,
  getDeliveryPlaces,
} from "@/shared/api/deliveryPlaces";
import { getTowns } from "@/shared/api/towns";
import { DeliveryPlacesDto } from "@/shared/types/dto/deliveryPlaces.dto";
import { DeliveryPlacesWrapper } from "@/features/deliveryPlacesWrapper";

export default async function DeliveryPlaces() {
  const deliveryPlaces = await getDeliveryPlaces();
  const towns = await getTowns();

  const columns: ColumnDef<DeliveryPlacesDto>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "town_id",
      header: "town_id",
    },
    {
      accessorKey: "latitude",
      header: "latitude",
    },
    {
      accessorKey: "longitude",
      header: "longitude",
    },
  ];

  return (
    <div className="p-4">
      <DeliveryPlacesWrapper
        columns={columns}
        data={deliveryPlaces}
        towns={towns}
        deleteAction={deleteDeliveryPlaces}
      />
    </div>
  );
}
