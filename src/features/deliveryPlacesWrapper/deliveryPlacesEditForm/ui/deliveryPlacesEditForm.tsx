"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label, Select } from "@/shared/ui";
import { DeliveryPlacesDto } from "@/shared/types/dto/deliveryPlaces.dto";
import { DeliveryPlacesDefValues } from "../../constants";
import { patchDeliveryPlaces } from "@/shared/api/deliveryPlaces";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { TownDto } from "@/shared/types/dto/town.dto";

export const DeliveryPlacesEditForm = ({
  onUpdateAction,
  closeDialogAction,
  towns,
  deliveryPlace,
}: {
  onUpdateAction: (u: DeliveryPlacesDto) => void;
  closeDialogAction: () => void;
  towns: TownDto[];
  deliveryPlace: DeliveryPlacesDto;
}) => {
  const deliveryPlacesCreateForm = useForm({
    defaultValues: DeliveryPlacesDefValues,
  });
  const { handleSubmit, control } = deliveryPlacesCreateForm;

  const townName = towns.find(
    (town) => town.id === deliveryPlace.town_id,
  )?.name;

  return (
    <FormProvider {...deliveryPlacesCreateForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await patchDeliveryPlaces(deliveryPlace.id, data);
          onUpdateAction(res);
          closeDialogAction();
        })}
      >
        <div className="flex flex-col gap-1">
          <Label>Город</Label>
          <Controller
            name="town_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={(val) => field.onChange(Number(val))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={townName} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {towns.map((town) => (
                      <SelectItem key={town.id} value={town.id.toString()}>
                        {town.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Широта</Label>
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={deliveryPlace.latitude as string}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Долгота</Label>
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={deliveryPlace.longitude as string}
              />
            )}
          />
        </div>

        <Button variant="outline" type="submit">
          Создать
        </Button>
      </form>
    </FormProvider>
  );
};
