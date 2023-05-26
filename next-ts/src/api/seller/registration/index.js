import { useMutation } from '@tanstack/react-query';

import { authorizedClient } from '../../apiClient';

export const useRegistration = () => {
  return useMutation(async (data) => {
    return await authorizedClient.post('/shop/register', {
      name: data.name,
      username: data.username,
      province_id: parseInt(data.province_id),
      prov_name: data.prov_name,
      city_id: parseInt(data.city_id),
      city_name: data.city,
    });
  });
};
