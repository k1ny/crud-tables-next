export interface OrderDto {
  id: number;
  order_type: number | "";
  sender_address: number | "";
  sender_id: number | "";
  receiver_last_name: string;
  receiver_first_name: string;
  receiver_middle_name: string;
  receiver_point_id: number | "";
  receiver_address_id: number | "";
  package_id: number | "";
  created_at: Date | string;
  approximate_delivery_date: Date | string | null;
  price: number;
  delivered: boolean;
}
