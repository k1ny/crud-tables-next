"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { postUser } from "@/shared/api/users";
import { userDefFormValues } from "../../constants";
import { UserDto } from "@/shared/types/dto/user.dto";

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
            rules={{ required: "Это поле обязательно" }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите имя" />
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
          <Label>Фамилия</Label>
          <Controller
            name="last_name"
            control={control}
            rules={{ required: "Это поле обязательно" }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите фамилию" />
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
            rules={{
              required: "Это поле обязательно",
              minLength: {
                value: 10,
                message: "Номер паспорта должен содержать 10 цифр",
              },
              maxLength: {
                value: 10,
                message: "Номер паспорта должен содержать 10 цифр",
              },
              pattern: {
                value: /^\d+$/,
                message: "Номер паспорта должен содержать только цифры",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите номер паспорта" />
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
          <Label>Email</Label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Это поле обязательно",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введите корректный email",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите email" />
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
          <Label>Хэш пароля</Label>
          <Controller
            name="password_hash"
            control={control}
            rules={{
              required: "Это поле обязательно",
              minLength: {
                value: 6,
                message: "Длина должна быть не менее 6 символов",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Введите хэш пароля" />
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
