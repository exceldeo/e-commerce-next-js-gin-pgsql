import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '../apiClient';

export const useAddPayment = () => {
  return useMutation(async ({ bank_name, card_number }) => {
    console.log('name', name);
    const response = await authorizedClient.post('/user/payment', {
      bank_name,
      card_number,
    });
    return response.data;
  });
};

const getPayment = async () => {
  const response = await authorizedClient.get('/user/payment');
  return response.data;
};

export const useGetPayment = () => {
  const { data, isLoading, isSuccess } = useQuery(
    ['payment'],
    async () => await getPayment()
  );

  return { data: data?.data, isLoading, isSuccess };
};
