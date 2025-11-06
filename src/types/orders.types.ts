export interface AllergenInfo {
  id: string;
  code: number;
  name: string;
}

export interface Variant {
  id: string;
  label: string;
  price: number;
  priceDelta: number;
}

export interface CustomOptionChoice {
  id: string;
  label: string;
  priceDelta: number;
}

export interface CustomOption {
  type: string;
  label: string;
  required: boolean;
  options: CustomOptionChoice[];
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  notes: string;
  image: string;
  price: number;
  currency: string;
  allergens: AllergenInfo[];
  variants: Variant[];
  customOptions: CustomOption[];
  createdAt: string;
  updatedAt: string;
}

export interface SelectedOption {
   optionType: string;
  choiceId: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  menuItemId: string;
  variantId: string;
  quantity: number;
  selectedOptions: {
    optionType: string;
    choiceId: string;
  }[];
  addonItems: {
    menuItemId: string;
  }[];
  createdAt: string;
  updatedAt: string;
  menuItem: MenuItem;
}

export interface Cart {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface OrderTotal {
  amount: number;
  currency: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export type OrderStatus = "processing" | "preparing" | "ready-for-collection" | "collected";

export interface Order {
  id: string;
  cartId: string;
  status: OrderStatus;
  total: OrderTotal;
  customer: CustomerInfo;
  pickupTime: string;
  createdAt: string;
  updatedAt: string;
  cart: Cart;
}

export interface OrdersResponse {
  items: Order[];
}

export interface UpdateOrderBody {
  status: string;
  pickupTime?: string;
}
