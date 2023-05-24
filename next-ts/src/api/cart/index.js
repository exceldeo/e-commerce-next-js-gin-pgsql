import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '../apiClient';

const cartKey = 'cart';

const getCart = async () => {
  const response = await authorizedClient.get('cart/get');
  return response.data;
};

export const useGetCart = () => {
  return useQuery([cartKey, 1], async () => await getCart());
};

// const getHoverCart = async () => {
//   const response = await authorizedClient.get(
//     '/cart/hover-home?limit=5'
//   )
//   return response.data
// }

// export const useGetHoverCart = (enabled) => {
//   return useQuery({
//     queryKey: [cartKey, 2],
//     queryFn: async () => await getHoverCart(),
//     retry: false,
//     enabled: enabled,
//   })
// }

// export const useUpdateCart = () => {
//   const queryClient = useQueryClient()

//   return useMutation(
//     async (data) => {
//       return await authorizedClient.put('/cart/items', {
//         product_detail_id: data.id,
//         quantity: data.quantity,
//       })
//     },
//     {
//       onSuccess: () => {
//         void queryClient.invalidateQueries([cartKey])
//       },
//     }
//   )
// }

// export const useDeleteCart = () => {
//   const queryClient = useQueryClient()

//   return useMutation(
//     async (id) => {
//       return await authorizedClient.delete(
//         '/cart/items/' + id
//       )
//     },
//     {
//       onSuccess: () => {
//         void queryClient.invalidateQueries([cartKey])
//       },
//     }
//   )
// }

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      return await authorizedClient.post('cart/add', {
        product_id: data.id,
        qty: data.qty,
        notes: '',
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
