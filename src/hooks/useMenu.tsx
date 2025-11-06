import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createMenuItem, deleteMenuItem, getMenuItems, updateMenuItem } from "../app/api/menu.api";
import { MenuItem } from "@/types/menu.types";
 
export function useMenuItems(categoryId?: string, q?: string) {
  return useQuery({
    queryKey: ["menu-items", { categoryId, q }],
    queryFn: () => getMenuItems({ categoryId, q }),
  });
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menu"] }),
  });
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MenuItem> }) =>
      updateMenuItem(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menu"] }),
  });
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menu"] }),
  });
}