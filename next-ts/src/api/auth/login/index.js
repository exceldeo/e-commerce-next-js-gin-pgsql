import { useMutation } from '@tanstack/react-query';

import { unauthorizedClient } from '../../apiClient';

export const useLogin = () => {
  return useMutation(
    async ({ email, password }) => {
      return await unauthorizedClient.post('auth/login', {
        email,
        password,
      });
    },
    {
      onSuccess: (data) => {
        if (data.data.data) {
          localStorage.setItem('auth', JSON.stringify(data.data.data));
        }
      },
    }
  );
};
