"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { OrderTypeDto } from "@/shared/types/dto/orderTypes.dto";
import { postOrderType } from "@/shared/api/orderTypes";
import { OrderTypesDefFormValues } from "../../constants";

export const OrderTypesCreateForm = ({
  onUpdateAction,
  closeDialogAction,
}: {
  onUpdateAction: (u: OrderTypeDto) => void;
  closeDialogAction: () => void;
}) => {
  const orderTypesCreateForm = useForm({
    defaultValues: OrderTypesDefFormValues,
  });
  const { handleSubmit, control } = orderTypesCreateForm;

  return (
    <FormProvider {...orderTypesCreateForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await postOrderType(data);
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

        <Button variant="outline" type="submit">
          Создать
        </Button>
      </form>
    </FormProvider>
  );
};
