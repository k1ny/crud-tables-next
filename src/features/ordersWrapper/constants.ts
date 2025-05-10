import { OrderDto } from "@/shared/types/dto/orders.dto";

export const OrderDefValues: Omit<
  OrderDto,
  "id" | "delivered" | "created_at" | "approximate_delivery_date" | "price"
> = {
  order_type: "",
  sender_address: "",
  sender_id: "",
  receiver_last_name: "",
  receiver_first_name: "",
  receiver_middle_name: "",
  receiver_point_id: "",
  receiver_address_id: "",
  package_id: "",
};
