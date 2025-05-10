"use server";

import { API_BASE_URL } from "@/config/env";
import { UserAddressesDto } from "../types/dto/userAddresses.dto";

export const getUserAddresses = async () => {
  const response = await fetch(`${API_BASE_URL}/userAddresses`, {
    method: "GET",
  });
  return (await response.json()) as UserAddressesDto[];
};

export const deleteUserAddress = async (id: number) => {
  await fetch(`${API_BASE_URL}/userAddresses/${id}`, { method: "DELETE" });
};

export const patchUserAddress = async (id: number, fields: object) => {
  const response = await fetch(`${API_BASE_URL}/userAddresses/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};

export const postUserAddress = async (fields: object) => {
  const response = await fetch(`${API_BASE_URL}/userAddresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};
