import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '../../apiClient';
import auth from '../../../../utils/auth';

const profileKey = 'shopProfile';

export const useGetProfile = () => {
  const isAuth = auth();
  let enabledValue = false;
  if (isAuth) {
    enabledValue = true;
  }

  return useQuery({
    queryKey: [profileKey],
    queryFn: async () => await getProfile(),
    enabled: enabledValue,
  });
};

const getProfile = async () => {
  const response = await authorizedClient.get('/shop/profile');
  return response.data;
};
