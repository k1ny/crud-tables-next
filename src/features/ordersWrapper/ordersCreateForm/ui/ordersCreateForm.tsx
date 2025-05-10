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
import { UserDto } from "@/shared/types/dto/user.dto";
import { OrderDto } from "@/shared/types/dto/orders.dto";
import { OrderTypeDto } from "@/shared/types/dto/orderTypes.dto";
import { DeliveryPlacesDto } from "@/shared/types/dto/deliveryPlaces.dto";
import { UserAddressesDto } from "@/shared/types/dto/userAddresses.dto";
import { PackageTypeDto } from "@/shared/types/dto/packageType.dto";
import { OrderDefValues } from "../../constants";
import { postOrder } from "@/shared/api/orders";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { useState } from "react";
import { TownDto } from "@/shared/types/dto/town.dto";

export const OrdersCreateForm = ({
  onUpdateAction,
  closeDialogAction,
  users,
  orderTypes,
  deliveryPlaces,
  userAddresses,
  packageTypes,
  towns,
}: {
  onUpdateAction: (u: OrderDto) => void;
  closeDialogAction: () => void;
  users: UserDto[];
  orderTypes: OrderTypeDto[];
  deliveryPlaces: DeliveryPlacesDto[];
  userAddresses: UserAddressesDto[];
  packageTypes: PackageTypeDto[];
  towns: TownDto[];
}) => {
  const ordersCreateForm = useForm({
    defaultValues: OrderDefValues,
  });
  const { handleSubmit, control } = ordersCreateForm;
  const [place, setPlace] = useState<string>("");

  return (
    <FormProvider {...ordersCreateForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const res = await postOrder(data);
          onUpdateAction(res);
          closeDialogAction();
        })}
      >
        <div className="flex flex-col gap-1">
          <Label>Отправитель</Label>
          <Controller
            name="sender_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={field.value || "Выберите отправителя"}
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
          <Label>Пункт отправки</Label>
          <Controller
            name="sender_address"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={field.value || "Выберите пункт отправки"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {deliveryPlaces.map((deliveryPlace) => (
                      <SelectItem
                        key={deliveryPlace.id}
                        value={deliveryPlace.id.toString()}
                      >
                        {deliveryPlace.id}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Тип посылки</Label>
          <Controller
            name="package_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={field.value || "Выберите тип посылки"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {packageTypes.map((packageType) => (
                      <SelectItem
                        key={packageType.id}
                        value={packageType.id.toString()}
                      >
                        {`${packageType.name}: ${packageType.length}х${packageType.width}x${packageType.height}, ${packageType.weight}kg`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Тип заказа</Label>
          <Controller
            name="order_type"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={field.value || "Выберите тип заказа"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {orderTypes.map((orderType) => (
                      <SelectItem
                        key={orderType.id}
                        value={orderType.id.toString()}
                      >
                        {orderType.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Фамилия получателя</Label>
          <Controller
            name="receiver_last_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите фамилию получателя" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Имя получателя</Label>
          <Controller
            name="receiver_first_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите имя получателя" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Отчество получателя</Label>
          <Controller
            name="receiver_middle_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите отчество получателя" />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Адрес получателя или пункт выдачи</Label>

          <RadioGroup onValueChange={(value) => setPlace(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="address" id="r1" />
              <Label htmlFor="r1">Адрес</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="point" id="r2" />
              <Label htmlFor="r2">Пункт выдачи</Label>
            </div>
          </RadioGroup>

          {place === "point" && (
            <Controller
              name="receiver_point_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={field.value || "Выберите пункт выдачи"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {deliveryPlaces.map((deliveryPlace) => (
                        <SelectItem
                          key={deliveryPlace.id}
                          value={deliveryPlace.id.toString()}
                        >
                          {deliveryPlace.id}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          )}

          {place === "address" && (
            <Controller
              name="receiver_address_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={field.value || "Выберите адрес получателя"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {userAddresses.map((userAddress) => (
                        <SelectItem
                          key={userAddress.id}
                          value={userAddress.id.toString()}
                        >
                          {`г.${towns.find((town) => town.id === userAddress.town_id)?.name} ул.${userAddress.street}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </div>

        <Button variant="outline" type="submit">
          Создать
        </Button>
      </form>
    </FormProvider>
  );
};
