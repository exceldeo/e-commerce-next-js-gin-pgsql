import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { unauthorizedClient } from '../apiClient';

const profileKey = 'category';

const getAllCategories = async (productQuery) => {
  const query = qs.stringify({
    ...productQuery,
  });
  const response = await unauthorizedClient.get('category?' + query);
  return response.data;
};

export const useGetAllCategories = (productQuery) => {
  return useQuery(
    [profileKey, productQuery],
    async () => await getAllCategories(productQuery)
  );
};

const getAllSummarizedCategories = async () => {
  const response = await unauthorizedClient.get('category/summarized');
  return response.data;
};

export const useGetAllSummarizedCategories = () => {
  return useQuery([profileKey], async () => await getAllSummarizedCategories());
};
