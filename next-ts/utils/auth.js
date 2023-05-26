import jwt_decode from 'jwt-decode';

export default function auth() {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('auth')) {
      return JSON.parse(localStorage.getItem('auth'));
    }
    return false;
  }
  return false;
}

export function authRole() {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('auth')) {
      // check auth from jwt
      const auth = JSON.parse(localStorage.getItem('auth'));
      var decoded = jwt_decode(auth.access_token);
      return decoded.RoleID;
    }
    return false;
  }
  return false;
}
