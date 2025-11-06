import { OrdersResponse, Order, UpdateOrderBody } from "@/types/orders.types";
import api from "./axios.config";

export async function fetchOrders(): Promise<OrdersResponse> {
  const response = await api.get<OrdersResponse>("/orders");
  return response.data;
}

export async function updateOrder(orderId: string, body: UpdateOrderBody): Promise<Order> {
  const response = await api.patch<Order>(`/orders/${orderId}`, body);
  return response.data;
}