import type { Category, Allergen, Product } from "@/types"

export const ALLERGENS: Allergen[] = [
  { id: 1, name: "Gluten" },
  { id: 2, name: "Dairy" },
  { id: 4, name: "Eggs" },
  { id: 7, name: "Tree nuts" },
  { id: 9, name: "Sesame" },
  { id: 12, name: "Mustard" },
  { id: 13, name: "Celery" },
]

export const CATEGORIES: Category[] = [
  { id: 1, name: "Smash Burgers" },
  { id: 2, name: "Classic Burgers" },
  { id: 3, name: "Sides" },
  { id: 4, name: "Desserts" },
  { id: 5, name: "Beverages" },
]

export const PRODUCTS: Product[] = [
  {
    id: "mj-american-stack",
    name: "MJ's American Stack",
    category_id: 1,
    description:
      "Brioche bun, 2 x 4oz patties, American cheese, gherkins, shredded iceberg, streaky bacon, burger sauce",
    price: 13,
    currency: "EUR",
    image: "/eg-burger-mjs.jpg",
    allergens: [1, 2, 4, 7, 9, 12, 13],
    variants: [
      { id: "default", label: "Burger Only", price: 13 },
      { id: "with-fries", label: "With fries", price: 16 },
      { id: "with-topped-fries", label: "With topped fries", price: 18 },
    ],
    custom_options: [
      {
        type: "cooking-style",
        label: "Cooking style",
        required: true,
        options: [
          { id: "smashed-crispy", label: "Smashed & Crispy" },
          { id: "classic-grilled", label: "Classic Grilled" },
        ],
      },
      {
        type: "meat-temp",
        label: "Meat temperature",
        required: true,
        options: [
          { id: "well", label: "Well Done" },
          { id: "medium", label: "Medium" },
          { id: "medium-rare", label: "Medium Rare" },
        ],
      },
    ],
    notes: "All beef burgers available in a gluten-free bun; GF cheese and burger sauce available",
  },
]
