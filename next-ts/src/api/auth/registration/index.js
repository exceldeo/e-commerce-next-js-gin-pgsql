import { useMutation } from '@tanstack/react-query';

import { unauthorizedClient } from '../../apiClient';
import { hashPassword } from '../../../../utils/hashPassword';

export const useRegistration = () => {
  return useMutation(
    async ({
      employee_code,
      email,
      name,
      password,
      document,
      phone,
      ktp_pic,
      company_id,
    }) => {
      const newPassword = hashPassword(password);

      const formData = new FormData();
      formData.append('employee_code', employee_code);
      formData.append('email', email);
      formData.append('kkks_company_id', company_id);
      formData.append('name', name);
      formData.append('password', newPassword);
      formData.append('phone', phone);

      let tempFileKtp = null;

      if (ktp_pic && ktp_pic.length > 0) {
        const item = ktp_pic.item(0);
        if (item) {
          tempFileKtp = item;
        }
      }

      if (tempFileKtp) {
        formData.append('ktp_pic', tempFileKtp, tempFileKtp.name);
      }

      let tempFileDocument = null;

      if (document && document.length > 0) {
        const item = document.item(0);
        if (item) {
          tempFileDocument = item;
        }
      }

      if (tempFileDocument) {
        formData.append('document', tempFileDocument, tempFileDocument.name);
      }

      return await unauthorizedClient.post('/kkks/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  );
};
