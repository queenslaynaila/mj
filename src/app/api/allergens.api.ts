import {  Allergen, CreateAllergenBody, GetAllergensResponse, UpdateAllergenBody } from "@/types/allergens.types";
import api from "./axios.config";

export const fetchAllergens = async (): Promise<Allergen[]> => {
  const res = await api.get<GetAllergensResponse>("/allergens");
  return res.data.items;
};

export const createAllergen = async (body: CreateAllergenBody): Promise<Allergen> => {
  const res = await api.post<Allergen>("/allergens", body);
  return res.data;
};

export const updateAllergen = async (
  allergenId: string,
  body: UpdateAllergenBody
): Promise<Allergen> => {
  const res = await api.patch<Allergen>(`/allergens/${allergenId}`, body);
  return res.data;
};

export const deleteAllergen = async (allergenId: string): Promise<void> => {
  await api.delete(`/allergens/${allergenId}`);
};