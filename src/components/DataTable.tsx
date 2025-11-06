import type React from "react"
import { css, cx } from "@linaria/atomic"
import { useState, useMemo } from "react"
import { FiTrash2, FiEdit2, FiSearch, FiPlus, FiX } from "react-icons/fi"

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

const createButtonStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #1a1a1a;
  color: #ffffff;
  border: 1px solid #1a1a1a;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #333333;
  }

  &:active {
    transform: scale(0.98);
  }
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
  color: #999999;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const searchInputStyles = css`
  width: 100%;
  padding: 10px 12px 10px 40px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  color: #1a1a1a;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
  }

  &::placeholder {
    color: #999999;
  }
`

const tableWrapperStyles = css`
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e5e5;
`

const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
`

const tableHeadStyles = css`
  background-color: lightgray;
`

const tableHeadCellStyles = css`
  color:black;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 16px;
  text-align: left;
`

const tableRowStyles = css`
  transition: background-color 0.2s ease;

  &:nth-child(even) {
    background-color: #fafafa;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`

const tableCellStyles = css`
  padding: 12px 16px;
  color: #1a1a1a;
  font-size: 14px;
  border-top: 1px solid #f0f0f0;
`

const emptyCellStyles = css`
  padding: 32px 16px;
  text-align: center;
  color: #999999;
  font-size: 14px;
`

const actionGroupStyles = css`
  display: flex;
  gap: 8px;
`

const actionButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: #f5f5f5;
  color: #1a1a1a;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e5e5;
  }

  &:active {
    transform: scale(0.95);
  }
`

const actionButtonDangerStyles = css`
  background-color: #dc2626;
  color: #ffffff;
  border: 1px solid #dc2626;

  &:hover {
    background-color: #b91c1c;
  }
`

const paginationWrapperStyles = css`
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
  background-color: #ffffff;
  color: #1a1a1a;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #f5f5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const paginationButtonActiveStyles = css`
  background-color: #1a1a1a;
  color: #ffffff;
  border: 1px solid #1a1a1a;

  &:hover:not(:disabled) {
    background-color: #1a1a1a;
  }
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

const modalOverlayHiddenStyles = css`
  display: none;
`

const modalContentStyles = css`
  background-color: #ffffff;
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
  color: #1a1a1a;
`

const modalTextStyles = css`
  margin: 0 0 24px 0;
  color: #666666;
  font-size: 14px;
  line-height: 1.5;
`

const modalActionsStyles = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

const buttonStyles = css`
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #1a1a1a;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e5e5;
  }
`

const buttonDangerStyles = css`
  background-color: #dc2626;
  color: #ffffff;
  border: 1px solid #dc2626;

  &:hover {
    background-color: #b91c1c;
  }
`

const buttonPrimaryStyles = css`
  background-color: #1a1a1a;
  color: #ffffff;
  border: 1px solid #1a1a1a;

  &:hover {
    background-color: #333333;
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
  color: #666666;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #1a1a1a;
  }
`

const formStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const formGroupStyles = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const labelStyles = css`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
`

const inputStyles = css`
  width: 100%;
  padding: 10px 12px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  color: #1a1a1a;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
  }

  &::placeholder {
    color: #999999;
  }
`

const textareaStyles = css`
  width: 100%;
  padding: 10px 12px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  color: #1a1a1a;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
  }

  &::placeholder {
    color: #999999;
  }
`

const selectStyles = css`
  width: 100%;
  padding: 10px 12px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  color: #1a1a1a;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
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
  onDelete?: (id: string ) => void
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
  const [deleteId, setDeleteId] = useState('')
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
          className={cx(paginationButtonStyles, i === currentPage && paginationButtonActiveStyles)}
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

      <div className={tableWrapperStyles}>
        <table className={tableStyles}>
          <thead className={tableHeadStyles}>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={tableHeadCellStyles}>
                  {column.label}
                </th>
              ))}
              {showActions && (onEdit || onDelete) && (
                <th className={tableHeadCellStyles}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className={tableRowStyles}>
                  {columns.map((column) => (
                    <td key={column.key} className={tableCellStyles}>
                      {column.render(item)}
                    </td>
                  ))}
                  {showActions && (onEdit || onDelete) && (
                    <td className={tableCellStyles}>
                      <div className={actionGroupStyles}>
                        {onEdit && (
                          <button
                            onClick={() => (formFields.length > 0 ? openEditForm(item) : onEdit(item))}
                            title="Edit"
                            className={actionButtonStyles}
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
                            className={cx(actionButtonStyles, actionButtonDangerStyles)}
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
                <td
                  colSpan={columns.length + (showActions && (onEdit || onDelete) ? 1 : 0)}
                  className={emptyCellStyles}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paginated && totalPages > 1 && (
        <div className={paginationWrapperStyles}>
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

      <div
        className={cx(modalOverlayStyles, !isDeleteModalOpen && modalOverlayHiddenStyles)}
        onClick={() => setIsDeleteModalOpen(false)}
      >
        <div className={modalContentStyles} onClick={(e) => e.stopPropagation()}>
          <h2 className={modalTitleStyles}>{deleteConfirmTitle}</h2>
          <p className={modalTextStyles}>{deleteConfirmMessage}</p>
          <div className={modalActionsStyles}>
            <button onClick={() => setIsDeleteModalOpen(false)} className={buttonStyles}>
              Cancel
            </button>
            <button onClick={confirmDelete} className={cx(buttonStyles, buttonDangerStyles)}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div
        className={cx(modalOverlayStyles, !isFormModalOpen && modalOverlayHiddenStyles)}
        onClick={() => setIsFormModalOpen(false)}
      >
        <div className={modalContentStyles} onClick={(e) => e.stopPropagation()}>
          <div className={modalHeaderStyles}>
            <h2 className={modalTitleStyles}>
              {formMode === "create" ? "Create New Item" : "Edit Item"}
            </h2>
            <button onClick={() => setIsFormModalOpen(false)} className={closeButtonStyles}>
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleFormSubmit} className={formStyles}>
            {formFields.map((field) => (
              <div key={field.key} className={formGroupStyles}>
                <label htmlFor={field.key} className={labelStyles}>
                  {field.label}
                  {field.required && <span style={{ color: "#dc2626" }}> *</span>}
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
                      handleInputChange(
                        field.key,
                        field.type === "number" ? Number(e.target.value) : e.target.value
                      )
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                    className={inputStyles}
                  />
                )}
              </div>
            ))}
            <div className={modalActionsStyles}>
              <button type="button" onClick={() => setIsFormModalOpen(false)} className={buttonStyles}>
                Cancel
              </button>
              <button type="submit" className={cx(buttonStyles, buttonPrimaryStyles)}>
                {formMode === "create" ? "Create" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}