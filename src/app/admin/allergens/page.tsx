import Header from "@/app/components/Header";
import { mqMin } from "@/styles/breakpoints";
import { css } from "@linaria/core";


const containerStyles = css`
  padding: 24px;
  width: 100%;
  ${mqMin[1]} {
    padding: 16px;
  }
`;

export default function Allergen() {
  return (
   <div className={containerStyles}>
      <Header 
        heading="Allergens" 
        description="Manage and track allergens." 
      />
    </div>
  );
}