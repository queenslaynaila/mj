export interface Category {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  items: Category[];
}

export interface CreateCategoryRequest {
  id: string;
  name: string;
  description: string;
}

export interface DeleteResponse {
  message: string;
}
