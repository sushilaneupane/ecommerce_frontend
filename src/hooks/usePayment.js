import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PAYMENT_KEY } from "@/utils/queryKeys";
import { getAllPayments, updatePayment } from "../api/paymentApi";

export const usePayments = () => {
  const token = localStorage.getItem("authToken");
    const queryClient = useQueryClient();


  const {
    data: paymentsData,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: [PAYMENT_KEY, "all"],
    queryFn: () => getAllPayments(token),
    enabled: !!token,
  });

  const update = useMutation({
    mutationFn: async ({ paymentId, paymentStatus }) => {
      return await updatePayment(paymentId, { paymentStatus }, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([PAYMENT_KEY, "all"]);
      toast.success("Payment updated successfully!");
    },
  });

  return {
    paymentsData,
    isLoading,
    isError,
    update,
  };
};
