"use client";

import type React from "react";
import { css } from "@linaria/atomic";
import { useState, useRef, useEffect } from "react";
import { MdClose, MdExpandMore } from "react-icons/md";
import { Allergen } from "@/types/allergens.types";

interface AllergenFilterProps {
  allergens: Allergen[];
  value: string[];
  onChange: (value: string[]) => void;
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
  flex-wrap: wrap;
  

  &:hover {
    border-color: #b8a49c;
    background-color: #f3e9e6;
  }

  &.open {
    border-color: #624944;
  }
`;

const filterContentStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  flex-wrap: wrap;
`;

const placeholderStyles = css`
  color: #a39b96;
`

const pillStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background-color: #f7f7f7;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #2b2b2b;
`;

const pillCloseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #737373;
  transition: color 0.2s;

  &:hover {
    color: #2b2b2b;
  }
`;

const dropdownIconStyles = css`
  display: flex;
  align-items: center;
  color: #737373;
  margin-left: auto;
  transition: transform 0.2s;

  &.open {
    transform: rotate(180deg);
  }
`;

const dropdownMenuStyles = css`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
`;

const dropdownItemStyles = css`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.15s, color 0.15s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f9f9f9;
  }

  &.selected {
    background-color: #2b2b2b;
    color: #ffffff;
    font-weight: 500;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const checkboxStyles = css`
  width: 16px;
  height: 16px;
  border: 2px solid #d4d4d4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  transition: all 0.2s;

  &.checked {
    background: #2b2b2b;
    border-color: #2b2b2b;
  }
`;

const checkmarkStyles = css`
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
`;

export default function AllergenFilter({
  allergens,
  value,
  onChange,
}: AllergenFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedAllergens = allergens.filter((a) => value.includes(String(a.id)));

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== id));
  };

  const handleToggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div ref={containerRef} style={{ position: "relative", flex: 1 }}>
      <div className={`${filterButtonStyles} ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <div className={filterContentStyles}>
          {selectedAllergens.length === 0 ? (
            <span className={placeholderStyles}>Filter by allergens</span>
          ) : (
            selectedAllergens.map((a) => (
              <div key={a.id} className={pillStyles}>
                {a.name}
                <button
                  className={pillCloseStyles}
                  onClick={(e) => handleRemove(String(a.id), e)}
                  aria-label={`Remove ${a.name}`}
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
          {allergens.map((a) => {
            const isSelected = value.includes(String(a.id));
            return (
              <div
                key={a.id}
                className={`${dropdownItemStyles} ${isSelected ? "selected" : ""}`}
                onClick={() => handleToggle(String(a.id))}
              >
                <div className={`${checkboxStyles} ${isSelected ? "checked" : ""}`}>
                  {isSelected && <span className={checkmarkStyles}>✓</span>}
                </div>
                {a.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
