import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { unauthorizedClient } from '../apiClient';

const profileKey = 'product';

const getAllProducts = async (productQuery) => {
  const query = qs.stringify({
    ...productQuery,
  });
  const response = await unauthorizedClient.get('product/all?' + query);
  return response.data;
};

export const useGetAllProducts = (productQuery) => {
  return useQuery(
    [profileKey, productQuery],
    async () => await getAllProducts(productQuery)
  );
};

export const useGetProductBySlug = (slug) => {
  return useQuery({
    queryKey: [profileKey, slug],
    queryFn: async () => await getProductBySlug(slug),
    enabled: Boolean(slug),
  });
};

export const getProductBySlug = async (slug) => {
  const response = await unauthorizedClient.get('/product/' + slug);
  return response.data;
};
