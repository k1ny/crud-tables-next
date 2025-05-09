import { DeliveryPlacesDto } from "@/shared/types/dto/deliveryPlaces.dto";

export const DeliveryPlacesDefValues: Omit<DeliveryPlacesDto, "id"> = {
  town_id: "",
  latitude: "",
  longitude: "",
};
