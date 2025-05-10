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
import { postUserAddress } from "@/shared/api/userAddresses";

export const UserAddressesCreateForm = ({
  onUpdateAction,
  closeDialogAction,
  towns,
  users,
}: {
  onUpdateAction: (u: UserAddressesDto) => void;
  closeDialogAction: () => void;
  towns: TownDto[];
  users: UserDto[];
}) => {
  const deliveryPlacesCreateForm = useForm({
    defaultValues: UserAddressesDefValues,
  });
  const { handleSubmit, control } = deliveryPlacesCreateForm;

  return (
    <FormProvider {...deliveryPlacesCreateForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await postUserAddress(data);
          onUpdateAction(res);
          closeDialogAction();
        })}
      >
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
                  <SelectValue placeholder={field.value || "Выберите город"} />
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
                  <SelectValue
                    placeholder={field.value || "Выберите пользователя"}
                  />
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
              <Input {...field} placeholder="Введите улицу" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Номер подъезда</Label>
          <Controller
            name="entrance"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите номер подъезда" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Номер квартиры</Label>
          <Controller
            name="apartment_number"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите номер квартиры" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Этаж</Label>
          <Controller
            name="floor"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите этаж" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Код домофона</Label>
          <Controller
            name="intercom_code"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Код домофона" />
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
