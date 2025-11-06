export type OrderStatus = "processing" | "preparing" | "ready-for-collection" | "collected"

export interface Customer {
  name: string
  email: string
  phone: string
}

export interface Total {
  amount: number
  currency: string
}

export interface SelectedOption {
  optionType: string
  choiceId: string
}

export interface AddonItem {
  menuItemId: string
}

export interface Variant {
  id: string
  label: string
  price?: number
  priceDelta?: number
}

export interface CustomOption {
  type: string
  label: string
  required: boolean
  options: Array<{
    id: string
    label: string
    priceDelta?: number
  }>
}

export interface MenuItem {
  id: string
  categoryId: string
  name: string
  description: string
  notes?: string
  image?: string
  price: number
  currency: string
  allergens: number[]
  variants: Variant[]
  customOptions: CustomOption[]
}

export interface CartItem {
  id: string
  cartId: string
  menuItemId: string
  variantId?: string
  quantity: number
  selectedOptions: SelectedOption[]
  addonItems: AddonItem[]
  menuItem: MenuItem
}

export interface Cart {
  id: string
  status: string
  items: CartItem[]
}

export interface Order {
  id: string
  cartId: string
  status: OrderStatus
  total: Total
  customer: Customer
  pickupTime: string
  cart: Cart
}
