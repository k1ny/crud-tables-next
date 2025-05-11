"use client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, Label, Select } from "@/shared/ui";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { TownDto } from "@/shared/types/dto/town.dto";
import { UserDto } from "@/shared/types/dto/user.dto";
import { UserAddressesDto } from "@/shared/types/dto/userAddresses.dto";
import { UserAddressesDefValues } from "../../constants";
import { patchUserAddress } from "@/shared/api/userAddresses";

export const UserAddressesEditForm = ({
  onUpdateAction,
  closeDialogAction,
  towns,
  users,
  userAddress,
}: {
  onUpdateAction: (u: UserAddressesDto) => void;
  closeDialogAction: () => void;
  towns: TownDto[];
  users: UserDto[];
  userAddress: UserAddressesDto;
}) => {
  const deliveryPlacesCreateForm = useForm({
    defaultValues: UserAddressesDefValues,
  });
  const { handleSubmit, control, setError, clearErrors, formState } =
    deliveryPlacesCreateForm;

  const onSubmit = async (data: Partial<UserAddressesDto>) => {
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

    const res = await patchUserAddress(userAddress.id, data);
    onUpdateAction(res);
    closeDialogAction();
  };

  const townName = towns.find((town) => town.id === userAddress.town_id)?.name;
  const user = users.find((user) => user.id === userAddress.user_id);
  const userFullName = `${user?.last_name} ${user?.first_name} ${user?.middle_name}`;

  return (
    <FormProvider {...deliveryPlacesCreateForm}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <Label>Город</Label>
          <Controller
            name="town_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={townName} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {towns.map((town) => (
                      <SelectItem key={town.id} value={town.id.toString()}>
                        {town.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Пользователь</Label>
          <Controller
            name="user_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={userFullName} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {`${user.last_name} ${user.first_name} ${user.middle_name}`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Улица</Label>
          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={userAddress.street} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Номер подъезда</Label>
          <Controller
            name="entrance"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                placeholder={
                  userAddress.entrance === null
                    ? "Введите номер подъезда"
                    : `${userAddress.entrance}`
                }
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Номер квартиры</Label>
          <Controller
            name="apartment_number"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                placeholder={
                  userAddress.apartment_number === null
                    ? "Введите номер квартиры"
                    : `${userAddress.apartment_number}`
                }
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Этаж</Label>
          <Controller
            name="floor"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder={
                  userAddress.floor === null
                    ? "Введите этаж"
                    : `${userAddress.floor}`
                }
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Код домофона</Label>
          <Controller
            name="intercom_code"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder={
                  userAddress.intercom_code === null
                    ? "Введите номер домофона"
                    : `${userAddress.intercom_code}`
                }
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
