import Header from "@/app/components/Header";
import ProductManagement from "@/app/components/ProductManagement";
import { ALLERGENS, CATEGORIES, PRODUCTS } from "@/data/mock-data";
import { mqMin } from "@/styles/breakpoints";
import { css } from "@linaria/core";


const containerStyles = css`
  padding: 24px;
  width: 100%;
  ${mqMin[1]} {
    padding: 16px;
  }
`;

export default function Products() {
  return (
   <div className={containerStyles}>
      <Header 
        heading="Products" 
        description="Manage and track menu items." 
      />
      <ProductManagement initialProducts={PRODUCTS} initialCategories={ CATEGORIES} allergens={ALLERGENS} />
    </div>
  );
}