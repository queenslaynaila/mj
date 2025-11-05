"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import { mqMin } from "@/styles/breakpoints";
import { Category } from "@/types";
import { CATEGORIES } from "@/data/mock-data";
import { css } from "@linaria/core";
import EmptyStateMessage from "@/app/components/EmptyStateMessage";
import DataTable from "@/app/components/DataTable";

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
];

const columns = [
  {
    key: "name",
    label: "Name",
    render: (category: Category) => category.name,
  },
];

export default function Home() {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  const handleDelete = (id: string | number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleEdit = (category: Category) => {
    alert(`Editing user: ${category.name}`);
  };

  const handleCreate = (newUser: Omit<Category, "id">) => {
    const newId = Math.max(...categories.map((u) => u.id), 0) + 1;
    setCategories([...categories, { ...newUser, id: newId }]);
  };

  return (
    <div className={containerStyles}>
      <Header
        heading="Menu Categories"
        description="Manage and track available menu categories."
      />

      {categories.length === 0 && (
        <EmptyStateMessage
          title="No Configurations"
          message="There are currently no configs."
        />
      )}

      <DataTable
        data={categories}
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
        deleteConfirmMessage="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
}