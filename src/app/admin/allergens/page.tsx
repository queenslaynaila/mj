"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { mqMin } from "@/styles/breakpoints";
import { Allergen } from "@/types";
import { css } from "@linaria/core";
import { ALLERGENS } from "@/types/mock-allergens";
import DataTable from "@/components/DataTable";

const containerStyles = css`
  padding: 24px;
  width: 100%;
  ${mqMin[1]} {
    padding: 16px;
  }
`;

const columns = [
  {
    key: "name",
    label: "Name",
    render: (allergen: Allergen) => allergen.name,
  },
];

const formFields = [
  {
    key: "name",
    label: "Name",
    type: "text" as const,
    placeholder: "Enter name",
    required: true,
  },
];

export default function Allergies() {
  const [allergens, setAllergens] = useState<Allergen[]>(ALLERGENS);

  const handleDelete = (id: string | number) => {
    setAllergens(allergens.filter((category) => category.id !== id));
  };

  const handleEdit = (allergen: Allergen) => {
    alert(`Editing user: ${allergen.name}`);
  };

  const handleCreate = (newUser: Omit<Allergen, "id">) => {
    const newId = Math.max(...allergens.map((u) => u.id), 0) + 1;
    setAllergens([...allergens, { ...newUser, id: newId }]);
  };

  return (
    <div className={containerStyles}>
      <Header heading="Allergens" description="Manage and track allergens." />

      <DataTable
        data={allergens}
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