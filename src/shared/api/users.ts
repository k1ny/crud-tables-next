"use server";

import { API_BASE_URL } from "@/config/env";
import { UserDto } from "../types/dto/user.dto";

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, { method: "GET" });
  return (await response.json()) as UserDto[];
};

export const deleteUser = async (id: number) => {
  await fetch(`${API_BASE_URL}/users/${id}`, { method: "DELETE" });
};

export const patchUser = async (id: number, fields: object) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};

export const postUser = async (fields: object) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};
