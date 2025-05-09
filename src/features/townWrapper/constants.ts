import { PackageTypeDto } from "@/shared/types/dto";

export const PackageTypeDefValues: Omit<PackageTypeDto, "id"> = {
  name: "",
  length: "",
  height: "",
  width: "",
  weight: "",
};
