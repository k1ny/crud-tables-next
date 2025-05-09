"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { PackageTypeDto } from "@/shared/types/dto";
import { PackageTypeDefValues } from "@/features/townWrapper/constants";
import { patchPackageType } from "@/shared/api/packageTypes";

export const PackageTypeEditForm = ({
  packageType,
  onUpdateAction,
  closeDialogAction,
}: {
  packageType: PackageTypeDto;
  onUpdateAction: (u: PackageTypeDto) => void;
  closeDialogAction: () => void;
}) => {
  const packageTypeEditForm = useForm({ defaultValues: PackageTypeDefValues });
  const { handleSubmit, control } = packageTypeEditForm;

  return (
    <FormProvider {...packageTypeEditForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await patchPackageType(packageType.id, data);
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
              <Input {...field} placeholder={packageType.name} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Длинна</Label>
          <Controller
            name="length"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={`${packageType.length}`} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Ширина</Label>
          <Controller
            name="width"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={`${packageType.width}`} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Высота</Label>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={`${packageType.height}`} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Вес</Label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={`${packageType.weight}`} />
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
