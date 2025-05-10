"use server";

import { API_BASE_URL } from "@/config/env";
import { OrderDto } from "../types/dto/orders.dto";

export const getOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "GET",
  });
  return (await response.json()) as OrderDto[];
};

export const deleteOrder = async (id: number) => {
  await fetch(`${API_BASE_URL}/orders/${id}`, { method: "DELETE" });
};

export const patchOrder = async (id: number, fields: object) => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};

export const postOrder = async (fields: object) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};
