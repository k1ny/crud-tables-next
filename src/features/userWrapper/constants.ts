import { UserDto } from "@/shared/types/dto/user.dto";

export const userDefFormValues: Omit<UserDto, "id"> = {
  last_name: "",
  first_name: "",
  middle_name: "",
  passport_serial: "",
  email: "",
  password_hash: "",
  created_at: "",
};
