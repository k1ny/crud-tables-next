"use server";

import { API_BASE_URL } from "@/config/env";
import { TownDto } from "../types/dto";

export const getTowns = async () => {
  const response = await fetch(`${API_BASE_URL}/towns`, { method: "GET" });
  return (await response.json()) as TownDto[];
};

export const deleteTown = async (id: number) => {
  await fetch(`${API_BASE_URL}/towns/${id}`, { method: "DELETE" });
};

export const patchTown = async (id: number, fields: object) => {
  const response = await fetch(`${API_BASE_URL}/towns/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};

export const postTown = async (fields: object) => {
  const response = await fetch(`${API_BASE_URL}/towns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};
