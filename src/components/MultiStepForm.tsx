"use client"

import type { Allergen } from "@/types/allergens.types"
import type { Category } from "@/types/categories.types"
import type { CustomOption, MenuItem, Variant, AllergenInfo, Option } from "@/types/menu.types"
import { css } from "@linaria/atomic"
import { useState, useEffect } from "react"
import { MdAdd, MdDelete, MdUpload, MdImage, MdExpandMore, MdExpandLess } from "react-icons/md"

interface ProductFormProps {
  categories: Category[]
  allergens: Allergen[]
  onSubmit: (product: Omit<MenuItem, "createdAt" | "updatedAt">) => void
  editingProduct?: MenuItem | null
  onCancel?: () => void
}

const cardStyles = css`
  background-color: #FFFDFE;
  border: 1px solid #E3E2E3;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(100, 72, 62, 0.1);
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
  background-color: #F0EAE5;
  color: #4C4A48;
  border-radius: 4px;
  cursor: default;
  transition: all 0.2s ease-in-out;
`

const stepBoxActiveStyles = css`
  padding: 8px 16px;
  background-color: #64483E;
  color: #FFFDFE;
  border-radius: 4px;
  cursor: default;
  transition: all 0.2s ease-in-out;
`

const stepBoxClickableStyles = css`
  padding: 8px 16px;
  background-color: #F0EAE5;
  color: #4C4A48;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #DED4D1;
  }
`

const stepTextStyles = css`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`

const arrowStyles = css`
  color: #DED4D1;
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
  color: #4C4A48;
  margin: 0 0 16px 0;
`

const labelStyles = css`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #4C4A48;
`

const inputStyles = css`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #E3E2E3;
  border-radius: 4px;
  background-color: #FFFDFE;
  color: #4C4A48;
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #64483E;
  }
`

const textareaStyles = css`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #E3E2E3;
  border-radius: 4px;
  background-color: #FFFDFE;
  color: #4C4A48;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #64483E;
  }
`

const selectStyles = css`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #E3E2E3;
  border-radius: 4px;
  background-color: #FFFDFE;
  color: #4C4A48;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  cursor: pointer;

  &:focus {
    border-color: #64483E;
  }
`

const groupStyles = css`
  display: flex;
  gap: 16px;
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
  background-color: #64483E;
  color: #FFFDFE;

  &:hover {
    background-color: #6F4E35;
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
  background-color: #DED4D1;
  color: #FFFDFE;
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
  background-color: #F0EAE5;
  color: #4C4A48;

  &:hover {
    background-color: #DED4D1;
  }
`

const buttonLightStyles = css`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #E3E2E3;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  color: #4C4A48;

  &:hover {
    background-color: #F8F3F2;
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
  color: #b03b2e;;
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
  background-color: #F8F3F2;
  border: 2px dashed #E3E2E3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`

const placeholderTextStyles = css`
  font-size: 14px;
  color: #DED4D1;
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
  color: #4C4A48;
`

const variantTableStyles = css`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  overflow: hidden;
`

const variantTableHeaderStyles = css`
  background-color: #F0EAE5;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #E3E2E3;
  color: #4C4A48;
`

const variantTableCellStyles = css`
  padding: 12px;
  border-bottom: 1px solid #E3E2E3;
  vertical-align: middle;
`

const variantTableRowStyles = css`
  &:last-child td {
    border-bottom: none;
  }

  &:hover {
    background-color: #F8F3F2;
  }
`

const variantInputTableStyles = css`
  width: 100%;
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #E3E2E3;
  border-radius: 4px;
  background-color: #FFFDFE;
  color: #4C4A48;
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #64483E;
  }
`

const customOptionMetaStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: #FFFDFE;
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  margin-bottom: 20px;
`

const choicesSectionStyles = css`
  background-color: #FFFDFE;
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  padding: 16px;
`

const choicesSectionHeaderStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #E3E2E3;
`

const choicesSectionTitleStyles = css`
  font-size: 14px;
  font-weight: 600;
  color: #4C4A48;
  margin: 0;
`

const choiceTableStyles = css`
  width: 100%;
  border-collapse: collapse;
`

const choiceTableHeaderStyles = css`
  background-color: #F0EAE5;
  font-weight: 600;
  font-size: 13px;
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid #E3E2E3;
  color: #4C4A48;
`

const choiceTableCellStyles = css`
  padding: 10px 12px;
  border-bottom: 1px solid #E3E2E3;
  vertical-align: middle;
`

const choiceTableRowStyles = css`
  &:last-child td {
    border-bottom: none;
  }

  &:hover {
    background-color: #F8F3F2;
  }
`

const choiceInputTableStyles = css`
  width: 100%;
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #E3E2E3;
  border-radius: 4px;
  background-color: #FFFDFE;
  color: #4C4A48;
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #64483E;
  }
`

const priceDeltaHelpTextStyles = css`
  font-size: 11px;
  color: #4C4A48;
  opacity: 0.7;
  margin-top: 4px;
`

const dividerStyles = css`
  height: 1px;
  background-color: #E3E2E3;
  border: none;
  margin: 24px 0;
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
  color: #4C4A48;
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
  border: 1px solid #E3E2E3;
  border-radius: 4px;
  background-color: #FFFDFE;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  cursor: pointer;

  &:focus {
    border-color: #64483E;
  }
`

const multiSelectTagStyles = css`
  background-color: #64483E;
  color: #FFFDFE;
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
  background-color: #FFFDFE;
  border: 1px solid #E3E2E3;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(100, 72, 62, 0.1);
`

const multiSelectOptionStyles = css`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #4C4A48;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #F8F3F2;
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
  border: 1px solid #E3E2E3;
  border-radius: 4px;
  background-color: #F8F3F2;
  color: #4C4A48;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #F0EAE5;
  }
`

const helpTextStyles = css`
  font-size: 12px;
  color: #64483E;
  margin-top: 4px;
`

const requiredStyles = css`
  color: #ef4444;
`

const removeTagButtonStyles = css`
  background: none;
  border: none;
  color: #FFFDFE;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
`

const multiSelectPlaceholderStyles = css`
  color: #DED4D1;
`

const multiSelectOptionActiveStyles = css`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #4C4A48;
  transition: background-color 0.15s ease-in-out;
  background-color: #F0EAE5;

  &:hover {
    background-color: #F0EAE5;
  }
`

const emptyStateStyles = css`
  color: #4C4A48;
  opacity: 0.7;
  text-align: center;
  margin-top: 16px;
`

const customOptionAccordionStyles = css`
  border: 1px solid #E3E2E3;
  border-radius: 6px;
  background-color: #FFFDFE;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #DED4D1;
    box-shadow: 0 2px 4px rgba(100, 72, 62, 0.05);
  }
`

const customOptionAccordionHeaderStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background-color: #F8F3F2;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border-bottom: 1px solid #E3E2E3;

  &:hover {
    background-color: #F0EAE5;
  }
`

const customOptionAccordionHeaderExpandedStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background-color: #64483E;
  color: #FFFDFE;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border-bottom: 1px solid #64483E;

  &:hover {
    background-color: #6F4E35;
  }
`

const customOptionSummaryStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`

const customOptionLabelTextStyles = css`
  font-size: 15px;
  font-weight: 600;
  color: #4C4A48;
  margin: 0;
`

const customOptionLabelTextExpandedStyles = css`
  font-size: 15px;
  font-weight: 600;
  color: #FFFDFE;
  margin: 0;
`

const customOptionMetaTextStyles = css`
  font-size: 13px;
  color: #4C4A48;
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 8px;
`

const customOptionMetaTextExpandedStyles = css`
  font-size: 13px;
  color: #F0EAE5;
  display: flex;
  align-items: center;
  gap: 8px;
`

const customOptionBadgeSmallStyles = css`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background-color: #ef4444;
  color: #FFFDFE;
  font-size: 10px;
  font-weight: 600;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const customOptionActionsStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

const iconButtonAccordionStyles = css`
  padding: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  color: #b03b2e;;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #DED4D1;
  }
`

const iconButtonAccordionExpandedStyles = css`
  padding: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  color: #FFFDFE;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 253, 254, 0.1);
  }
`

const customOptionContentStyles = css`
  padding: 20px;
  background-color: #F8F3F2;
`

export default function ProductMultiStepForm({
  categories,
  allergens,
  onSubmit,
  editingProduct,
  onCancel,
}: ProductFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Omit<MenuItem, "createdAt" | "updatedAt">>({
    id: "",
    name: "",
    categoryId: "",
    description: "",
    price: 0,
    currency: "EUR",
    image: "",
    allergens: [] as AllergenInfo[],
    variants: [] as Variant[],
    customOptions: [] as CustomOption[],
    notes: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload")
  const [allergenDropdownOpen, setAllergenDropdownOpen] = useState(false)
  const [expandedOptions, setExpandedOptions] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        id: editingProduct.id,
        name: editingProduct.name,
        categoryId: String(editingProduct.categoryId),
        description: editingProduct.description,
        price: editingProduct.price,
        currency: editingProduct.currency || "EUR",
        image: editingProduct.image || "",
        allergens: editingProduct.allergens || [], 
        variants: editingProduct.variants || [],
        customOptions: editingProduct.customOptions || [],
        notes: editingProduct.notes || "",
      })
    }
  }, [editingProduct])

  const allergenOptions = allergens.map((allergen) => ({
    value: String(allergen.id),
    label: allergen.name,
    code: allergen.code,
  }))

  const categoryOptions = categories.map((cat) => ({
    value: String(cat.id),
    label: cat.name,
  }))

  
   const handleChange = <K extends keyof Omit<MenuItem, "createdAt" | "updatedAt">>(
    field: K,
    value: Omit<MenuItem, "createdAt" | "updatedAt">[K],
  ) => {
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
      variants: [...prev.variants, { id: "", label: "", price: 0 }],
    }))
  }

  const updateVariant = <K extends keyof Variant>(index: number, field: K, value: Variant[K]) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) => {
        if (i === index) {
          if (field === "label") {
            const derivedId = (value as string)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
            return { ...v, label: value as string, id: derivedId }
          }
          return { ...v, [field]: value }
        }
        return v
      }),
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
      customOptions: [
        ...prev.customOptions,
        { type: "", label: "", required: false, options: [{ id: "", label: "" }] },
      ],
    }))
  }

   const updateCustomOption = <K extends keyof CustomOption>(index: number, field: K, value: CustomOption[K]) => {
    setFormData((prev) => ({
      ...prev,
      customOptions: prev.customOptions.map((opt, i) => {
        if (i === index) {
          if (field === "label") {
            const derivedType = (value as string)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
            return { ...opt, label: value as string, type: derivedType }
          }
          return { ...opt, [field]: value }
        }
        return opt
      }),
    }))
  }

  const removeCustomOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customOptions: prev.customOptions.filter((_, i) => i !== index),
    }))
  }

  const addOptionChoice = (optionIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      customOptions: prev.customOptions.map((opt, i) =>
        i === optionIndex ? { ...opt, options: [...opt.options, { id: "", label: "" }] } : opt,
      ),
    }))
  }


   const updateOptionChoice = <K extends keyof Option>(
    optionIndex: number,
    choiceIndex: number,
    field: K,
    value: Option[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      customOptions: prev.customOptions.map((opt, i) =>
        i === optionIndex
          ? {
              ...opt,
              options: opt.options.map((choice, j) => {
                if (j === choiceIndex) {
                  if (field === "label") {
                    const derivedId = (value as string)
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")
                    return { ...choice, label: value as string, id: derivedId }
                  }
                  return { ...choice, [field]: value }
                }
                return choice
              }),
            }
          : opt,
      ),
    }))
  }

  const removeOptionChoice = (optionIndex: number, choiceIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      customOptions: prev.customOptions.map((opt, i) =>
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
      allergens: formData.allergens,  
      categoryId: formData.categoryId,
    }

    console.log("[v0] Submitting product data:", productData)
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
        formData.categoryId !== "" &&
        formData.price > 0
      )
    }

    if (currentStep === 1) {
      return formData.image.trim() !== ""
    }

    return true
  }

  const toggleAllergen = (allergenId: string) => {
    setFormData((prev) => {
      const isSelected = prev.allergens.some((a) => a.id === allergenId)

      if (isSelected) {
        return {
          ...prev,
          allergens: prev.allergens.filter((a) => a.id !== allergenId),
        }
      } else {
        const fullAllergen = allergens.find((a) => String(a.id) === allergenId)
        if (fullAllergen) {
          return {
            ...prev,
            allergens: [
              ...prev.allergens,
              {
                id: fullAllergen.id,
                code: fullAllergen.code,
                name: fullAllergen.name,
              },
            ],
          }
        }
        return prev
      }
    })
  }

  const toggleOptionExpansion = (index: number) => {
    setExpandedOptions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
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
              value={formData.categoryId}
              onChange={(e) => handleChange("categoryId", e.target.value)}
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
                formData.allergens.map((allergen) => (
                  <span key={allergen.id} className={multiSelectTagStyles}>
                    {allergen.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleAllergen(allergen.id)
                      }}
                      className={removeTagButtonStyles}
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>
            {allergenDropdownOpen && (
              <div className={multiSelectDropdownStyles}>
                {allergenOptions.map((option) => (
                  <div
                    key={option.value}
                    className={
                      formData.allergens.some((a) => a.id === option.value)
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
          <h4 className={titleStyles}>Custom Options</h4>

          {/* Variants Section */}
          <div className={stackStyles}>
            <div className={sectionHeaderStyles}>
              <span className={sectionTitleStyles}>Product Variants (Optional)</span>
              <button className={`${buttonLightStyles} ${buttonSmallStyles}`} onClick={addVariant}>
                <MdAdd size={16} />
                Add Variant
              </button>
            </div>

            {formData.variants.length > 0 ? (
              <table className={variantTableStyles}>
                <thead>
                  <tr>
                    <th className={variantTableHeaderStyles} style={{ width: "50%" }}>
                      Variant Label
                    </th>
                    <th className={variantTableHeaderStyles} style={{ width: "35%" }}>
                      Price
                    </th>
                    <th className={variantTableHeaderStyles} style={{ width: "15%", textAlign: "center" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.variants.map((variant, index) => (
                    <tr key={index} className={variantTableRowStyles}>
                      <td className={variantTableCellStyles}>
                        <input
                          type="text"
                          placeholder='e.g., 12", 16", Gluten-free'
                          value={variant.label}
                          onChange={(e) => updateVariant(index, "label", e.target.value)}
                          className={variantInputTableStyles}
                        />
                      </td>
                      <td className={variantTableCellStyles}>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={variant.price || ""}
                          onChange={(e) => updateVariant(index, "price", Number.parseFloat(e.target.value) || 0)}
                          min={0}
                          step={0.5}
                          className={variantInputTableStyles}
                        />
                      </td>
                      <td className={variantTableCellStyles} style={{ textAlign: "center" }}>
                        <button className={iconButtonStyles} onClick={() => removeVariant(index)}>
                          <MdDelete size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={emptyStateStyles}>No variants added. Click &quot;Add Variant&quot; to create one.</div>
            )}
          </div>

          <hr className={dividerStyles} />

          <div className={stackStyles}>
            <div className={sectionHeaderStyles}>
              <span className={sectionTitleStyles}>Custom Options (Optional)</span>
              <button className={`${buttonLightStyles} ${buttonSmallStyles}`} onClick={addCustomOption}>
                <MdAdd size={16} />
                Add Option Group
              </button>
            </div>

            {formData.customOptions.map((option, optIndex) => {
              const isExpanded = expandedOptions.has(optIndex)
              const choiceCount = option.options.length

              return (
                <div key={optIndex} className={customOptionAccordionStyles}>
                  <div
                    className={
                      isExpanded ? customOptionAccordionHeaderExpandedStyles : customOptionAccordionHeaderStyles
                    }
                    onClick={() => toggleOptionExpansion(optIndex)}
                  >
                    <div className={customOptionSummaryStyles}>
                      <h5 className={isExpanded ? customOptionLabelTextExpandedStyles : customOptionLabelTextStyles}>
                        {option.label || `Option Group ${optIndex + 1}`}
                      </h5>
                      <div className={isExpanded ? customOptionMetaTextExpandedStyles : customOptionMetaTextStyles}>
                        {option.type && <span>Type: {option.type}</span>}
                        <span>•</span>
                        <span>
                          {choiceCount} {choiceCount === 1 ? "choice" : "choices"}
                        </span>
                        {option.required && (
                          <>
                            <span>•</span>
                            <span className={customOptionBadgeSmallStyles}>Required</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className={customOptionActionsStyles}>
                      <button
                        className={isExpanded ? iconButtonAccordionExpandedStyles : iconButtonAccordionStyles}
                        onClick={(e) => {
                          e.stopPropagation()
                          removeCustomOption(optIndex)
                        }}
                      >
                        <MdDelete size={18} />
                      </button>
                      <div className={isExpanded ? iconButtonAccordionExpandedStyles : iconButtonAccordionStyles}>
                        {isExpanded ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Content - Only shown when expanded */}
                  {isExpanded && (
                    <div className={customOptionContentStyles}>
                      {/* Meta Information Section */}
                      <div className={customOptionMetaStyles}>
                        <div>
                          <label className={labelStyles}>Display Label</label>
                          <input
                            type="text"
                            placeholder="e.g., Wing Flavor, Portion Size, Crust Type"
                            value={option.label}
                            onChange={(e) => updateCustomOption(optIndex, "label", e.target.value)}
                            className={inputStyles}
                          />
                          <p className={priceDeltaHelpTextStyles}>Customer-facing label shown in the menu</p>
                        </div>

                        <div>
                          <label className={labelStyles}>Option Type (Auto-generated)</label>
                          <input
                            type="text"
                            placeholder="Auto-filled from display label"
                            value={option.type}
                            readOnly
                            className={inputStyles}
                            style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
                          />
                          <p className={priceDeltaHelpTextStyles}>
                            Automatically generated from display label (lowercase, hyphenated)
                          </p>
                        </div>

                        <div className={checkboxContainerStyles}>
                          <input
                            type="checkbox"
                            id={`required-${optIndex}`}
                            checked={option.required}
                            onChange={(e) => updateCustomOption(optIndex, "required", e.target.checked)}
                            className={checkboxStyles}
                          />
                          <label htmlFor={`required-${optIndex}`} className={checkboxLabelStyles}>
                            Customer must select an option from this group
                          </label>
                        </div>
                      </div>

                      {/* Choices Section */}
                      <div className={choicesSectionStyles}>
                        <div className={choicesSectionHeaderStyles}>
                          <h6 className={choicesSectionTitleStyles}>
                            Available Choices for &quot;{option.label || "this option"}&quot;
                          </h6>
                          <button
                            className={`${buttonLightStyles} ${buttonSmallStyles}`}
                            onClick={() => addOptionChoice(optIndex)}
                          >
                            <MdAdd size={16} />
                            Add Choice
                          </button>
                        </div>

                        {option.options.length > 0 ? (
                          <table className={choiceTableStyles}>
                            <thead>
                              <tr>
                                <th className={choiceTableHeaderStyles} style={{ width: "50%" }}>
                                  Choice Label
                                </th>
                                <th className={choiceTableHeaderStyles} style={{ width: "35%" }}>
                                  Price Adjustment
                                </th>
                                <th className={choiceTableHeaderStyles} style={{ width: "15%", textAlign: "center" }}>
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {option.options.map((choice, choiceIndex) => (
                                <tr key={choiceIndex} className={choiceTableRowStyles}>
                                  <td className={choiceTableCellStyles}>
                                    <input
                                      type="text"
                                      placeholder="e.g., Classic Buffalo, 6 pieces"
                                      value={choice.label}
                                      onChange={(e) =>
                                        updateOptionChoice(optIndex, choiceIndex, "label", e.target.value)
                                      }
                                      className={choiceInputTableStyles}
                                    />
                                  </td>
                                  <td className={choiceTableCellStyles}>
                                    <input
                                      type="number"
                                      placeholder="0 (no change)"
                                      value={choice.priceDelta || ""}
                                      onChange={(e) =>
                                        updateOptionChoice(
                                          optIndex,
                                          choiceIndex,
                                          "priceDelta",
                                          Number.parseFloat(e.target.value) || undefined,
                                        )
                                      }
                                      className={choiceInputTableStyles}
                                      step={0.5}
                                    />
                                    <p className={priceDeltaHelpTextStyles}>
                                      Use negative for discount (e.g., -4), positive for extra cost (e.g., +1)
                                    </p>
                                  </td>
                                  <td className={choiceTableCellStyles} style={{ textAlign: "center" }}>
                                    <button
                                      className={iconButtonStyles}
                                      onClick={() => removeOptionChoice(optIndex, choiceIndex)}
                                      disabled={option.options.length === 1}
                                      style={{ opacity: option.options.length === 1 ? 0.5 : 1 }}
                                    >
                                      <MdDelete size={18} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className={emptyStateStyles}>No choices added yet.</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {formData.customOptions.length === 0 && (
              <div className={emptyStateStyles}>No custom options added. Click &quot;Add Option Group&quot; to create one.</div>
            )}
          </div>

          <hr className={dividerStyles} />

          <div>
            <label className={labelStyles}>Additional Notes (Optional)</label>
            <textarea
              placeholder="e.g., Available in gluten-free bun..."
              value={formData.notes ?? ""}
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
              {editingProduct ? "Update" : "Create "}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
