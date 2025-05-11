"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/shared/ui";
import { patchUser } from "@/shared/api/users";
import { userDefFormValues } from "../../constants";
import { UserDto } from "@/shared/types/dto/user.dto";

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
  const { handleSubmit, control, setError, clearErrors, formState } =
    userEditForm;

  const onSubmit = async (data: Omit<UserDto, "id">) => {
    const hasAnyFilled = Object.values(data).some((val) => val !== "");

    if (!hasAnyFilled) {
      setError("root", {
        type: "manual",
        message: "Заполните хотя бы одно поле для редактирования",
      });
      return;
    }

    clearErrors("root");

    const res = await patchUser(user.id, data);
    const updatedUser = {
      ...res,
      created_at: new Date(res.created_at).toLocaleString(),
    };
    onUpdateAction(updatedUser);
    closeDialogAction();
  };

  return (
    <FormProvider {...userEditForm}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
              <Input {...field} placeholder={user.middle_name || ""} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Номер паспорта</Label>
          <Controller
            name="passport_serial"
            control={control}
            rules={{
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
                <Input {...field} placeholder={user.passport_serial} />
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
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введите корректный email",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder={user.email} />
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
              minLength: {
                value: 6,
                message: "Длина должна быть не менее 6 символов",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder={user.password_hash} />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
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
