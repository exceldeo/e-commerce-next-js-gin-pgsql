import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '../../apiClient';

const profileKey = 'shopProduct';

const getAllProducts = async () => {
  const response = await authorizedClient.get('shop/product');
  return response.data;
};

export const useGetAllProducts = () => {
  return useQuery([profileKey], async () => await getAllProducts());
};

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: [profileKey, id],
    queryFn: async () => await getProductById(id),
    enabled: Boolean(id),
  });
};

export const getProductById = async (id) => {
  const response = await authorizedClient.get('/shop/product/' + id);
  return response.data;
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ category_id, title, description, thumbnail, stock, price }) => {
      const response = await authorizedClient.post('/shop/product', {
        category_id: parseInt(category_id),
        title,
        description,
        thumbnail,
        stock: parseInt(stock),
        price: parseInt(price),
        listring_status: false,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([profileKey]);
      },
    }
  );
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      id,
      category_id,
      title,
      description,
      thumbnail,
      stock,
      price,
      listring_status,
    }) => {
      const response = await authorizedClient.put('/shop/product/' + id, {
        category_id,
        title,
        description,
        thumbnail,
        stock: parseInt(stock),
        price,
        listring_status,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([profileKey]);
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => {
      console.log(data);
      const response = await authorizedClient.delete('/shop/product/' + data);
      return response.data;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([profileKey]);
      },
    }
  );
};
