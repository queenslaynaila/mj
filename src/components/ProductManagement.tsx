"use client"

import { css } from "@linaria/atomic"
import { useState } from "react"
import ProductTable from "./ProductTable"
import ProductMultiStepForm from "./MultiStepForm"
import { useCategories } from "../hooks/useCategory"
import { useCreateMenuItem, useDeleteMenuItem, useMenuItems, useUpdateMenuItem } from "../hooks/useMenu"
import { MenuItem } from "@/types/menu.types"
import { useAllergens } from "@/hooks/useAllergens"
import Loader from "./Loader"
import ErrorMessage from "./Error"

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



export default function ProductManagement() {
  const { data: categories = { items: [] }, isLoading, isError } = useCategories();
  const { data: allergens } = useAllergens();
  const { data: menu, isLoading: menuLoading, isError: menuError } = useMenuItems();
  const createMenuItem = useCreateMenuItem();
  const deleteMenuItem = useDeleteMenuItem();
  const updateMenuItem = useUpdateMenuItem();

  const [activeTab, setActiveTab] = useState<string>("list");
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);

  const handleEdit = (menu: MenuItem) => {
    setEditingProduct(menu);
    setActiveTab("create");
  };

  const handleAddProduct = (newMenu: Omit<MenuItem, "createdAt"|"updatedAt">) => {
    createMenuItem.mutate(newMenu, {
      onSuccess: () => {
        setActiveTab("list");
      },
    });
  };

  const handleUpdateProduct = (updatedMenu:Omit<MenuItem,"createdAt"|"updatedAt">) => {
    updateMenuItem.mutate(
      { id: updatedMenu.id, data: updatedMenu },
      {
        onSuccess: () => {
          setEditingProduct(null);
          setActiveTab("list");
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteMenuItem.mutate(id);
  };

  if (isLoading || menuLoading) return  <Loader message="Loading menu..." />;
  if (isError || menuError  && !isLoading) return <ErrorMessage message="Unable to load menu. Please check your connection and try again." />;

  const categoriesList = categories.items ?? [];
  const menuItems = menu?.items ?? [];

  return (
    <div className={tabsContainerStyles}>
      <div className={tabsListStyles}>
        <button
          className={activeTab === "list" ? tabButtonActiveStyles : tabButtonStyles}
          onClick={() => setActiveTab("list")}
        >
          All Products ({menuItems.length})
        </button>
        <button
          className={activeTab === "create" ? tabButtonActiveStyles : tabButtonStyles}
          onClick={() => setActiveTab("create")}
        >
          {editingProduct ? "Edit Menu" : "Add New Menu"}
        </button>
      </div>

      {activeTab === "list" && (
        <div className={tabPanelStyles}>
          {menuItems.length === 0 ? (
            <div className={emptyStateStyles}>
              No Menu yet. Create your first menu to get started.
            </div>
          ) : (
            <ProductTable
              products={menuItems}
              categories={categoriesList}
              allergens={allergens || []}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>
      )}

      {activeTab === "create" && (
        <div className={tabPanelStyles}>
          <ProductMultiStepForm
            categories={categoriesList}
            allergens={allergens || []}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            editingProduct={editingProduct}
            onCancel={() => {
              setEditingProduct(null);
              setActiveTab("list");
            }}
          />
        </div>
      )}
    </div>
  );
}
