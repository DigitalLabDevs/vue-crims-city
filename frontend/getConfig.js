export function getConfig() {
  const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://crims-city.ct8.pl'
    : 'http://localhost:3000';

  return {
    API_URL,
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
