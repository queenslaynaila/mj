"use client"

import type React from "react"
import { css } from "@linaria/atomic"
import { useState, useRef, useEffect } from "react"
import { MdClose, MdExpandMore } from "react-icons/md"
import { Category } from "@/types/categories.types"

interface CategoryFilterProps {
  categories: Category[]
  value: string | null
  onChange: (value: string | null) => void
}

const filterButtonStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d8cfc9;
  background: #f8f3f2;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
  justify-content: space-between;

  &:hover {
    border-color: #b8a49c;
    background-color: #f3e9e6;
  }

  &.open {
    border-color: #624944;
  }
`

const filterLabelStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`

const placeholderStyles = css`
  color: #a39b96;
`

const selectedValueStyles = css`
  color:red;
  font-weight: 500;
`

const clearButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #937066;
  transition: color 0.2s;

  &:hover {
    color: #624944;
  }
`

const dropdownIconStyles = css`
  display: flex;
  align-items: center;
  color: #937066;
  transition: transform 0.2s, color 0.2s;

  &.open {
    transform: rotate(180deg);
    color: #624944;
  }
`

const dropdownMenuStyles = css`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fffdfc;
  border: 1px solid #e2d9d5;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(98, 73, 65, 0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
`

const dropdownItemStyles = css`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #4c4a48;
  transition: background-color 0.15s, color 0.15s;

  &:hover {
    background-color: #f8f3f2;
    color: #1f1e1d;
  }

  &.selected {
    background-color: #624944;
    color: #ffffff;
    font-weight: 500;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`

export default function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
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

  const selectedCategory = categories.find((cat) => String(cat.id) === value)

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
  }

  return (
    <div ref={containerRef} style={{ position: "relative", flex: 1 }}>
      <div className={`${filterButtonStyles} ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <div className={filterLabelStyles}>
          {selectedCategory ? (
            <span className={selectedValueStyles}>{selectedCategory.name}</span>
          ) : (
            <span className={placeholderStyles}>All Categories</span>
          )}
        </div>
        {selectedCategory && (
          <button className={clearButtonStyles} onClick={handleClear} aria-label="Clear category filter">
            <MdClose size={16} />
          </button>
        )}
        <div className={`${dropdownIconStyles} ${isOpen ? "open" : ""}`}>
          <MdExpandMore size={20} />
        </div>
      </div>

      {isOpen && (
        <div className={dropdownMenuStyles}>
          <div
            className={`${dropdownItemStyles} ${!value ? "selected" : ""}`}
            onClick={() => {
              onChange(null)
              setIsOpen(false)
            }}
          >
            All Categories
          </div>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`${dropdownItemStyles} ${String(cat.id) === value ? "selected" : ""}`}
              onClick={() => {
                onChange(String(cat.id))
                setIsOpen(false)
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
