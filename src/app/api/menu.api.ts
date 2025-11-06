import { MenuItem, MenuResponse } from "@/types/menu.types";
import api from "./axios.config";

/**
 * Fetch all menu items (optionally filter by categoryId or search term q)
 * @param categoryId optional category filter
 * @param q optional search term (matches name/description, case-insensitive)
 */
export async function getMenuItems(params?: { categoryId?: string; q?: string }): Promise<MenuResponse> {
  const res = await api.get<MenuResponse>("/menu-items", { params });
  return res.data;
}

export async function getMenuItem(id: string): Promise<MenuItem> {
  const res = await api.get<MenuItem>(`/menu-items/${id}`);
  return res.data;
}

export async function createMenuItem(data: Omit<MenuItem, "createdAt" | "updatedAt">) {
  const res = await api.post<MenuItem>("/menu-items", data);
  return res.data;
}

export async function updateMenuItem(id: string, data: Partial<MenuItem>) {
  const res = await api.put<MenuItem>(`/menu-items/${id}`, data);
  return res.data;
}

export async function deleteMenuItem(id: string) {
  const res = await api.delete<{ message: string }>(`/menu-items/${id}`);
  return res.data;
}