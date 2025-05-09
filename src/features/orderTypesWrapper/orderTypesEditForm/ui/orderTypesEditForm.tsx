"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { OrderTypeDto } from "@/shared/types/dto/orderTypes.dto";
import { patchOrderType } from "@/shared/api/orderTypes";
import { OrderTypesDefFormValues } from "../../constants";

export const OrderTypesEditForm = ({
  onUpdateAction,
  closeDialogAction,
  orderType,
}: {
  onUpdateAction: (u: OrderTypeDto) => void;
  closeDialogAction: () => void;
  orderType: OrderTypeDto;
}) => {
  const orderTypesEditForm = useForm({
    defaultValues: OrderTypesDefFormValues,
  });
  const { handleSubmit, control } = orderTypesEditForm;

  return (
    <FormProvider {...orderTypesEditForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await patchOrderType(orderType.id, data);
          console.log(res, data);
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
              <Input {...field} placeholder={orderType.name} />
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
