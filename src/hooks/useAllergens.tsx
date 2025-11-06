import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Allergen, 
  CreateAllergenBody, 
  UpdateAllergenBody 
} from "@/types/allergens.types";
import { 
  createAllergen, 
  fetchAllergens, 
  updateAllergen, 
  deleteAllergen 
} from "@/app/api/allergens.api";

export function useAllergens() {
  return useQuery<Allergen[]>({
    queryKey: ["allergens"],
    queryFn: fetchAllergens,
  });
}

export function useCreateAllergen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAllergenBody) => createAllergen(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allergens"] });
    },
  });
}

export function useUpdateAllergen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAllergenBody }) =>
      updateAllergen(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allergens"] });
    },
  });
}

export function useDeleteAllergen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAllergen(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allergens"] });
    },
  });
}
