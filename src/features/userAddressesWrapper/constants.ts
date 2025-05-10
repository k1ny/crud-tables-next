import { UserAddressesDto } from "@/shared/types/dto/userAddresses.dto";

export const UserAddressesDefValues: Omit<UserAddressesDto, "id"> = {
  town_id: "",
  user_id: "",
  street: "",
  entrance: "",
  apartment_number: "",
  floor: "",
  intercom_code: "",
};
