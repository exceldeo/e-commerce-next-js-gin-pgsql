import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { unauthorizedClient } from '../apiClient';

const profileKey = 'brand';

const getAllBrands = async (productQuery) => {
  const query = qs.stringify({
    ...productQuery,
  });
  const response = await unauthorizedClient.get('brand/all?' + query);
  return response.data;
};

export const useGetAllBrands = (productQuery) => {
  return useQuery(
    [profileKey, productQuery],
    async () => await getAllBrands(productQuery)
  );
};
