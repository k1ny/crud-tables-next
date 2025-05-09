import { OrderTypeDto } from "@/shared/types/dto/orderTypes.dto";

export const OrderTypesDefFormValues: Omit<OrderTypeDto, "id"> = {
  name: "",
};
