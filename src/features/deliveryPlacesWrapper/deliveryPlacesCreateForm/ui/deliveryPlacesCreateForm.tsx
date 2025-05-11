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
            rules={{ required: "Это поле обязательно" }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={field.value || "Выберите город"}
                    />
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
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Широта</Label>
          <Controller
            name="latitude"
            rules={{
              required: "Это поле обязательно",
              pattern: {
                value: /^-?\d{1,3}(\.\d{1,6})?$/,
                message:
                  "Широта должна быть числом с максимум 6 знаками после запятой",
              },
            }}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите широту" type="number" />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Долгота</Label>
          <Controller
            rules={{
              required: "Это поле обязательно",
              pattern: {
                value: /^-?\d{1,3}(\.\d{1,6})?$/,
                message:
                  "Долгота должна быть числом с максимум 6 знаками после запятой",
              },
            }}
            name="longitude"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите долготу" type="number" />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
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
