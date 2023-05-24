export default function auth() {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token'));
    }
    return false;
  }
  return false;
}
