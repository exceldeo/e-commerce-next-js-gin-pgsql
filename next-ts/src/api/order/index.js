import { useMutation, useQuery } from '@tanstack/react-query';

import { authorizedClient } from '../apiClient';

const profileKey = 'order';

export const useCreateOrder = () => {
  return useMutation(
    async ({
      order_items,
      term_of_sales,
      subject,
      province_code,
      city_code,
      district_code,
      village_code,
      zip_code,
      latitude,
      longitude,
      address_detail,
      name,
      shipping_name,
      shipping_phone,
      invoice_province_code,
      invoice_city_code,
      invoice_district_code,
      invoice_village_code,
      invoice_zip_code,
      invoice_latitude,
      invoice_longitude,
      invoice_address_detail,
      invoice_name,
      invoice_shipping_name,
      invoice_shipping_phone,
    }) => {
      // console.log('order_items', order_items);
      const response = await authorizedClient.post('order/kkks/create', {
        order_items,
        term_of_sales,
        subject,
        province_code,
        city_code,
        district_code,
        village_code,
        zip_code,
        latitude,
        longitude,
        address_detail,
        name,
        shipping_name,
        shipping_phone,
        invoice_province_code,
        invoice_city_code,
        invoice_district_code,
        invoice_village_code,
        invoice_zip_code,
        invoice_latitude,
        invoice_longitude,
        invoice_address_detail,
        invoice_name,
        invoice_shipping_name,
        invoice_shipping_phone,
      });
      return response.data;
    }
  );
};

const getAllOrders = async (status) => {
  const response = await authorizedClient.get('order/all', {
    params: {
      status,
      sort: 'created_at',
      type: 'desc',
    },
  });
  return response.data;
};

export const useGetAllOrders = (status) => {
  return useQuery([profileKey, status], async () => await getAllOrders(status));
};

export const useGetOrderById = (id) => {
  return useQuery({
    queryKey: [profileKey, id],
    queryFn: async () => await getOrderById(id),
    enabled: Boolean(id),
  });
};

const getOrderById = async (id) => {
  const response = await authorizedClient.get('/order/' + id);
  return response.data;
};
