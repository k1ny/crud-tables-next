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
          onUpdateAction(res);
          closeDialogAction();
        })}
      >
        <div className="flex flex-col gap-1">
          <Label>Название</Label>
          <Controller
            name="name"
            rules={{ required: "Необходимо изменить 1 поле" }}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder={orderType.name} />
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
          Редактировать
        </Button>
      </form>
    </FormProvider>
  );
};
