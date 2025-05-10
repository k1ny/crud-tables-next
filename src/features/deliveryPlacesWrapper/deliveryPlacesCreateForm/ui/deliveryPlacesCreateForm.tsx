"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label, Select } from "@/shared/ui";
import { DeliveryPlacesDto } from "@/shared/types/dto/deliveryPlaces.dto";
import { DeliveryPlacesDefValues } from "../../constants";
import { postDeliveryPlaces } from "@/shared/api/deliveryPlaces";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { TownDto } from "@/shared/types/dto/town.dto";

export const DeliveryPlacesCreateForm = ({
  onUpdateAction,
  closeDialogAction,
  towns,
}: {
  onUpdateAction: (u: DeliveryPlacesDto) => void;
  closeDialogAction: () => void;
  towns: TownDto[];
}) => {
  const deliveryPlacesCreateForm = useForm({
    defaultValues: DeliveryPlacesDefValues,
  });
  const { handleSubmit, control } = deliveryPlacesCreateForm;

  return (
    <FormProvider {...deliveryPlacesCreateForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await postDeliveryPlaces(data);
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
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={field.value || "Выберите город"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
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
              <Input {...field} placeholder="Введите широту" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Долгота</Label>
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите долготу" />
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
