"use client";

import Header from "@/components/Header";
import ProductManagement from "@/components/ProductManagement";
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
        heading="Menu Items" 
        description="Manage and track menu items." 
      />
      <ProductManagement/>
    </div>
  );
}