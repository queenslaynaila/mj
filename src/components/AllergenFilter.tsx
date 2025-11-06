"use client"

import type React from "react"

import { css } from "@linaria/atomic"
import { useState, useRef, useEffect } from "react"
import { MdClose, MdExpandMore } from "react-icons/md"

interface AllergenFilterProps {
  allergens: { id: number; name: string }[]
  value: string[]
  onChange: (value: string[]) => void
}

const filterButtonStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d4d4d4;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
  flex-wrap: wrap;

  &:hover {
    border-color: #1a1a1a;
  }

  &.open {
    border-color: #1a1a1a;
  }
`

const filterContentStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  flex-wrap: wrap;
`

const placeholderStyles = css`
  color: #999;
`

const pillStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #1a1a1a;
`

const pillCloseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #1a1a1a;
  }
`

const dropdownIconStyles = css`
  display: flex;
  align-items: center;
  color: #666;
  margin-left: auto;
  transition: transform 0.2s;

  &.open {
    transform: rotate(180deg);
  }
`

const dropdownMenuStyles = css`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
`

const dropdownItemStyles = css`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.15s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f5f5f5;
  }

  &.selected {
    background-color: #1a1a1a;
    color: white;
    font-weight: 500;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`

const checkboxStyles = css`
  width: 16px;
  height: 16px;
  border: 2px solid #d4d4d4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  transition: all 0.2s;

  &.checked {
    background: #1a1a1a;
    border-color: #1a1a1a;
  }
`

const checkmarkStyles = css`
  color: white;
  font-size: 12px;
  font-weight: bold;
`

export default function AllergenFilter({ allergens, value, onChange }: AllergenFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedAllergens = allergens.filter((allergen) => value.includes(String(allergen.id)))

  const handleRemove = (allergenId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(value.filter((id) => id !== allergenId))
  }

  const handleToggle = (allergenId: string) => {
    if (value.includes(allergenId)) {
      onChange(value.filter((id) => id !== allergenId))
    } else {
      onChange([...value, allergenId])
    }
  }

  return (
    <div ref={containerRef} style={{ position: "relative", flex: 1 }}>
      <div className={`${filterButtonStyles} ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <div className={filterContentStyles}>
          {selectedAllergens.length === 0 ? (
            <span className={placeholderStyles}>Filter by allergens</span>
          ) : (
            selectedAllergens.map((allergen) => (
              <div key={allergen.id} className={pillStyles}>
                {allergen.name}
                <button
                  className={pillCloseStyles}
                  onClick={(e) => handleRemove(String(allergen.id), e)}
                  aria-label={`Remove ${allergen.name}`}
                >
                  <MdClose size={14} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className={`${dropdownIconStyles} ${isOpen ? "open" : ""}`}>
          <MdExpandMore size={20} />
        </div>
      </div>

      {isOpen && (
        <div className={dropdownMenuStyles}>
          {allergens.map((allergen) => {
            const isSelected = value.includes(String(allergen.id))
            return (
              <div
                key={allergen.id}
                className={`${dropdownItemStyles} ${isSelected ? "selected" : ""}`}
                onClick={() => handleToggle(String(allergen.id))}
              >
                <div className={`${checkboxStyles} ${isSelected ? "checked" : ""}`}>
                  {isSelected && <span className={checkmarkStyles}>✓</span>}
                </div>
                {allergen.name}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
