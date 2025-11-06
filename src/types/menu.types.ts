export interface Variant {
  id: string;
  label: string;
  price?: number; 
  priceDelta?: number; 
}

export interface Option {
  id: string;
  label: string;
  priceDelta?: number;
}

export interface AllergenInfo {
  id: string;
  code: number;
  name: string;
}

export interface CustomOption {
  type: string;
  label: string;
  required: boolean;
  options: Option[];
}

export interface MenuResponse {
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  notes: string | null;
  image: string;
  price: number;
  currency: string;
  allergens: AllergenInfo[]; 
  variants: Variant[];
  customOptions: CustomOption[];
  createdAt: string;
  updatedAt: string;
}
