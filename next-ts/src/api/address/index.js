import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authorizedClient } from '../apiClient';

const getAllProvince = async () => {
  const response = await authorizedClient.get('address/province/all');
  return response.data;
};

export const useGetProvince = () => {
  const { data, isLoading } = useQuery(
    ['province'],
    async () => await getAllProvince()
  );

  return { data: data?.data?.province, isLoading };
};

const getCityByProvince = async (provinceId) => {
  const response = await authorizedClient.get(`address/city/${provinceId}/all`);
  return response.data;
};

export const useGetCity = (provinceId) => {
  const { data, isLoading } = useQuery(
    ['city', provinceId],
    async () => await getCityByProvince(provinceId),
    { enabled: !!provinceId }
  );

  return { data: data?.data?.cities, isLoading };
};

const getDistrictByCity = async (cityId) => {
  const response = await authorizedClient.get(`address/district/${cityId}/all`);
  return response.data;
};

export const useGetDistrict = (cityId) => {
  const { data, isLoading } = useQuery(
    ['district', cityId],
    async () => await getDistrictByCity(cityId),
    { enabled: !!cityId }
  );

  return { data: data?.data?.districts, isLoading };
};

const getVillageByDistrict = async (districtId) => {
  const response = await authorizedClient.get(
    `address/village/${districtId}/all`
  );
  return response.data;
};

export const useGetVillage = (districtId) => {
  const { data, isLoading } = useQuery(
    ['village', districtId],
    async () => await getVillageByDistrict(districtId),
    { enabled: !!districtId }
  );

  return { data: data?.data?.villages, isLoading };
};

export const useAddAddress = () => {
  return useMutation(
    async ({
      name,
      province,
      city,
      district,
      village,
      address,
      zip_code,
      is_default,
    }) => {
      const response = await authorizedClient.post('address/kkks/create', {
        name,
        province_code: province,
        city_code: city,
        district_code: district,
        village_code: village,
        address_detail: address,
        zip_code,
        latitude: 0,
        longitude: 0,
        is_default,
      });
      return response.data;
    }
  );
};

export const useEditAddress = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      id,
      name,
      province,
      city,
      district,
      village,
      address,
      zip_code,
      is_default,
    }) => {
      const response = await authorizedClient.post('address/kkks/edit', {
        id,
        name,
        province_code: province,
        city_code: city,
        district_code: district,
        village_code: village,
        address_detail: address,
        zip_code,
        latitude: 0,
        longitude: 0,
        is_default,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('address');
      },
    }
  );
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id }) => {
      const response = await authorizedClient.delete(`address/kkks/delete`, {
        data: { id },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('address');
      },
    }
  );
};

const getAddress = async () => {
  const response = await authorizedClient.get('address/kkks/all');
  return response.data;
};

export const useGetAddress = () => {
  const { data, isLoading, isSuccess } = useQuery(
    ['address'],
    async () => await getAddress()
  );

  return { data: data?.data?.address, isLoading, isSuccess };
};

const getAddressById = async (id) => {
  const response = await authorizedClient.get(`address/kkks/detail/${id}`);
  return response.data;
};

export const useGetAddressById = (id, edit) => {
  const { data, isLoading } = useQuery(
    ['address', id],
    async () => await getAddressById(id),
    { enabled: !!edit }
  );

  return { data: data?.data, isLoading };
};
