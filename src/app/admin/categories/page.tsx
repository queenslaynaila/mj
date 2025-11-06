 
"use client";

import { css } from "@linaria/core";
import { mqMin } from "@/styles/breakpoints";
import Header from "@/components/Header";
import EmptyStateMessage from "@/components/EmptyStateMessage";
import DataTable from "@/components/DataTable";
import { Category } from "@/types/categories.types";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
} from "@/hooks/useCategory";
import { updateCategory } from "@/app/api/categories.api";

const containerStyles = css`
  padding: 24px;
  width: 100%;
  ${mqMin[1]} {
    padding: 16px;
  }
`;

const formFields = [
  {
    key: "name",
    label: "Name",
    type: "text" as const,
    placeholder: "Enter name",
    required: true,
  },
   {
    key: "description",
    label: "Description",
    type: "text" as const,
    placeholder: "Enter description",
    required: false,
  }
];

const columns = [
  {
    key: "name",
    label: "Name",
    render: (category: Category) => category.name,
  },
  {
    key: "description",
    label: "Description",
    render: (category: Category) =>
      category.description === null ? "Null" : category.description,
  },
];

export default function CategoriesPage() {
  const {
    data: categories = { items: [] },
    isLoading,
    isError,
  } = useCategories();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();

  const handleCreate = (
    newCategory: Omit<Category, "id" | "createdAt" | "updatedAt">
  ) => {
    const id = newCategory.name.toLowerCase().replace(/\s+/g, "-");
    createCategory.mutate({
      id,
      name: newCategory.name,
      description: newCategory.description || "",
    });
  };

  const handleDelete = (id: string | number) => {
    deleteCategory.mutate(id.toString());
  };

  const handleEdit = (category: Category) => {
    updateCategory(category.id, category);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load categories.</p>;

  return (
    <div className={containerStyles}>
      <Header
        heading="Menu Categories"
        description="Manage and track available menu categories."
      />

      {categories.items.length === 0 && (
        <EmptyStateMessage
          title="No Categories"
          message="There are currently no categories configured."
        />
      )}

      {
        <DataTable
          data={categories.items}
          columns={columns}
          searchable={true}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onCreate={handleCreate}
          searchKeys={["name"]}
          formFields={formFields}
          searchPlaceholder="Search categories by name."
          paginated={true}
          itemsPerPage={10}
          deleteConfirmMessage="Are you sure you want to delete this category? This action cannot be undone."
        />
      }
    </div>
  );
}
 