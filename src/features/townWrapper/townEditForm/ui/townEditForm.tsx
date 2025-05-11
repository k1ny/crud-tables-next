"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { patchTown } from "@/shared/api/towns";
import { townDefFormValues } from "@/features/packageTypeWrapper/constants";
import { TownDto } from "@/shared/types/dto/town.dto";

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
  const { handleSubmit, control, setError, clearErrors, formState } =
    townEditForm;

  const onSubmit = async (data: Partial<TownDto>) => {
    const hasAnyFilled = Object.values(data).some(
      (val) => val !== undefined && val !== null && val !== "",
    );

    if (!hasAnyFilled) {
      setError("root", {
        type: "manual",
        message: "Заполните хотя бы одно поле для редактирования",
      });
      return;
    }

    clearErrors("root");

    const res = await patchTown(town.id, data);
    onUpdateAction(res);
    closeDialogAction();
  };

  return (
    <FormProvider {...townEditForm}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
            rules={{
              pattern: {
                value: /^-?\d{1,3}(\.\d{1,6})?$/,
                message:
                  "Широта должна быть числом с максимум 6 знаками после запятой",
              },
            }}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder={`${town.latitude}`} />
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
              pattern: {
                value: /^-?\d{1,3}(\.\d{1,6})?$/,
                message:
                  "Долгота должна быть числом с максимум 6 знаками после запятой",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder={`${town.longitude}`} />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        {formState.errors.root && (
          <span className="text-red-500 text-sm">
            {formState.errors.root.message}
          </span>
        )}

        <Button variant="outline" type="submit">
          Редактировать
        </Button>
      </form>
    </FormProvider>
  );
};
