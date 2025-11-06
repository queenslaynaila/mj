"use client";

import Header from "@/components/Header";
import { mqMin } from "@/styles/breakpoints";
import { css } from "@linaria/core";
import DataTable from "@/components/DataTable";
import { Allergen, CreateAllergenBody } from "@/types/allergens.types";
import { useAllergens, useCreateAllergen, useDeleteAllergen, useUpdateAllergen } from "@/hooks/useAllergens";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/Error";

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
   {
    key: "description",
    label: "Description",
    render: (allergen: Allergen) => allergen.description,
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
  {
    key: "description",
    label: "Description",
    type: "text" as const,
    placeholder: "Enter description",
    required: true,
  }
];

export default function Allergies() {
  const { data: allergens, isLoading, isError } = useAllergens();
  
  const createAllergen = useCreateAllergen();
  const updateAllergen = useUpdateAllergen();
  const deleteAllergen = useDeleteAllergen();

  const handleCreate = (newAllergen: Omit<CreateAllergenBody, "code">) => {
  const lastCode = allergens && allergens.length > 0 
    ? Math.max(...allergens.map((a) => a.code)) 
    : 0;

  const allergenWithCode: CreateAllergenBody = {
    ...newAllergen,
    code: lastCode + 1,
  };

  console.log("Creating allergen with code:", allergenWithCode);
  createAllergen.mutate(allergenWithCode);
};

 
  const handleEdit = (allergen: Allergen) => {
    updateAllergen.mutate({
      id: allergen.id, 
      payload: { name: allergen.name, description: allergen.description } 
    });
  };

  const handleDelete = (id: string) => {
    deleteAllergen.mutate(id);
  };
 
  return (
    <div className={containerStyles}>
      <Header heading="Allergens" description="Manage and track allergens." />
       {isLoading && <Loader message="Loading allergens..." />}
            
        {isError && !isLoading && (
          <ErrorMessage message="Unable to load alllergens. Please check your connection and try again." />
        )}

        {!isLoading && !isError &&(
          <DataTable
            data={allergens || []}
            columns={columns}
            searchable={true}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onCreate={handleCreate as (item: Partial<Allergen>) => void}
            searchKeys={["name"]}
            formFields={formFields}
            searchPlaceholder="Search Allergens by name."
            paginated={true}
            itemsPerPage={10}
            deleteConfirmMessage="Are you sure you want to delete this allergen? This action cannot be undone."
          />
        )}
    </div>
  );
}