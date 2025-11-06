"use client"

import { useState, useMemo } from "react"
import { css } from "@linaria/core"
import { FaSearch, FaClock, FaChevronDown, FaChevronRight } from "react-icons/fa"
import type { Order, OrderStatus } from "@/types/order.types"

// Mock order data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    cartId: "CART-001",
    status: "processing",
    total: { amount: 45.5, currency: "USD" },
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1-555-0123",
    },
    pickupTime: "2025-11-06T18:30:00.000Z",
    cart: {
      id: "CART-001",
      status: "active",
      items: [
        {
          id: "ITEM-001",
          cartId: "CART-001",
          menuItemId: "MENU-001",
          variantId: "12inch",
          quantity: 2,
          selectedOptions: [{ optionType: "sauce", choiceId: "marinara" }],
          addonItems: [],
          menuItem: {
            id: "MENU-001",
            categoryId: "1",
            name: "Margherita Pizza",
            description: "Classic pizza with tomato and mozzarella",
            price: 13,
            currency: "USD",
            allergens: [1, 2],
            variants: [
              { id: "12inch", label: '12"', price: 13 },
              { id: "16inch", label: '16"', price: 17 },
            ],
            customOptions: [],
          },
        },
        {
          id: "ITEM-002",
          cartId: "CART-001",
          menuItemId: "MENU-002",
          quantity: 1,
          selectedOptions: [],
          addonItems: [],
          menuItem: {
            id: "MENU-002",
            categoryId: "2",
            name: "Caesar Salad",
            description: "Fresh romaine with caesar dressing",
            price: 9.5,
            currency: "USD",
            allergens: [2],
            variants: [],
            customOptions: [],
          },
        },
      ],
    },
  },
  {
    id: "ORD-002",
    cartId: "CART-002",
    status: "preparing",
    total: { amount: 32.0, currency: "USD" },
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1-555-0456",
    },
    pickupTime: "2025-11-06T19:00:00.000Z",
    cart: {
      id: "CART-002",
      status: "active",
      items: [
        {
          id: "ITEM-003",
          cartId: "CART-002",
          menuItemId: "MENU-003",
          variantId: "12pc",
          quantity: 1,
          selectedOptions: [{ optionType: "wing-sauce", choiceId: "buffalo" }],
          addonItems: [],
          menuItem: {
            id: "MENU-003",
            categoryId: "3",
            name: "Buffalo Wings",
            description: "Crispy chicken wings",
            price: 16,
            currency: "USD",
            allergens: [],
            variants: [
              { id: "6pc", label: "6 pieces", priceDelta: -4 },
              { id: "12pc", label: "12 pieces", price: 16 },
            ],
            customOptions: [
              {
                type: "wing-sauce",
                label: "Wing Flavor",
                required: true,
                options: [
                  { id: "buffalo", label: "Classic Buffalo" },
                  { id: "bbq", label: "BBQ" },
                ],
              },
            ],
          },
        },
        {
          id: "ITEM-004",
          cartId: "CART-002",
          menuItemId: "MENU-004",
          quantity: 2,
          selectedOptions: [],
          addonItems: [],
          menuItem: {
            id: "MENU-004",
            categoryId: "4",
            name: "Soft Drink",
            description: "Refreshing beverage",
            price: 3,
            currency: "USD",
            allergens: [],
            variants: [],
            customOptions: [],
          },
        },
      ],
    },
  },
  {
    id: "ORD-003",
    cartId: "CART-003",
    status: "ready-for-collection",
    total: { amount: 28.5, currency: "USD" },
    customer: {
      name: "Michael Brown",
      email: "m.brown@example.com",
      phone: "+1-555-0789",
    },
    pickupTime: "2025-11-06T18:45:00.000Z",
    cart: {
      id: "CART-003",
      status: "active",
      items: [
        {
          id: "ITEM-005",
          cartId: "CART-003",
          menuItemId: "MENU-005",
          quantity: 1,
          selectedOptions: [],
          addonItems: [],
          menuItem: {
            id: "MENU-005",
            categoryId: "5",
            name: "Cheeseburger",
            description: "Juicy beef burger with cheese",
            price: 12.5,
            currency: "USD",
            allergens: [1, 2],
            variants: [],
            customOptions: [],
          },
        },
        {
          id: "ITEM-006",
          cartId: "CART-003",
          menuItemId: "MENU-006",
          quantity: 1,
          selectedOptions: [],
          addonItems: [],
          menuItem: {
            id: "MENU-006",
            categoryId: "5",
            name: "French Fries",
            description: "Crispy golden fries",
            price: 5,
            currency: "USD",
            allergens: [],
            variants: [],
            customOptions: [],
          },
        },
      ],
    },
  },
]

// Styles
const containerStyles = css`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem;
`

const headerStyles = css`
  max-width: 1400px;
  margin: 0 auto 2rem;
`

const titleStyles = css`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`

const subtitleStyles = css`
  font-size: 1rem;
  color: #6b7280;
`

const searchContainerStyles = css`
  max-width: 1400px;
  margin: 0 auto 2rem;
  position: relative;
`

const searchIconStyles = css`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 1.25rem;
`

const searchInputStyles = css`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #111827;
  background-color: #ffffff;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const tableContainerStyles = css`
  max-width: 1400px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
`

const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
`

const tableHeaderStyles = css`
  background-color: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
`

const thStyles = css`
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
`

const tbodyStyles = css`
  background-color: #ffffff;
`

const trStyles = css`
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.15s;

  &:hover {
    background-color: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`

const tdStyles = css`
  padding: 1rem;
  font-size: 0.875rem;
  color: #374151;
  vertical-align: middle;
`

const expandButtonStyles = css`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s;

  &:hover {
    color: #111827;
  }
`

const orderIdCellStyles = css`
  font-weight: 600;
  color: #111827;
`

const customerCellStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const customerNameStyles = css`
  font-weight: 500;
  color: #111827;
`

const customerContactStyles = css`
  font-size: 0.75rem;
  color: #6b7280;
`

const statusBadgeStyles = css`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
`

const itemsCountStyles = css`
  font-weight: 500;
  color: #6b7280;
`

const totalStyles = css`
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
`

const pickupTimeStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
`

const statusSelectStyles = css`
  padding: 0.5rem 0.75rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 160px;

  &:hover {
    border-color: #3b82f6;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

const expandedRowStyles = css`
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`

const expandedContentStyles = css`
  padding: 1.5rem;
`

const expandedTitleStyles = css`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
`

const itemsListStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const itemRowStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
`

const itemNameStyles = css`
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.25rem;
`

const itemDetailsStyles = css`
  font-size: 0.75rem;
  color: #6b7280;
`

const itemQuantityStyles = css`
  font-weight: 600;
  color: #6b7280;
  font-size: 1rem;
  margin-left: 1rem;
`

const emptyStateStyles = css`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  font-size: 1.125rem;
`

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())

  // Filter orders based on search query
  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return orders

    const query = searchQuery.toLowerCase()
    return orders.filter(
      (order) =>
        order.customer.email.toLowerCase().includes(query) ||
        order.customer.phone.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query),
    )
  }, [orders, searchQuery])

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  // Toggle order items expansion
  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  // Get status badge color
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return { bg: "#fef3c7", text: "#92400e" }
      case "preparing":
        return { bg: "#dbeafe", text: "#1e40af" }
      case "ready-for-collection":
        return { bg: "#d1fae5", text: "#065f46" }
      case "collected":
        return { bg: "#e5e7eb", text: "#374151" }
      default:
        return { bg: "#f3f4f6", text: "#6b7280" }
    }
  }

  // Format pickup time
  const formatPickupTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Get item details (variant, options)
  const getItemDetails = (item: any) => {
    const details: string[] = []

    // Add variant info
    if (item.variantId && item.menuItem.variants) {
      const variant = item.menuItem.variants.find((v: any) => v.id === item.variantId)
      if (variant) {
        details.push(variant.label)
      }
    }

    // Add selected options
    if (item.selectedOptions && item.selectedOptions.length > 0) {
      item.selectedOptions.forEach((opt: any) => {
        const customOption = item.menuItem.customOptions?.find((co: any) => co.type === opt.optionType)
        if (customOption) {
          const choice = customOption.options.find((o: any) => o.id === opt.choiceId)
          if (choice) {
            details.push(choice.label)
          }
        }
      })
    }

    return details.join(", ")
  }

  return (
    <div  >
       

      <div className={searchContainerStyles}>
        <FaSearch className={searchIconStyles} />
        <input
          type="text"
          placeholder="Search by customer email, phone, name, or order ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={searchInputStyles}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className={emptyStateStyles}>
          {searchQuery ? "No orders found matching your search." : "No orders yet."}
        </div>
      ) : (
        <div className={tableContainerStyles}>
          <table className={tableStyles}>
            <thead className={tableHeaderStyles}>
              <tr>
                <th className={thStyles} style={{ width: "40px" }}></th>
                <th className={thStyles}>Order ID</th>
                <th className={thStyles}>Customer</th>
                <th className={thStyles}>Status</th>
                <th className={thStyles}>Items</th>
                <th className={thStyles}>Total</th>
                <th className={thStyles}>Pickup Time</th>
                <th className={thStyles}>Update Status</th>
              </tr>
            </thead>
            <tbody className={tbodyStyles}>
              {filteredOrders.map((order) => {
                const statusColor = getStatusColor(order.status)
                const isExpanded = expandedOrders.has(order.id)

                return (
                  <>
                    <tr key={order.id} className={trStyles}>
                      <td className={tdStyles}>
                        <button className={expandButtonStyles} onClick={() => toggleOrderExpansion(order.id)}>
                          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                        </button>
                      </td>
                      <td className={tdStyles}>
                        <div className={orderIdCellStyles}>{order.id}</div>
                      </td>
                      <td className={tdStyles}>
                        <div className={customerCellStyles}>
                          <span className={customerNameStyles}>{order.customer.name}</span>
                          <span className={customerContactStyles}>{order.customer.email}</span>
                          <span className={customerContactStyles}>{order.customer.phone}</span>
                        </div>
                      </td>
                      <td className={tdStyles}>
                        <span
                          className={statusBadgeStyles}
                          style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                        >
                          {order.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className={tdStyles}>
                        <span className={itemsCountStyles}>{order.cart.items.length} items</span>
                      </td>
                      <td className={tdStyles}>
                        <span className={totalStyles}>${order.total.amount.toFixed(2)}</span>
                      </td>
                      <td className={tdStyles}>
                        <div className={pickupTimeStyles}>
                          <FaClock />
                          <span>{formatPickupTime(order.pickupTime)}</span>
                        </div>
                      </td>
                      <td className={tdStyles}>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={statusSelectStyles}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="processing">Processing</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready-for-collection">Ready for Collection</option>
                          <option value="collected">Collected</option>
                        </select>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className={expandedRowStyles}>
                        <td colSpan={8}>
                          <div className={expandedContentStyles}>
                            <div className={expandedTitleStyles}>Order Items</div>
                            <div className={itemsListStyles}>
                              {order.cart.items.map((item) => {
                                const details = getItemDetails(item)
                                return (
                                  <div key={item.id} className={itemRowStyles}>
                                    <div style={{ flex: 1 }}>
                                      <div className={itemNameStyles}>{item.menuItem.name}</div>
                                      {details && <div className={itemDetailsStyles}>{details}</div>}
                                    </div>
                                    <span className={itemQuantityStyles}>×{item.quantity}</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
