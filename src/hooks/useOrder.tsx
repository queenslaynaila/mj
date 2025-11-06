import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, updateOrder } from "@/app/api/orders.api";
import { OrdersResponse, UpdateOrderBody } from "@/types/orders.types";

export function useOrders() {
  return useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateOrderBody }) =>
      updateOrder(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
