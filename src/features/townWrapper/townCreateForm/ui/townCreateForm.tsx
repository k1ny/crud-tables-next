"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { TownDto } from "@/shared/types/dto";
import { postTown } from "@/shared/api/towns";
import { townDefFormValues } from "@/features/packageTypeWrapper/constants";

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
            render={({ field }) => (
              <Input {...field} placeholder="Введите название" />
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
