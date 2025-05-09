import { TownDto } from "@/shared/types/dto";

export const townDefFormValues: Omit<TownDto, "id"> = {
  name: "",
  latitude: "",
  longitude: "",
};
