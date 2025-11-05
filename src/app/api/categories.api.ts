import { 
  CategoriesResponse, 
  Category, 
  CreateCategoryRequest, 
  DeleteResponse
} from "@/types/categories.types";
import api from "./axios.config";

export const fetchCategories = async (): Promise<CategoriesResponse> => {
  const { data } = await api.get<CategoriesResponse>("/categories");
  return data;
};

export const createOrUpdateCategory = async (
  payload: CreateCategoryRequest
): Promise<Category> => {
  const { data } = await api.post<Category>("/categories", payload);
  return data;
};

export const updateCategory = async (
  id: string,
  payload: Category
): Promise<Category> => {
  const { data } = await api.put<Category>(`/categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id: string): Promise<DeleteResponse> => {
  const { data } = await api.delete<DeleteResponse>(`/categories/${id}`);
  return data;
};
