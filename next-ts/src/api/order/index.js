import { useMutation, useQuery } from '@tanstack/react-query';

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
  const response = await authorizedClient.get('/order/' + id);
  return response.data;
};
