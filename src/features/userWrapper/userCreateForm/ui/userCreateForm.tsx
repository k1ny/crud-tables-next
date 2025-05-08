"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { postUser } from "@/shared/api/users";
import { UserDto } from "@/shared/types/dto";
import { userDefFormValues } from "../../constants";

export const UserCreateForm = ({
  onUpdateAction,
  closeDialogAction,
}: {
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
          const res = await postUser(data);
          const newUser = {
            ...res,
            created_at: new Date(res.created_at).toLocaleString(),
          };
          onUpdateAction(newUser);
          closeDialogAction();
        })}
      >
        <div className="flex flex-col gap-1">
          <Label>Имя</Label>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите имя" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Фамилия</Label>
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите фамилию" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Отчество</Label>
          <Controller
            name="middle_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите отчество" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Номер паспорта</Label>
          <Controller
            name="passport_serial"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите номер паспорта" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите email" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Хэш пароля</Label>
          <Controller
            name="password_hash"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Хэш пароль" />
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
