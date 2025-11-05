"use client"

import { css } from "@linaria/atomic"
import { useState } from "react"
import ProductTable from "./ProductTable"
import ProductMultiStepForm from "./ProductForm"
import { Allergen, Category, Product } from "@/types"


const containerStyles = css`
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 16px;
`

const headerContainerStyles = css`
  margin-bottom: 32px;
`

const titleStyles = css`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1a1a1a;
`

const subtitleStyles = css`
  color: #666666;
  font-size: 16px;
`

const tabsContainerStyles = css`
  width: 100%;
`

const tabsListStyles = css`
  display: flex;
  border-bottom: 2px solid #e5e5e5;
  margin-bottom: 24px;
  gap: 4px;
`

const tabButtonStyles = css`
  padding: 12px 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #1a1a1a;
  }
`

const tabButtonActiveStyles = css`
  padding: 12px 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  border-bottom: 2px solid #1a1a1a;
  margin-bottom: -2px;
  transition: all 0.2s ease-in-out;
`

const tabPanelStyles = css`
  padding-top: 24px;
`

const emptyStateStyles = css`
  color: #666666;
  text-align: center;
  padding: 40px;
  font-size: 16px;
`

export default function ProductManagement({
  initialProducts,
  initialCategories,
  allergens,
}: {
  initialProducts: Product[]
  initialCategories: Category[]
  allergens: Allergen[]
}) {
  const [products, setProducts] = useState(initialProducts)
  const [activeTab, setActiveTab] = useState<string>("list")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  
  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleAddProduct = (newProduct: Product) => {
    const exists = products.some((p) => p.id === newProduct.id)
    if (exists && !editingProduct) {
      alert("Product with this ID already exists")
      return
    }
    setProducts([...products, newProduct])
    setActiveTab("list")
  }

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    setEditingProduct(null)
    setActiveTab("list")
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setActiveTab("create")
  }

  return (
    <>
      
      <div className={tabsContainerStyles} >
      
        <div className={tabsListStyles}>
          <button
            className={activeTab === "list" ? tabButtonActiveStyles : tabButtonStyles}
            onClick={() => setActiveTab("list")}
          >
            All Products ({products.length})
          </button>
          <button
            className={activeTab === "create" ? tabButtonActiveStyles : tabButtonStyles}
            onClick={() => setActiveTab("create")}
          >
            {editingProduct ? "Edit Product" : "Add New Product"}
          </button>
        </div>

        {activeTab === "list" && (
          <div className={tabPanelStyles}>
            {products.length === 0 ? (
              <div className={emptyStateStyles}>No products yet. Create your first product to get started.</div>
            ) : (
              <ProductTable
                products={products}
                categories={initialCategories}
                allergens={allergens}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
          </div>
        )}

        {activeTab === "create" && (
          <div className={tabPanelStyles}>
            <ProductMultiStepForm
              categories={initialCategories}
              allergens={allergens}
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
              editingProduct={editingProduct}
              onCancel={() => {
                setEditingProduct(null)
                setActiveTab("list")
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
