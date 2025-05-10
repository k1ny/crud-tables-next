"use server";

import { API_BASE_URL } from "@/config/env";
import { PackageTypeDto } from "../types/dto/packageType.dto";

export const getPackageTypes = async () => {
  const response = await fetch(`${API_BASE_URL}/packageTypes`, {
    method: "GET",
  });
  return (await response.json()) as PackageTypeDto[];
};

export const deletePackageType = async (id: number) => {
  await fetch(`${API_BASE_URL}/packageTypes/${id}`, { method: "DELETE" });
};

export const patchPackageType = async (id: number, fields: object) => {
  const response = await fetch(`${API_BASE_URL}/packageTypes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};

export const postPackageType = async (fields: object) => {
  const response = await fetch(`${API_BASE_URL}/packageTypes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};
