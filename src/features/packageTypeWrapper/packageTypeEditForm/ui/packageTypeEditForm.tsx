"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { PackageTypeDefValues } from "@/features/townWrapper/constants";
import { patchPackageType } from "@/shared/api/packageTypes";
import { PackageTypeDto } from "@/shared/types/dto/packageType.dto";

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
  const { handleSubmit, control, setError, clearErrors, formState } =
    packageTypeEditForm;

  const onSubmit = async (data: Partial<PackageTypeDto>) => {
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

    const res = await patchPackageType(packageType.id, data);
    onUpdateAction(res);
    closeDialogAction();
  };

  return (
    <FormProvider {...packageTypeEditForm}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
              <Input
                {...field}
                placeholder={`${packageType.length}`}
                type="number"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Ширина</Label>
          <Controller
            name="width"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={`${packageType.width}`}
                type="number"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Высота</Label>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={`${packageType.height}`}
                type="number"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Вес</Label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={`${packageType.weight}`}
                type="number"
              />
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
