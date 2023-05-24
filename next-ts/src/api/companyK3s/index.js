import { useQuery } from '@tanstack/react-query';

import { unauthorizedClient } from '../apiClient';

const profileKey = 'companyK3s';

export const useGetAllCompanyK3s = () => {
  return useQuery([profileKey], async () => await getAllCompanyK3s());
};

const getAllCompanyK3s = async () => {
  const response = await unauthorizedClient.get('kkks/company/data/all');
  return response.data;
};
