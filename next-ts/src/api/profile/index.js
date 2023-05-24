import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '../apiClient';
import auth from '../../../utils/auth';

const profileKey = 'profile';

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
  const response = await authorizedClient.get('profile/get');
  return response.data;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ name, phone, employee_code, npwp, gender }) => {
      return await authorizedClient.post('/profile/kkks/update', {
        name,
        phone,
        employee_code,
        npwp,
        gender,
      });
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([profileKey]);
      },
    }
  );
};
