import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const unauthorizedClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: true,
});

const authorizedClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: true,
});

authorizedClient.interceptors.request.use(async (req) => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    if (req.headers) {
      req.headers.Authorization = `Bearer ${token}`;
      return req;
    }
  }

  return req;
});

export { authorizedClient, unauthorizedClient };