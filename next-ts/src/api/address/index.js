import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '../apiClient';

export const useAddAddress = () => {
  return useMutation(
    async ({
      name,
      province_id,
      province,
      city_id,
      city_name,
      address_detail,
      zip_code,
      is_default,
    }) => {
      console.log('name', name);
      const response = await authorizedClient.post('/user/address', {
        name,
        province_id: parseInt(province_id),
        province,
        city_id: parseInt(city_id),
        city_name,
        address_detail,
        zip_code,
        is_default,
      });
      return response.data;
    }
  );
};

const getAddress = async () => {
  const response = await authorizedClient.get('/user/address');
  return response.data;
};

export const useGetAddress = () => {
  const { data, isLoading, isSuccess } = useQuery(
    ['address'],
    async () => await getAddress()
  );

  return { data: data?.data, isLoading, isSuccess };
};
