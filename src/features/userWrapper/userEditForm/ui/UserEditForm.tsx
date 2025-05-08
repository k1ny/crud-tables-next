"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { patchUser } from "@/shared/api/users";
import { UserDto } from "@/shared/types/dto";
import { userDefFormValues } from "../../constants";

export const UserEditForm = ({
  user,
  onUpdateAction,
  closeDialogAction,
}: {
  user: UserDto;
  onUpdateAction: (u: UserDto) => void;
  closeDialogAction: () => void;
}) => {
  const userEditForm = useForm({ defaultValues: userDefFormValues });
  const { handleSubmit, control } = userEditForm;

  return (
    <FormProvider {...userEditForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await patchUser(user.id, data);
          const updatedUser = {
            ...res,
            created_at: new Date(res.created_at).toLocaleString(),
          };
          onUpdateAction(updatedUser);
          closeDialogAction();
        })}
      >
        <div className="flex flex-col gap-1">
          <Label>Имя</Label>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={user.first_name} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Фамилия</Label>
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={user.last_name} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Отчество</Label>
          <Controller
            name="middle_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={user.middle_name} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Номер паспорта</Label>
          <Controller
            name="passport_serial"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={user.passport_serial} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={user.email} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Хэш пароля</Label>
          <Controller
            name="password_hash"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={user.password_hash} />
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
