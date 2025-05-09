"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { PackageTypeDto } from "@/shared/types/dto";
import { postPackageType } from "@/shared/api/packageTypes";
import { PackageTypeDefValues } from "@/features/townWrapper/constants";

export const PackageTypeCreateForm = ({
  onUpdateAction,
  closeDialogAction,
}: {
  onUpdateAction: (u: PackageTypeDto) => void;
  closeDialogAction: () => void;
}) => {
  const packageTypeCreateForm = useForm({
    defaultValues: PackageTypeDefValues,
  });
  const { handleSubmit, control } = packageTypeCreateForm;

  return (
    <FormProvider {...packageTypeCreateForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await postPackageType(data);
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
          <Label>Длинна</Label>
          <Controller
            name="length"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите длинну" type="number" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Ширина</Label>
          <Controller
            name="width"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите ширину" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Высота</Label>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите высоту" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Вес</Label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите вес" />
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
