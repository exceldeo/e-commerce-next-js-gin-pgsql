import { useMutation } from '@tanstack/react-query';

import { unauthorizedClient } from '../../apiClient';

export const useRegistration = () => {
  return useMutation(async ({ email, phone_no, fullname, password }) => {
    return await unauthorizedClient.post('/auth/register', {
      email,
      phone_no,
      fullname,
      password,
    });
  });
};
