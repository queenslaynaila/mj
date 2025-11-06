export interface Allergen {
  id: string;
  code: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllergensResponse {
  items: Allergen[];
}

export interface CreateAllergenBody {
  code: number;
  name: string;
  description: string;
}

export interface UpdateAllergenBody {
  name: string;
  description: string;
}