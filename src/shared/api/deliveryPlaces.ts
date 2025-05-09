"use server";

import { API_BASE_URL } from "@/config/env";
import { DeliveryPlacesDto } from "../types/dto/deliveryPlaces.dto";

export const getDeliveryPlaces = async () => {
  const response = await fetch(`${API_BASE_URL}/parcelDeliveryPlaces`, {
    method: "GET",
  });
  return (await response.json()) as DeliveryPlacesDto[];
};

export const deleteDeliveryPlaces = async (id: number) => {
  await fetch(`${API_BASE_URL}/parcelDeliveryPlaces/${id}`, {
    method: "DELETE",
  });
};

export const patchDeliveryPlaces = async (id: number, fields: object) => {
  const response = await fetch(`${API_BASE_URL}/parcelDeliveryPlaces/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};

export const postDeliveryPlaces = async (fields: object) => {
  const response = await fetch(`${API_BASE_URL}/parcelDeliveryPlaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  return response.json();
};
