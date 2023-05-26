import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '../apiClient';

const cartKey = 'cart';

const getCart = async () => {
  const response = await authorizedClient.get('/user/cart');
  return response.data;
};

export const useGetCart = () => {
  return useQuery([cartKey, 1], async () => await getCart());
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      return await authorizedClient.post('/user/cart', {
        product_id: data.id,
        quantity: data.qty,
      });
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([cartKey]);
        getCart();
      },
    }
  );
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      return await authorizedClient.put(`/user/cart/${data.id}`, {
        product_id: data.product_id,
        quantity: data.qty,
      });
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([cartKey]);
        getCart();
      },
    }
  );
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      return await authorizedClient.delete(`/user/cart/${id.id}`);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([cartKey]);
        getCart();
      },
    }
  );
};
