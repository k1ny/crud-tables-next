"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { postPackageType } from "@/shared/api/packageTypes";
import { PackageTypeDefValues } from "@/features/townWrapper/constants";
import { PackageTypeDto } from "@/shared/types/dto/packageType.dto";

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
          <Label>Длинна</Label>
          <Controller
            name="length"
            control={control}
            rules={{
              required: "Это поле обязательно",
              pattern: {
                value: /^\d+$/,
                message: "Допустимы только цифры",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите длинну" type="number" />
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
          <Label>Ширина</Label>
          <Controller
            name="width"
            control={control}
            rules={{
              required: "Это поле обязательно",
              pattern: {
                value: /^\d+$/,
                message: "Допустимы только цифры",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите ширину" type="number" />
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
          <Label>Высота</Label>
          <Controller
            name="height"
            control={control}
            rules={{
              required: "Это поле обязательно",
              pattern: {
                value: /^\d+$/,
                message: "Допустимы только цифры",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите высоту" type="number" />
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
          <Label>Вес</Label>
          <Controller
            name="weight"
            rules={{
              required: "Это поле обязательно",
              pattern: {
                value: /^\d+$/,
                message: "Допустимы только цифры",
              },
            }}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите вес" type="number" />
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
