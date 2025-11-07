"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { FiTrash2, FiEdit2, FiSearch, FiPlus, FiX } from "react-icons/fi"
import { css } from "@linaria/atomic"

const containerStyles = css`
  width: 100%;
`

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;
`

const searchWrapperStyles = css`
  position: relative;
  flex: 1;
`

const searchIconStyles = css`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #DED4D1;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const searchInputStyles = css`
  width: 100%;
  padding: 10px 12px 10px 40px;
  background-color: #F8F3F2;
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  color: #4C4A48;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #64483E;
  }
`

const createButtonStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #64483E;
  color: #FFFDFE;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4C4A48;
  }
`

const tableContainerStyles = css`
  background-color: #FFFDFE;
  border-radius: 8px;
  overflow: hidden;
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
  font-size: 14px;
  padding: 12px 16px;
  text-align: left;
`

const trStyles = css`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #F0EAE5;
  }

  &:nth-child(even) {
    background-color: #F8F3F2;
  }
`

const tdStyles = css`
  padding: 12px 16px;
  color: #4C4A48;
  font-size: 14px;
  border-top: 1px solid #E3E2E3;
`

const actionsWrapperStyles = css`
  display: flex;
  gap: 8px;
`

const editButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: #F8F3F2;
  color: #4C4A48;
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F0EAE5;
  }
`

const deleteButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: #b03b2e;
  color: #FFFDFE;
  border: 1px solid #b03b2e;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #8f2e23;
  }
`

const emptyRowStyles = css`
  padding: 32px 16px;
  text-align: center;
  color: #DED4D1;
  font-size: 14px;
`

const paginationStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`

const paginationButtonStyles = css`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  background-color: #64483E;
  color: #FFFDFE;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #4C4A48;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const paginationButtonActiveStyles = css`
  background-color: #4C4A48;
`

const modalOverlayStyles = css`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const modalContentStyles = css`
  background-color: #FFFDFE;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`

const modalFormContentStyles = css`
  background-color: #FFFDFE;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
`

const modalHeaderStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const modalTitleStyles = css`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #4C4A48;
`

const modalTitleNoMarginStyles = css`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #4C4A48;
`

const modalTextStyles = css`
  margin: 0 0 24px 0;
  color: #64483E;
  font-size: 14px;
  line-height: 1.5;
`

const modalActionsStyles = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

const cancelButtonStyles = css`
  padding: 10px 20px;
  background-color: #F8F3F2;
  color: #4C4A48;
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F0EAE5;
  }
`

const confirmDeleteButtonStyles = css`
  padding: 10px 20px;
  background-color: #dc2626;
  color: #FFFDFE;
  border: 1px solid #dc2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #b91c1c;
  }
`

const closeButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: transparent;
  color: #DED4D1;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F8F3F2;
    color: #4C4A48;
  }
`

const formStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const fieldWrapperStyles = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const labelStyles = css`
  font-size: 14px;
  font-weight: 500;
  color: #4C4A48;
`

const requiredStyles = css`
  color: #dc2626;
`

const inputStyles = css`
  width: 100%;
  padding: 10px 12px;
  background-color: #FFFDFE;
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  color: #4C4A48;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #64483E;
  }
`

const textareaStyles = css`
  width: 100%;
  padding: 10px 12px;
  background-color: #FFFDFE;
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  color: #4C4A48;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #64483E;
  }
`

const selectStyles = css`
  width: 100%;
  padding: 10px 12px;
  background-color: #FFFDFE;
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  color: #4C4A48;
  font-size: 14px;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #64483E;
  }
`

const submitButtonStyles = css`
  padding: 10px 20px;
  background-color: #64483E;
  color: #FFFDFE;
  border: 1px solid #64483E;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4C4A48;
  }
`

interface DataItem {
  id: string
}

interface Column<T extends DataItem> {
  key: string
  label: string
  render: (item: T) => React.ReactNode
}

interface BaseFormField {
  key: string
  label: string
  placeholder?: string
  required?: boolean
}

interface TextFormField extends BaseFormField {
  type: "text" | "email" | "date"
}

interface NumberFormField extends BaseFormField {
  type: "number"
}

interface TextareaFormField extends BaseFormField {
  type: "textarea"
}

interface SelectFormField extends BaseFormField {
  type: "select"
  options: { value: string; label: string }[]
}

type FormField = TextFormField | NumberFormField | TextareaFormField | SelectFormField

interface DataTableProps<T extends DataItem> {
  data: T[]
  columns: Column<T>[]
  onDelete?: (id: string) => void
  onEdit?: (item: T) => void
  onCreate?: (item: Partial<T>) => void
  formFields?: readonly FormField[]
  searchable?: boolean
  searchKeys?: readonly (keyof T)[]
  searchPlaceholder?: string
  paginated?: boolean
  itemsPerPage?: number
  deleteConfirmTitle?: string
  deleteConfirmMessage?: string
  emptyMessage?: string
  showActions?: boolean
  createButtonLabel?: string
}

export default function DataTable<T extends DataItem>({
  data,
  columns,
  onDelete,
  onEdit,
  onCreate,
  formFields = [],
  searchable = true,
  searchKeys,
  searchPlaceholder = "Search...",
  paginated = true,
  itemsPerPage = 10,
  deleteConfirmTitle = "Confirm Delete",
  deleteConfirmMessage = "Are you sure you want to delete this item? This action cannot be undone.",
  emptyMessage = "No data found",
  showActions = true,
  createButtonLabel = "Create New",
}: DataTableProps<T>) {
  const [deleteId, setDeleteId] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [formData, setFormData] = useState<Record<string, string | number>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const confirmDelete = () => {
    if (deleteId !== null && onDelete) {
      onDelete(deleteId)
      setIsDeleteModalOpen(false)
      setDeleteId("")
    }
  }

  const openCreateForm = () => {
    setFormMode("create")
    setEditingItem(null)
    setFormData({})
    setIsFormModalOpen(true)
  }

  const openEditForm = (item: T) => {
    setFormMode("edit")
    setEditingItem(item)
    setFormData({ ...(item as unknown as Record<string, string | number>) })
    setIsFormModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formMode === "create" && onCreate) {
      onCreate(formData as Partial<T>)
    } else if (formMode === "edit" && onEdit && editingItem) {
      onEdit({ ...formData, id: editingItem.id } as T)
    }
    setIsFormModalOpen(false)
    setFormData({})
    setEditingItem(null)
  }

  const handleInputChange = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const filteredData = useMemo(() => {
    if (!searchable || !searchQuery) return data

    return data.filter((item) => {
      const keysToSearch = searchKeys || (Object.keys(item) as (keyof T)[])
      return keysToSearch.some((key) => {
        const value = item[key]
        if (value === null || value === undefined) return false
        return String(value).toLowerCase().includes(searchQuery.toLowerCase())
      })
    })
  }, [data, searchQuery, searchable, searchKeys])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = paginated ? filteredData.slice(startIndex, endIndex) : filteredData

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const renderPagination = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`${paginationButtonStyles} ${i === currentPage ? paginationButtonActiveStyles : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>,
      )
    }
    return pages
  }

  return (
    <div className={containerStyles}>
      <div className={headerStyles}>
        {searchable && (
          <div className={searchWrapperStyles}>
            <div className={searchIconStyles}>
              <FiSearch size={16} />
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className={searchInputStyles}
            />
          </div>
        )}
        {onCreate && formFields.length > 0 && (
          <button onClick={openCreateForm} className={createButtonStyles}>
            <FiPlus size={16} />
            {createButtonLabel}
          </button>
        )}
      </div>

      <div className={tableContainerStyles}>
        <table className={tableStyles}>
          <thead className={theadStyles}>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={thStyles}>
                  {column.label}
                </th>
              ))}
              {showActions && (onEdit || onDelete) && <th className={thStyles}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className={trStyles}>
                  {columns.map((column) => (
                    <td key={column.key} className={tdStyles}>
                      {column.render(item)}
                    </td>
                  ))}
                  {showActions && (onEdit || onDelete) && (
                    <td className={tdStyles}>
                      <div className={actionsWrapperStyles}>
                        {onEdit && (
                          <button
                            onClick={() => (formFields.length > 0 ? openEditForm(item) : onEdit(item))}
                            title="Edit"
                            className={editButtonStyles}
                          >
                            <FiEdit2 size={16} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => {
                              setDeleteId(item.id)
                              setIsDeleteModalOpen(true)
                            }}
                            title="Delete"
                            className={deleteButtonStyles}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (showActions && (onEdit || onDelete) ? 1 : 0)} className={emptyRowStyles}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paginated && totalPages > 1 && (
        <div className={paginationStyles}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={paginationButtonStyles}
          >
            ←
          </button>
          {renderPagination()}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={paginationButtonStyles}
          >
            →
          </button>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={modalOverlayStyles} onClick={() => setIsDeleteModalOpen(false)}>
          <div className={modalContentStyles} onClick={(e) => e.stopPropagation()}>
            <h2 className={modalTitleStyles}>{deleteConfirmTitle}</h2>
            <p className={modalTextStyles}>{deleteConfirmMessage}</p>
            <div className={modalActionsStyles}>
              <button onClick={() => setIsDeleteModalOpen(false)} className={cancelButtonStyles}>
                Cancel
              </button>
              <button onClick={confirmDelete} className={confirmDeleteButtonStyles}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isFormModalOpen && (
        <div className={modalOverlayStyles} onClick={() => setIsFormModalOpen(false)}>
          <div className={modalFormContentStyles} onClick={(e) => e.stopPropagation()}>
            <div className={modalHeaderStyles}>
              <h2 className={modalTitleNoMarginStyles}>{formMode === "create" ? "Create New Item" : "Edit Item"}</h2>
              <button onClick={() => setIsFormModalOpen(false)} className={closeButtonStyles}>
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className={formStyles}>
              {formFields.map((field) => (
                <div key={field.key} className={fieldWrapperStyles}>
                  <label htmlFor={field.key} className={labelStyles}>
                    {field.label}
                    {field.required && <span className={requiredStyles}> *</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.key}
                      value={formData[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className={textareaStyles}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.key}
                      value={formData[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      required={field.required}
                      className={selectStyles}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        handleInputChange(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)
                      }
                      placeholder={field.placeholder}
                      required={field.required}
                      className={inputStyles}
                    />
                  )}
                </div>
              ))}
              <div className={modalActionsStyles}>
                <button type="button" onClick={() => setIsFormModalOpen(false)} className={cancelButtonStyles}>
                  Cancel
                </button>
                <button type="submit" className={submitButtonStyles}>
                  {formMode === "create" ? "Create" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
