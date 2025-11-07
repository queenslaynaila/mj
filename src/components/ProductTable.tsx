"use client"

import { css } from "@linaria/atomic"
import { useState, useMemo } from "react"
import { MdDelete, MdEdit, MdSearch, MdFilterList } from "react-icons/md"
import AllergenFilter from "./AllergenFilter"
import CategoryFilter from "./CategoryFilter"
import type { MenuItem } from "@/types/menu.types"
import type { Category } from "@/types/categories.types"
import type { Allergen } from "@/types/allergens.types"

const paperStyles = css`
  background: #FFFDFE;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
`

const filterHeaderStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`

const filterIconStyles = css`
  color: #4C4A48;
`

const filterTitleStyles = css`
  font-weight: 600;
  font-size: 14px;
  color: #4C4A48;
  margin: 0;
`

const stackStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const textInputStyles = css`
  width: 100%;
  padding: 10px 12px 10px 40px;
  border-radius: 8px;
  border: 1px solid #DED4D1;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #64483E;
  }

  &::placeholder {
    color: #DED4D1;
  }
`

const inputWrapperStyles = css`
  position: relative;
  width: 100%;
`

const searchIconStyles = css`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #4C4A48;
  pointer-events: none;
`

const groupGrowStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    
    & > * {
      flex: 1;
    }
  }
`

const selectStyles = css`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #DED4D1;
  font-size: 14px;
  outline: none;
  background: #FFFDFE;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    border-color: #64483E;
  }
`

const dividerStyles = css`
  height: 1px;
  background: #E3E2E3;
  border: none;
  margin: 16px 0;
`

const filterSummaryStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const textSmallStyles = css`
  font-size: 14px;
  color: #4C4A48;
  font-weight: 500;
  margin: 0;
`

const buttonSubtleStyles = css`
  background: transparent;
  border: none;
  color: #64483E;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F0EAE5;
  }
`

const tableWrapperStyles = css`
  overflow-x: auto;
  background-color: #FFFDFE;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(76, 74, 72, 0.08);
  border: 1px solid #E3E2E3;
`

const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
`

const theadStyles = css`
  background-color: #F8F3F2;
`

const thStyles = css`
  color: black;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.5px;
  padding: 16px;
  text-align: left;
`

const tbodyStyles = css`
    transition: background-color 0.2s ease;

  & tr:nth-child(even) {
     background-color: #F8F3F2;
  }

  & tr:hover {
    background-color: #F0EAE5;
  }
`

const tdStyles = css`
  padding: 16px;
  font-size: 14px;
  color: #4C4A48;
  border-top: 1px solid #E3E2E3;
`

const imageContainerStyles = css`
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #E3E2E3;
  flex-shrink: 0;
`

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const noImageStyles = css`
  width: 48px;
  height: 48px;
  background-color: #F8F3F2;
  border: 1px solid #E3E2E3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const noImageTextStyles = css`
  font-size: 12px;
  color: #DED4D1;
  font-weight: 500;
`

const productNameStyles = css`
  font-weight: 600;
  font-size: 14px;
  color: #4C4A48;
  margin: 0;
`

const badgeStyles = css`
  display: inline-block;
  padding: 6px 12px;
  background-color: #F8F3F2;
  color: #4C4A48;
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  font-weight: 500;
  font-size: 13px;
`

const priceStyles = css`
  font-weight: 600;
  font-size: 14px;
  color: #4C4A48;
  margin: 0;
`

const actionGroupStyles = css`
  display: flex;
  gap: 8px;
`

const actionButtonStyles = css`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #E3E2E3;
  background: #F8F3F2;
  color: #4C4A48;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #64483E;
    border-color: #64483E;
    color: #FFFDFE;
  }
`

const deleteButtonStyles = css`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #fee2e2;
  background: #fef2f2;
  color: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dc2626;
    border-color: #dc2626;
    color: #ffffff;
  }
`

const paginationContainerStyles = css`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`

const paginationStyles = css`
  display: flex;
  gap: 8px;
  align-items: center;
`

const paginationButtonStyles = css`
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #DED4D1;
  background: #FFFDFE;
  color: #4C4A48;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #F0EAE5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background-color: #64483E;
    color: #FFFDFE;
    border-color: #64483E;
  }
`

const modalOverlayStyles = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const modalContentStyles = css`
  background: #FFFDFE;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.2s ease;

  @keyframes slideIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`

const modalTitleStyles = css`
  font-weight: 600;
  font-size: 18px;
  color: #4C4A48;
  margin: 0 0 16px 0;
`

const modalTextStyles = css`
  color: #4C4A48;
  font-size: 14px;
  margin: 0 0 24px 0;
  line-height: 1.5;
`

const modalActionsStyles = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

const buttonDefaultStyles = css`
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid #DED4D1;
  background: #FFFDFE;
  color: #4C4A48;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F0EAE5;
  }
`

const buttonDangerStyles = css`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background: #dc2626;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #b91c1c;
  }
`

export default function ProductTable({
  products,
  categories,
  allergens,
  onDelete,
  onEdit,
}: {
  products: MenuItem[]
  categories: Category[]
  allergens: Allergen[]
  onDelete: (id: string) => void
  onEdit: (product: MenuItem) => void
}) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [minPrice, setMinPrice] = useState<number | string>("")
  const [maxPrice, setMaxPrice] = useState<number | string>("")
  const [allergenFilter, setAllergenFilter] = useState<string[]>([])
  const [missingImage, setMissingImage] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      if (categoryFilter && String(product.categoryId) !== categoryFilter) {
        return false
      }

      if (minPrice !== "" && product.price < Number(minPrice)) return false
      if (maxPrice !== "" && product.price > Number(maxPrice)) return false

      if (allergenFilter.length > 0) {
        const productAllergens = product.allergens || []
        const hasAllAllergens = allergenFilter.every((allergenId) =>
          productAllergens.some((a) => a.id === String(allergenId)),
        )

        if (!hasAllAllergens) return false
      }

      if (missingImage && product.image) return false

      return true
    })
  }, [products, searchQuery, categoryFilter, minPrice, maxPrice, allergenFilter, missingImage])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      setIsOpen(false)
      setDeleteId(null)
    }
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => String(cat.id) === String(categoryId))
    return category ? category.name : "Unknown"
  }

  const rows = paginatedProducts.map((product) => (
    <tr key={product.id}>
      <td className={tdStyles}>
        {product.image ? (
          <div className={imageContainerStyles}>
            <img src={product.image || "/placeholder.svg"} alt={product.name} className={imageStyles} />
          </div>
        ) : (
          <div className={noImageStyles}>
            <span className={noImageTextStyles}>No img</span>
          </div>
        )}
      </td>
      <td className={tdStyles}>
        <p className={productNameStyles}>{product.name}</p>
      </td>
      <td className={tdStyles}>
        <span className={badgeStyles}>{getCategoryName(product.categoryId)}</span>
      </td>
      <td className={tdStyles}>
        <p className={priceStyles}>€{product.price.toFixed(2)}</p>
      </td>
      <td className={tdStyles}>
        <div className={actionGroupStyles}>
          <button className={actionButtonStyles} onClick={() => onEdit(product)} aria-label="Edit product">
            <MdEdit size={16} />
          </button>
          <button
            className={deleteButtonStyles}
            onClick={() => {
              setDeleteId(product.id)
              setIsOpen(true)
            }}
            aria-label="Delete product"
          >
            <MdDelete size={16} />
          </button>
        </div>
      </td>
    </tr>
  ))

  return (
    <>
      <div className={paperStyles}>
        <div className={filterHeaderStyles}>
          <MdFilterList size={18} className={filterIconStyles} />
          <h3 className={filterTitleStyles}>Filters</h3>
        </div>

        <div className={stackStyles}>
          <div className={inputWrapperStyles}>
            <MdSearch size={16} className={searchIconStyles} />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.currentTarget.value)
                setCurrentPage(1)
              }}
              className={textInputStyles}
            />
          </div>

          <div className={groupGrowStyles}>
            <CategoryFilter
              categories={categories}
              value={categoryFilter}
              onChange={(value) => {
                setCategoryFilter(value)
                setCurrentPage(1)
              }}
            />

            <AllergenFilter
              allergens={allergens}
              value={allergenFilter}
              onChange={(value) => {
                setAllergenFilter(value)
                setCurrentPage(1)
              }}
            />
          </div>

          <div className={groupGrowStyles}>
            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value)
                setCurrentPage(1)
              }}
              min={0}
              step={0.01}
              className={selectStyles}
            />
            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value)
                setCurrentPage(1)
              }}
              min={0}
              step={0.01}
              className={selectStyles}
            />
            <select
              value={missingImage ? "missing-image" : ""}
              onChange={(e) => {
                setMissingImage(e.target.value === "missing-image")
                setCurrentPage(1)
              }}
              className={selectStyles}
            >
              <option value="">Image Filter</option>
              <option value="missing-image">Missing Image</option>
            </select>
          </div>
        </div>

        <hr className={dividerStyles} />

        <div className={filterSummaryStyles}>
          <p className={textSmallStyles}>
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>
          {(searchQuery ||
            categoryFilter ||
            allergenFilter.length > 0 ||
            minPrice !== "" ||
            maxPrice !== "" ||
            missingImage) && (
            <button
              className={buttonSubtleStyles}
              onClick={() => {
                setSearchQuery("")
                setCategoryFilter(null)
                setAllergenFilter([])
                setMinPrice("")
                setMaxPrice("")
                setMissingImage(false)
                setCurrentPage(1)
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      <div className={tableWrapperStyles}>
        <table className={tableStyles}>
          <thead className={theadStyles}>
            <tr>
              <th className={thStyles}>Image</th>
              <th className={thStyles}>Name</th>
              <th className={thStyles}>Category</th>
              <th className={thStyles}>Price</th>
              <th className={thStyles}>Actions</th>
            </tr>
          </thead>
          <tbody className={tbodyStyles}>{rows}</tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={paginationContainerStyles}>
          <div className={paginationStyles}>
            <button
              className={paginationButtonStyles}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${paginationButtonStyles} ${page === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={paginationButtonStyles}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className={modalOverlayStyles} onClick={() => setIsOpen(false)}>
          <div className={modalContentStyles} onClick={(e) => e.stopPropagation()}>
            <h2 className={modalTitleStyles}>Confirm Delete</h2>
            <p className={modalTextStyles}>
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className={modalActionsStyles}>
              <button className={buttonDefaultStyles} onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button className={buttonDangerStyles} onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
