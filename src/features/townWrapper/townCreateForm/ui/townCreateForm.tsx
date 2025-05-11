"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { postTown } from "@/shared/api/towns";
import { townDefFormValues } from "@/features/packageTypeWrapper/constants";
import { TownDto } from "@/shared/types/dto/town.dto";

export const TownCreateForm = ({
  onUpdateAction,
  closeDialogAction,
}: {
  onUpdateAction: (u: TownDto) => void;
  closeDialogAction: () => void;
}) => {
  const townCreateForm = useForm({ defaultValues: townDefFormValues });
  const { handleSubmit, control } = townCreateForm;

  return (
    <FormProvider {...townCreateForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await postTown(data);
          onUpdateAction(res);
          closeDialogAction();
        })}
      >
        <div className="flex flex-col gap-1">
          <Label>Название</Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Это поле обязательно" }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите название" />
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
            control={control}
            rules={{
              required: "Это поле обязательно",
              pattern: {
                value: /^-?\d{1,3}(\.\d{1,6})?$/,
                message:
                  "Широта должна быть числом с максимум 6 знаками после запятой",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите широту" />
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
            name="longitude"
            control={control}
            rules={{
              required: "Это поле обязательно",
              pattern: {
                value: /^-?\d{1,3}(\.\d{1,6})?$/,
                message:
                  "Широта должна быть числом с максимум 6 знаками после запятой",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите долготу" />
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
