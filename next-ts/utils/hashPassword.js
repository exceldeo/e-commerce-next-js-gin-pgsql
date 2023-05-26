import sha3 from 'crypto-js/sha3';

export const hashPassword = (password) => {
  if (process.env.NODE_ENV == 'development') {
    return password;
  }

  return sha3(password, { outputLength: 256 }).toString();
};
