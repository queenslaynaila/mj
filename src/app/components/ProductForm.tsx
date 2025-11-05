"use client"

import { css } from "@linaria/atomic"
import { useState, useEffect } from "react"
import { MdAdd, MdDelete, MdUpload, MdImage } from "react-icons/md"

interface ProductFormProps {
  categories: Array<{ id: number; name: string }>
  allergens: Array<{ id: number; name: string }>
  onSubmit: (product: any) => void
  editingProduct?: any | null
  onCancel?: () => void
}

const cardStyles = css`
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const stepperContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  gap: 12px;
`

const stepBoxStyles = css`
  padding: 8px 16px;
  background-color: #f5f5f5;
  color: #1a1a1a;
  border-radius: 4px;
  cursor: default;
  transition: all 0.2s ease-in-out;
`

const stepBoxActiveStyles = css`
  padding: 8px 16px;
  background-color: #1a1a1a;
  color: #ffffff;
  border-radius: 4px;
  cursor: default;
  transition: all 0.2s ease-in-out;
`

const stepBoxClickableStyles = css`
  padding: 8px 16px;
  background-color: #f5f5f5;
  color: #1a1a1a;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e5e5e5;
  }
`

const stepTextStyles = css`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`

const arrowStyles = css`
  color: #9ca3af;
  font-size: 14px;
`

const stackStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const titleStyles = css`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
`

const labelStyles = css`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #1a1a1a;
`

const inputStyles = css`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #ffffff;
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #1a1a1a;
  }
`

const textareaStyles = css`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #ffffff;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #1a1a1a;
  }
`

const selectStyles = css`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #ffffff;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  cursor: pointer;

  &:focus {
    border-color: #1a1a1a;
  }
`

const groupStyles = css`
  display: flex;
  gap: 16px;
`

const groupGrowStyles = css`
  display: flex;
  gap: 16px;
  flex: 1;
`

const buttonStyles = css`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

const buttonPrimaryStyles = css`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #1a1a1a;
  color: #ffffff;

  &:hover {
    background-color: #333333;
  }
`

const buttonPrimaryDisabledStyles = css`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: not-allowed;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #9ca3af;
  color: #ffffff;
`

const buttonDefaultStyles = css`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #f5f5f5;
  color: #1a1a1a;

  &:hover {
    background-color: #e5e5e5;
  }
`

const buttonLightStyles = css`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  color: #1a1a1a;

  &:hover {
    background-color: #f5f5f5;
  }
`

const buttonSmallStyles = css`
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

const iconButtonStyles = css`
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  color: #ef4444;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fee2e2;
  }
`

const imagePreviewContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const imagePreviewStyles = css`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
`

const imagePlaceholderStyles = css`
  width: 200px;
  height: 200px;
  background-color: #f5f5f5;
  border: 2px dashed #e5e5e5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`

const placeholderTextStyles = css`
  font-size: 14px;
  color: #9ca3af;
`

const toggleGroupStyles = css`
  display: flex;
  justify-content: center;
  gap: 8px;
`

const sectionHeaderStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const sectionTitleStyles = css`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
`

const variantCardStyles = css`
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 12px;
  background-color: #fafafa;
`

const emptyStateStyles = css`
  font-size: 14px;
  color: #9ca3af;
  text-align: center;
  padding: 24px;
`

const dividerStyles = css`
  height: 1px;
  background-color: #e5e5e5;
  border: none;
  margin: 24px 0;
`

const dividerWithLabelStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
`

const dividerLineStyles = css`
  flex: 1;
  height: 1px;
  background-color: #e5e5e5;
`

const dividerLabelStyles = css`
  font-size: 13px;
  color: #666666;
  font-weight: 500;
`

const checkboxContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

const checkboxStyles = css`
  width: 18px;
  height: 18px;
  cursor: pointer;
`

const checkboxLabelStyles = css`
  font-size: 14px;
  color: #1a1a1a;
  cursor: pointer;
`

const footerStyles = css`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`

const multiSelectContainerStyles = css`
  position: relative;
`

const multiSelectDisplayStyles = css`
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #ffffff;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  cursor: pointer;

  &:focus {
    border-color: #1a1a1a;
  }
`

const multiSelectTagStyles = css`
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

const multiSelectDropdownStyles = css`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const multiSelectOptionStyles = css`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
  }
`

const fileInputContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const fileInputWrapperStyles = css`
  position: relative;
  display: inline-block;
  width: 100%;
`

const fileInputHiddenStyles = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

const fileInputButtonStyles = css`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #fafafa;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f5f5f5;
  }
`

const helpTextStyles = css`
  font-size: 12px;
  color: #3b82f6;
  margin-top: 4px;
`

const requiredStyles = css`
  color: #ef4444;
`

const removeTagButtonStyles = css`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
`

const flexContainerStyles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const flexRowStyles = css`
  display: flex;
  gap: 8px;
`

const flexInputStyles = css`
  flex: 1;
`

const narrowInputStyles = css`
  width: 120px;
`

const iconButtonSmallStyles = css`
  padding: 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  color: #ef4444;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fee2e2;
  }
`

const multiSelectPlaceholderStyles = css`
  color: #9ca3af;
`

const multiSelectOptionActiveStyles = css`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.15s ease-in-out;
  background-color: #f5f5f5;

  &:hover {
    background-color: #f5f5f5;
  }
`

export default function ProductMultiStepForm({
  categories,
  allergens,
  onSubmit,
  editingProduct,
  onCancel,
}: ProductFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category_id: "",
    description: "",
    price: 0,
    currency: "EUR",
    image: "",
    allergens: [] as string[],
    variants: [] as Array<{ label: string; price: number }>,
    custom_options: [] as Array<{
      type: string
      label: string
      required: boolean
      options: Array<{ id: string; label: string; price_delta?: number }>
    }>,
    notes: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload")
  const [allergenDropdownOpen, setAllergenDropdownOpen] = useState(false)

  useEffect(() => {
    if (editingProduct) {
      const allergenStrings = Array.isArray(editingProduct.allergens)
        ? editingProduct.allergens.map((a: any) => String(a))
        : []

      setFormData({
        id: editingProduct.id,
        name: editingProduct.name,
        category_id: String(editingProduct.category_id),
        description: editingProduct.description,
        price: editingProduct.price,
        currency: editingProduct.currency || "EUR",
        image: editingProduct.image || "",
        allergens: allergenStrings,
        variants: editingProduct.variants || [],
        custom_options: editingProduct.custom_options || [],
        notes: editingProduct.notes || "",
      })
    }
  }, [editingProduct])

  const allergenOptions = allergens.map((allergen) => ({
    value: String(allergen.id),
    label: allergen.name,
  }))

  const categoryOptions = categories.map((cat) => ({
    value: String(cat.id),
    label: cat.name,
  }))

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = async (file: File | null) => {
    if (!file) {
      setImageFile(null)
      return
    }

    setImageFile(file)
    setUploadingImage(true)

    try {
      const imageUrl = URL.createObjectURL(file)
      handleChange("image", imageUrl)
    } catch (error) {
      console.error("[v0] Image upload failed:", error)
    } finally {
      setUploadingImage(false)
    }
  }

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { label: "", price: 0 }],
    }))
  }

  const updateVariant = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) => (i === index ? { ...v, [field]: value } : v)),
    }))
  }

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }))
  }

  const addCustomOption = () => {
    setFormData((prev) => ({
      ...prev,
      custom_options: [
        ...prev.custom_options,
        { type: "", label: "", required: false, options: [{ id: "", label: "" }] },
      ],
    }))
  }

  const updateCustomOption = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      custom_options: prev.custom_options.map((opt, i) => (i === index ? { ...opt, [field]: value } : opt)),
    }))
  }

  const removeCustomOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      custom_options: prev.custom_options.filter((_, i) => i !== index),
    }))
  }

  const addOptionChoice = (optionIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      custom_options: prev.custom_options.map((opt, i) =>
        i === optionIndex ? { ...opt, options: [...opt.options, { id: "", label: "" }] } : opt,
      ),
    }))
  }

  const updateOptionChoice = (optionIndex: number, choiceIndex: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      custom_options: prev.custom_options.map((opt, i) =>
        i === optionIndex
          ? {
              ...opt,
              options: opt.options.map((choice, j) => (j === choiceIndex ? { ...choice, [field]: value } : choice)),
            }
          : opt,
      ),
    }))
  }

  const removeOptionChoice = (optionIndex: number, choiceIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      custom_options: prev.custom_options.map((opt, i) =>
        i === optionIndex ? { ...opt, options: opt.options.filter((_, j) => j !== choiceIndex) } : opt,
      ),
    }))
  }

  const handleSubmit = () => {
    if (!formData.id && !editingProduct) {
      formData.id = formData.name.toLowerCase().replace(/\s+/g, "-")
    }

    const productData = {
      ...formData,
      allergens: formData.allergens.map((a) => Number(a)),
      category_id: Number(formData.category_id),
    }

    onSubmit(productData)
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const canProceedToNextStep = () => {
    if (editingProduct) return true

    if (currentStep === 0) {
      return (
        formData.name.trim() !== "" &&
        formData.description.trim() !== "" &&
        formData.category_id !== "" &&
        formData.price > 0
      )
    }

    if (currentStep === 1) {
      return formData.image.trim() !== ""
    }

    return true
  }

  const toggleAllergen = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(value)
        ? prev.allergens.filter((a) => a !== value)
        : [...prev.allergens, value],
    }))
  }

  return (
    <div className={cardStyles}>
      <div className={stepperContainerStyles}>
        <div
          className={currentStep === 0 ? stepBoxActiveStyles : editingProduct ? stepBoxClickableStyles : stepBoxStyles}
          onClick={() => editingProduct && setCurrentStep(0)}
        >
          <p className={stepTextStyles}>Step 1: Basic Info</p>
        </div>
        <span className={arrowStyles}>→</span>
        <div
          className={currentStep === 1 ? stepBoxActiveStyles : editingProduct ? stepBoxClickableStyles : stepBoxStyles}
          onClick={() => editingProduct && setCurrentStep(1)}
        >
          <p className={stepTextStyles}>Step 2: Product Image</p>
        </div>
        <span className={arrowStyles}>→</span>
        <div
          className={currentStep === 2 ? stepBoxActiveStyles : editingProduct ? stepBoxClickableStyles : stepBoxStyles}
          onClick={() => editingProduct && setCurrentStep(2)}
        >
          <p className={stepTextStyles}>Step 3: Optional Details</p>
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 0 && (
        <div className={stackStyles}>
          <h4 className={titleStyles}>Basic Product Information</h4>

          <div>
            <label className={labelStyles}>
              Product Name <span className={requiredStyles}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., MJ's American Stack"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>
              Description <span className={requiredStyles}>*</span>
            </label>
            <textarea
              placeholder="Describe your product..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={textareaStyles}
              rows={3}
            />
          </div>

          <div>
            <label className={labelStyles}>
              Category <span className={requiredStyles}>*</span>
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => handleChange("category_id", e.target.value)}
              className={selectStyles}
            >
              <option value="">Select category</option>
              {categoryOptions.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className={groupStyles}>
            <div style={{ flex: 1 }}>
              <label className={labelStyles}>
                Base Price <span className={requiredStyles}>*</span>
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleChange("price", Number.parseFloat(e.target.value) || 0)}
                min={0}
                step={0.5}
                className={inputStyles}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label className={labelStyles}>Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                className={selectStyles}
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className={multiSelectContainerStyles}>
            <label className={labelStyles}>Allergens</label>
            <div className={multiSelectDisplayStyles} onClick={() => setAllergenDropdownOpen(!allergenDropdownOpen)}>
              {formData.allergens.length === 0 ? (
                <span className={multiSelectPlaceholderStyles}>Select allergens</span>
              ) : (
                formData.allergens.map((allergenId) => {
                  const allergen = allergenOptions.find((a) => a.value === allergenId)
                  return (
                    <span key={allergenId} className={multiSelectTagStyles}>
                      {allergen?.label}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleAllergen(allergenId)
                        }}
                        className={removeTagButtonStyles}
                      >
                        ×
                      </button>
                    </span>
                  )
                })
              )}
            </div>
            {allergenDropdownOpen && (
              <div className={multiSelectDropdownStyles}>
                {allergenOptions.map((option) => (
                  <div
                    key={option.value}
                    className={
                      formData.allergens.includes(option.value)
                        ? multiSelectOptionActiveStyles
                        : multiSelectOptionStyles
                    }
                    onClick={() => toggleAllergen(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Product Image */}
      {currentStep === 1 && (
        <div className={stackStyles}>
          <h4 className={titleStyles}>Product Image</h4>

          <div className={imagePreviewContainerStyles}>
            {formData.image ? (
              <img src={formData.image || "/placeholder.svg"} alt="Product preview" className={imagePreviewStyles} />
            ) : (
              <div className={imagePlaceholderStyles}>
                <MdImage size={48} color="#9ca3af" />
                <span className={placeholderTextStyles}>No image yet</span>
              </div>
            )}
          </div>

          <div className={toggleGroupStyles}>
            <button
              className={
                imageInputMode === "upload"
                  ? `${buttonPrimaryStyles} ${buttonSmallStyles}`
                  : `${buttonLightStyles} ${buttonSmallStyles}`
              }
              onClick={() => setImageInputMode("upload")}
            >
              Upload File
            </button>
            <button
              className={
                imageInputMode === "url"
                  ? `${buttonPrimaryStyles} ${buttonSmallStyles}`
                  : `${buttonLightStyles} ${buttonSmallStyles}`
              }
              onClick={() => setImageInputMode("url")}
            >
              Enter URL
            </button>
          </div>

          {imageInputMode === "upload" && (
            <div className={fileInputContainerStyles}>
              <label className={labelStyles}>Upload Image</label>
              <div className={fileInputWrapperStyles}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                  className={fileInputHiddenStyles}
                  id="file-upload"
                  disabled={uploadingImage}
                />
                <label htmlFor="file-upload" className={fileInputButtonStyles}>
                  <MdUpload size={16} />
                  <span>{imageFile ? imageFile.name : "Choose an image file"}</span>
                </label>
              </div>
              {uploadingImage && <p className={helpTextStyles}>Uploading to S3...</p>}
            </div>
          )}

          {imageInputMode === "url" && (
            <div>
              <label className={labelStyles}>Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg or /menu-item.jpg"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className={inputStyles}
              />
            </div>
          )}
        </div>
      )}

      {/* Step 3: Optional Details */}
      {currentStep === 2 && (
        <div className={stackStyles}>
          <h4 className={titleStyles}>Optional Product Details</h4>

          {/* Variants Section */}
          <div className={stackStyles}>
            <div className={sectionHeaderStyles}>
              <span className={sectionTitleStyles}>Product Variants (Optional)</span>
              <button className={`${buttonLightStyles} ${buttonSmallStyles}`} onClick={addVariant}>
                <MdAdd size={16} />
                Add Variant
              </button>
            </div>

            {formData.variants.map((variant, index) => (
              <div key={index} className={variantCardStyles}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div className={flexContainerStyles}>
                    <div>
                      <label className={labelStyles}>
                        Variant Label <span className={requiredStyles}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Label (e.g., With Fries)"
                        value={variant.label}
                        onChange={(e) => updateVariant(index, "label", e.target.value)}
                        className={inputStyles}
                      />
                    </div>
                    <div>
                      <label className={labelStyles}>
                        Variant Price <span className={requiredStyles}>*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Price"
                        value={variant.price}
                        onChange={(e) => updateVariant(index, "price", Number.parseFloat(e.target.value) || 0)}
                        min={0}
                        step={0.5}
                        className={inputStyles}
                      />
                    </div>
                  </div>
                  <button className={iconButtonStyles} onClick={() => removeVariant(index)}>
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>
            ))}

            {formData.variants.length === 0 && (
              <div className={emptyStateStyles}>No variants added. Click "Add Variant" to create one.</div>
            )}
          </div>

          <hr className={dividerStyles} />

          {/* Custom Options Section */}
          <div className={stackStyles}>
            <div className={sectionHeaderStyles}>
              <span className={sectionTitleStyles}>Custom Options (Optional)</span>
              <button className={`${buttonLightStyles} ${buttonSmallStyles}`} onClick={addCustomOption}>
                <MdAdd size={16} />
                Add Option Group
              </button>
            </div>

            {formData.custom_options.map((option, optIndex) => (
              <div
                key={optIndex}
                style={{
                  border: "1px solid #e5e5e5",
                  borderRadius: "6px",
                  padding: "16px",
                  backgroundColor: "#fafafa",
                }}
              >
                <div className={stackStyles}>
                  <div className={sectionHeaderStyles}>
                    <span className={sectionTitleStyles}>Option Group {optIndex + 1}</span>
                    <button className={iconButtonSmallStyles} onClick={() => removeCustomOption(optIndex)}>
                      <MdDelete size={14} />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Type (e.g., cooking-style)"
                    value={option.type}
                    onChange={(e) => updateCustomOption(optIndex, "type", e.target.value)}
                    className={inputStyles}
                  />
                  <input
                    type="text"
                    placeholder="Label (e.g., Cooking Style)"
                    value={option.label}
                    onChange={(e) => updateCustomOption(optIndex, "label", e.target.value)}
                    className={inputStyles}
                  />

                  <div className={checkboxContainerStyles}>
                    <input
                      type="checkbox"
                      id={`required-${optIndex}`}
                      checked={option.required}
                      onChange={(e) => updateCustomOption(optIndex, "required", e.target.checked)}
                      className={checkboxStyles}
                    />
                    <label htmlFor={`required-${optIndex}`} className={checkboxLabelStyles}>
                      Required
                    </label>
                  </div>

                  <div className={dividerWithLabelStyles}>
                    <div className={dividerLineStyles} />
                    <span className={dividerLabelStyles}>Choices</span>
                    <div className={dividerLineStyles} />
                  </div>

                  {option.options.map((choice, choiceIndex) => (
                    <div key={choiceIndex} className={flexRowStyles}>
                      <input
                        type="text"
                        placeholder="Choice Label"
                        value={choice.label}
                        onChange={(e) => updateOptionChoice(optIndex, choiceIndex, "label", e.target.value)}
                        className={`${inputStyles} ${flexInputStyles}`}
                      />
                      <input
                        type="number"
                        placeholder="Price Delta"
                        value={choice.price_delta || 0}
                        onChange={(e) =>
                          updateOptionChoice(
                            optIndex,
                            choiceIndex,
                            "price_delta",
                            Number.parseFloat(e.target.value) || 0,
                          )
                        }
                        className={`${inputStyles} ${narrowInputStyles}`}
                      />
                      <button
                        className={iconButtonStyles}
                        onClick={() => removeOptionChoice(optIndex, choiceIndex)}
                        disabled={option.options.length === 1}
                      >
                        <MdDelete size={14} />
                      </button>
                    </div>
                  ))}

                  <button
                    className={`${buttonLightStyles} ${buttonSmallStyles}`}
                    onClick={() => addOptionChoice(optIndex)}
                  >
                    Add Choice
                  </button>
                </div>
              </div>
            ))}

            {formData.custom_options.length === 0 && (
              <div className={emptyStateStyles}>No custom options added. Click "Add Option Group" to create one.</div>
            )}
          </div>

          <hr className={dividerStyles} />

          <div>
            <label className={labelStyles}>Additional Notes (Optional)</label>
            <textarea
              placeholder="e.g., Available in gluten-free bun..."
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className={textareaStyles}
              rows={4}
            />
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className={footerStyles}>
        <div className={groupStyles}>
          {onCancel && (
            <button className={buttonDefaultStyles} onClick={onCancel}>
              Cancel
            </button>
          )}
          {currentStep > 0 && (
            <button className={buttonDefaultStyles} onClick={prevStep}>
              Back
            </button>
          )}
        </div>
        <div className={groupStyles}>
          {currentStep < 2 ? (
            <button
              onClick={nextStep}
              disabled={!canProceedToNextStep()}
              className={canProceedToNextStep() ? buttonPrimaryStyles : buttonPrimaryDisabledStyles}
            >
              {currentStep === 0 ? "Next: Product Image" : "Next: Optional Details"}
            </button>
          ) : (
            <button onClick={handleSubmit} className={buttonPrimaryStyles}>
              {editingProduct ? "Update Product" : "Create Product"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
