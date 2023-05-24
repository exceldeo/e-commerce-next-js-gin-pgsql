import { useMutation } from '@tanstack/react-query';

import { unauthorizedClient } from '../../apiClient';

export const useResetPassword = () => {
  return useMutation(async (email) => {
    return await unauthorizedClient.post('/auth/request_reset', {
      email,
      user_type: 'kkks',
    });
  });
};

export const useUpdatePassword = () => {
  return useMutation(async ({ email, password, token }) => {
    return await unauthorizedClient.post('/auth/reset_password', {
      email,
      user_type: 'kkks',
      token,
      password,
    });
  });
};
