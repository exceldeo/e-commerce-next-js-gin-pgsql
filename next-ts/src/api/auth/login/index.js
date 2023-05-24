import { useMutation } from '@tanstack/react-query';

import { unauthorizedClient } from '../../apiClient';
import { hashPassword } from '../../../../utils/hashPassword';

export const useLogin = () => {
  return useMutation(
    async ({ email, password, otp }) => {
      return await unauthorizedClient.post('auth/kkks/login', {
        email,
        password: hashPassword(password),
        otp,
      });
    },
    {
      onSuccess: (data) => {
        if (data.data.data) {
          localStorage.setItem('token', JSON.stringify(data.data.data.token));
        }
      },
    }
  );
};

export const useRequestOTP = () => {
  return useMutation(async ({ email }) => {
    return await unauthorizedClient.post('auth/kkks/otp', {
      email,
    });
  });
};
