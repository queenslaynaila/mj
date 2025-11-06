"use client"

import type React from "react"
import { css } from "@linaria/atomic"
import { useState, useRef, useEffect } from "react"
import { MdClose, MdExpandMore } from "react-icons/md"
import { Category } from "@/types/categories.types"

interface CategoryFilterProps {
  categories: Category[],
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
  border: 1px solid #d4d4d4;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
  justify-content: space-between;

  &:hover {
    border-color: #1a1a1a;
  }

  &.open {
    border-color: #1a1a1a;
  }
`

const filterLabelStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`

const placeholderStyles = css`
  color: #999;
`

const selectedValueStyles = css`
  color: #1a1a1a;
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
