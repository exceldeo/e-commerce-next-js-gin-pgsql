import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '../../apiClient';

const profileKey = 'shopOrder';

const getAllOrders = async (status) => {
  const response = await authorizedClient.get('shop/order', {
    params: {
      status,
    },
  });
  return response.data;
};

export const useGetAllOrders = (status) => {
  return useQuery([profileKey, status], async () => await getAllOrders(status));
};

export const useGetOrderById = (id) => {
  return useQuery({
    queryKey: [profileKey, id],
    queryFn: async () => await getOrderById(id),
    enabled: Boolean(id),
  });
};

const getOrderById = async (id) => {
  const response = await authorizedClient.get('/shop/order/' + id);
  return response.data;
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (order) => {
      const response = await authorizedClient.put('/shop/order/' + order.id, {
        shop_id: order.shop_id,
        purchase_code: order.purchase_code,
        total_items_price: order.total_items_price,
        delivery_fee: order.delivery_fee,
        resi_no: order.resi_no,
        cancel_notes: order.cancel_notes,
        payment_notes: order.payment_notes,
        status: order.status,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(profileKey);
        getOrders();
      },
    }
  );
};
