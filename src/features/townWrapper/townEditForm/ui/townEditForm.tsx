"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { TownDto } from "@/shared/types/dto";
import { patchTown } from "@/shared/api/towns";
import { townDefFormValues } from "@/features/packageTypeWrapper/constants";

export const TownEditForm = ({
  town,
  onUpdateAction,
  closeDialogAction,
}: {
  town: TownDto;
  onUpdateAction: (u: TownDto) => void;
  closeDialogAction: () => void;
}) => {
  const townEditForm = useForm({ defaultValues: townDefFormValues });
  const { handleSubmit, control } = townEditForm;

  return (
    <FormProvider {...townEditForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await patchTown(town.id, data);
          console.log(res);
          onUpdateAction(res);
          closeDialogAction();
        })}
      >
        <div className="flex flex-col gap-1">
          <Label>Название</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder={town.name} />}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Широта</Label>
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={`${town.latitude}`} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Долгота</Label>
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={`${town.longitude}`} />
            )}
          />
        </div>

        <Button variant="outline" type="submit">
          Редактировать
        </Button>
      </form>
    </FormProvider>
  );
};
