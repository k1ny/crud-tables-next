"use server";

import { API_BASE_URL } from "@/config/env";
import { OrderTypeDto } from "../types/dto/orderTypes.dto";

export const getOrderTypes = async () => {
  const response = await fetch(`${API_BASE_URL}/orderTypes`, {
    method: "GET",
  });
  return (await response.json()) as OrderTypeDto[];
};

export const deleteOrderType = async (id: number) => {
  await fetch(`${API_BASE_URL}/orderTypes/${id}`, {
    method: "DELETE",
  });
};

export const patchOrderType = async (id: number, fields: object) => {
  const response = await fetch(`${API_BASE_URL}/orderTypes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};

export const postOrderType = async (fields: object) => {
  const response = await fetch(`${API_BASE_URL}/orderTypes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};
