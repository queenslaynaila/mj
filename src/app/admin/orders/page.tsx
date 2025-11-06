"use client"
import ErrorMessage from "@/components/Error"
import Loader from "@/components/Loader"
import { useOrders, useUpdateOrder } from "@/hooks/useOrder"
import { mqMin } from "@/styles/breakpoints"
import type { CartItem, CustomOption, SelectedOption, Variant, OrderStatus } from "@/types/orders.types"
import { css } from "@linaria/core"
import { useMemo, useState } from "react"
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaClock, FaSearch } from "react-icons/fa"

const containerStyles = css`
  padding: 24px;
  width: 100%;
  ${mqMin[1]} {
    padding: 16px;
  }
`

const headerStyles = css`
  max-width: 1400px;
  margin: 0 auto 2rem;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const titleStyles = css`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`

const subtitleStyles = css`
  font-size: 1rem;
  color: #d1fae5;
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
  color: #059669;
  font-size: 1.25rem;
`

const searchInputStyles = css`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #d1fae5;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #111827;
  background-color: #ffffff;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
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
  background: linear-gradient(135deg, #ecfdf5 0%, #f9fafb 100%);
  border-bottom: 2px solid #d1fae5;
`

const thStyles = css`
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #047857;
  white-space: nowrap;
`

const tbodyStyles = css`
  background-color: #ffffff;
`

const trStyles = css`
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.15s;

  &:hover {
    background-color: #f0fdf4;
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
    color: #059669;
  }
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

const statusCellStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`

const statusBadgeStyles = css`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
  width: fit-content;
`

const collectedTimeStyles = css`
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.375rem;
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
    border-color: #059669;
  }

  &:focus {
    outline: none;
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const disabledStatusTextStyles = css`
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
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

const itemDetailsContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-top: 0.5rem;
`

const itemDetailRowStyles = css`
  display: flex;
  gap: 0.5rem;
  font-size: 0.8125rem;
`

const itemDetailLabelStyles = css`
  font-weight: 600;
  color: #374151;
`

const itemDetailValueStyles = css`
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

const paginationContainerStyles = css`
  max-width: 1400px;
  margin: 2rem auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
`

const paginationInfoStyles = css`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`

const paginationButtonsStyles = css`
  display: flex;
  gap: 0.5rem;
`

const paginationButtonStyles = css`
  padding: 0.5rem 1rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    border-color: #059669;
    background-color: #f0fdf4;
    color: #059669;
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export default function Stats() {
  const { data: ordersData = { items: [] }, isLoading, isError } = useOrders()
  const updateOrder = useUpdateOrder()

  const [searchQuery, setSearchQuery] = useState("")
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10

  const orders = ordersData.items

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

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ordersPerPage
    const endIndex = startIndex + ordersPerPage
    return filteredOrders.slice(startIndex, endIndex)
  }, [filteredOrders, currentPage])

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

  const getItemDetails = (item: CartItem) => {
    const details: { label: string; value: string }[] = []

    if (item.variantId && item.menuItem.variants) {
      const variant = item.menuItem.variants.find((v: Variant) => v.id === item.variantId)
      if (variant) {
        details.push({ label: "Size/Variant", value: variant.label })
      }
    }

    if (item.selectedOptions && item.selectedOptions.length > 0) {
      item.selectedOptions.forEach((opt: SelectedOption) => {
        const customOption = item.menuItem.customOptions?.find((co: CustomOption) => co.type === opt.optionType)
        if (customOption) {
          const choice = customOption.options.find(
            (o: { id: string; label: string; priceDelta?: number }) => o.id === opt.choiceId,
          )
          if (choice) {
            details.push({ label: customOption.label, value: choice.label })
          }
        }
      })
    }

    return details
  }

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    if (newStatus === "collected") {
      updateOrder.mutate({
        id: orderId,
        payload: {
          status: newStatus,
          pickupTime: new Date().toISOString(),
        },
      })
    } else {
      updateOrder.mutate({
        id: orderId,
        payload: {
          status: newStatus,
        },
      })
    }
  }

  return (
    <div className={containerStyles}>
      <div className={headerStyles}>
        <h1 className={titleStyles}>Order Management</h1>
        <p className={subtitleStyles}>Monitor and manage customer orders in real-time</p>
      </div>

      {isLoading && <Loader message="Loading orders..." />}

      {isError && !isLoading && (
        <ErrorMessage message="Unable to load orders. Please check your connection and try again." />
      )}

      {!isLoading && !isError && (
        <>
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
            <>
              <div className={tableContainerStyles}>
                <table className={tableStyles}>
                  <thead className={tableHeaderStyles}>
                    <tr>
                      <th className={thStyles} style={{ width: "40px" }}></th>
                      <th className={thStyles}>Customer</th>
                      <th className={thStyles}>Status</th>
                      <th className={thStyles}>Items</th>
                      <th className={thStyles}>Total</th>
                      <th className={thStyles}>Update Status</th>
                    </tr>
                  </thead>
                  <tbody className={tbodyStyles}>
                    {paginatedOrders.map((order) => {
                      const statusColor = getStatusColor(order.status)
                      const isExpanded = expandedOrders.has(order.id)
                      const isCollected = order.status === "collected"

                      return (
                        <>
                          <tr key={order.id} className={trStyles}>
                            <td className={tdStyles}>
                              <button className={expandButtonStyles} onClick={() => toggleOrderExpansion(order.id)}>
                                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                              </button>
                            </td>
                            <td className={tdStyles}>
                              <div className={customerCellStyles}>
                                <span className={customerNameStyles}>{order.customer.name}</span>
                                <span className={customerContactStyles}>{order.customer.email}</span>
                                <span className={customerContactStyles}>{order.customer.phone}</span>
                              </div>
                            </td>
                            <td className={tdStyles}>
                              <div className={statusCellStyles}>
                                <span
                                  className={statusBadgeStyles}
                                  style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                                >
                                  {order.status.replace("-", " ")}
                                </span>
                                {isCollected && (
                                  <div className={collectedTimeStyles}>
                                    <FaClock />
                                    <span>Picked up at {formatPickupTime(order.pickupTime)}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className={tdStyles}>
                              <span className={itemsCountStyles}>{order.cart.items.length} items</span>
                            </td>
                            <td className={tdStyles}>
                              <span className={totalStyles}>${order.total.amount.toFixed(2)}</span>
                            </td>
                            <td className={tdStyles}>
                              {isCollected ? (
                                <span className={disabledStatusTextStyles}>Order completed</span>
                              ) : (
                                <select
                                  value={order.status}
                                  onChange={(e) => handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                                  className={statusSelectStyles}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <option value="processing">Processing</option>
                                  <option value="preparing">Preparing</option>
                                  <option value="ready-for-collection">Ready for Collection</option>
                                  <option value="collected">Collected</option>
                                </select>
                              )}
                            </td>
                          </tr>

                          {isExpanded && (
                            <tr className={expandedRowStyles}>
                              <td colSpan={6}>
                                <div className={expandedContentStyles}>
                                  <div className={expandedTitleStyles}>Order Items - Kitchen Details</div>
                                  <div className={itemsListStyles}>
                                    {order.cart.items.map((item) => {
                                      const details = getItemDetails(item)
                                      return (
                                        <div key={item.id} className={itemRowStyles}>
                                          <div style={{ flex: 1 }}>
                                            <div className={itemNameStyles}>{item.menuItem.name}</div>
                                            {details.length > 0 && (
                                              <div className={itemDetailsContainerStyles}>
                                                {details.map((detail, idx) => (
                                                  <div key={idx} className={itemDetailRowStyles}>
                                                    <span className={itemDetailLabelStyles}>{detail.label}:</span>
                                                    <span className={itemDetailValueStyles}>{detail.value}</span>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
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

              {totalPages > 1 && (
                <div className={paginationContainerStyles}>
                  <div className={paginationInfoStyles}>
                    Page {currentPage} of {totalPages} ({filteredOrders.length} total orders)
                  </div>
                  <div className={paginationButtonsStyles}>
                    <button
                      className={paginationButtonStyles}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      disabled={currentPage === 1}
                    >
                      <FaChevronLeft />
                      Previous
                    </button>
                    <button
                      className={paginationButtonStyles}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
