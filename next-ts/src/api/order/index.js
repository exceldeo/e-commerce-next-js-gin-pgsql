import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '../apiClient';

const profileKey = 'order';

export const useCreateOrder = () => {
  return useMutation(
    async ({
      shop_id,
      status,
      orders_product,
      orders_payment,
      orders_address,
    }) => {
      // console.log('order_items', order_items);
      const response = await authorizedClient.post('user/order', {
        shop_id,
        status,
        orders_product,
        orders_payment,
        orders_address,
      });
      return response.data;
    }
  );
};

const getAllOrders = async (status) => {
  const response = await authorizedClient.get('user/order', {
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
  const response = await authorizedClient.get('/user/order/' + id);
  return response.data;
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (order) => {
      const response = await authorizedClient.put('/user/order/' + order.id, {
        shop_id: order.shop_id,
        purchase_code: order.purchase_code,
        total_items_price: order.total_items_price,
        delivery_fee: order.delivery_fee,
        resi_no: order.resi_no,
        cancel_notes: order.cancel_notes,
        payment_notes: order.payment_notes,
        status: 1,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(profileKey);
      },
    }
  );
};
