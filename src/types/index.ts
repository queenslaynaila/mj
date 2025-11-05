export type Allergen = {
  id: number
  name: string
}

export type Category = {
  id: number
  name: string
}

export type ProductVariant = {
  id: string
  label: string
  price: number
}

export type OptionChoice = {
  id: string
  label: string
  price_delta?: number
}

export type CustomOption = {
  type: string
  label: string
  required: boolean
  options: OptionChoice[]
}

export type Product = {
  id: string
  name: string
  category_id: number
  description: string
  price: number
  currency: "EUR" | "USD" | "GBP"
  image: string
  allergens: number[]
  variants?: ProductVariant[]
  custom_options?: CustomOption[]
  notes?: string
}
