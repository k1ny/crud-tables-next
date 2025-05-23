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
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { useEffect, useState } from "react";
import { TownDto } from "@/shared/types/dto/town.dto";
import { patchOrder } from "@/shared/api/orders";

export const OrdersEditForm = ({
  onUpdateAction,
  closeDialogAction,
  users,
  orderTypes,
  deliveryPlaces,
  userAddresses,
  packageTypes,
  towns,
  order,
}: {
  onUpdateAction: (u: OrderDto) => void;
  closeDialogAction: () => void;
  users: UserDto[];
  orderTypes: OrderTypeDto[];
  deliveryPlaces: DeliveryPlacesDto[];
  userAddresses: UserAddressesDto[];
  packageTypes: PackageTypeDto[];
  towns: TownDto[];
  order: OrderDto;
}) => {
  const ordersCreateForm = useForm({
    defaultValues: OrderDefValues,
  });
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState,
  } = ordersCreateForm;
  useEffect(() => {
    setPlace(order.receiver_point_id ? "point" : "address");
  }, [order.receiver_point_id]);

  const [place, setPlace] = useState<string>("");
  const user = users.find((user) => user.id === order.sender_id);
  const userAddress = userAddresses.find(
    (userAddress) => userAddress.id === order.sender_address,
  );
  const town = towns.find((towns) => towns.id === userAddress?.town_id);
  const packageType = packageTypes.find(
    (packageType) => packageType.id === order?.package_id,
  );
  const orderType = orderTypes.find(
    (orderType) => orderType.id === order?.order_type,
  );

  const submitForm = async (data: Partial<OrderDto>) => {
    const addressId = getValues("receiver_address_id");
    const pointId = getValues("receiver_point_id");

    if (
      (addressId || order.receiver_address_id) &&
      (pointId || order.receiver_point_id)
    ) {
      setError("root", {
        type: "manual",
        message: "Можно выбрать только адрес *или* пункт выдачи, не оба сразу",
      });
      return;
    }

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
    const res = await patchOrder(order.id, data);
    onUpdateAction(res);
    closeDialogAction();
  };

  return (
    <FormProvider {...ordersCreateForm}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitForm)}>
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
                    placeholder={`${user?.last_name} ${user?.first_name} ${user?.middle_name}`}
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
                    placeholder={`г.${town?.name} ул.${userAddress?.street}`}
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
                    placeholder={`${packageType?.name}: ${packageType?.length}х${packageType?.width}x${packageType?.height}, ${packageType?.weight}kg`}
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
                  <SelectValue placeholder={`${orderType?.name}`} />
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
              <Input {...field} placeholder={order.receiver_last_name} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Имя получателя</Label>
          <Controller
            name="receiver_first_name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={order.receiver_first_name} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Отчество получателя</Label>
          <Controller
            name="receiver_middle_name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={
                  order.receiver_middle_name
                    ? order.receiver_middle_name
                    : "Введите отчество"
                }
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Адрес получателя или пункт выдачи</Label>
          <RadioGroup
            onValueChange={(value) => {
              setPlace(value);
              if (value === "address") {
                setValue("receiver_point_id", "");
              } else {
                setValue("receiver_address_id", "");
              }
            }}
            defaultValue={order.receiver_point_id ? "point" : "address"}
          >
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
                      placeholder={
                        order.receiver_point_id
                          ? order.receiver_point_id
                          : "Выберите пункт выдачи"
                      }
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
                      placeholder={
                        order.receiver_address_id
                          ? order.receiver_address_id
                          : "Выберите адрес получения"
                      }
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
