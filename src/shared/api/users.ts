import { API_BASE_URL } from "@/config/env";
import { UserDto } from "../types/dto";

export const getUsers = async (): Promise<UserDto[]> => {
  const response = await fetch(`${API_BASE_URL}/users`, { method: "GET" });

  return (await response.json()) as UserDto[];
};
