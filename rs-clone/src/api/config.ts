const BASE_URL = 'http://localhost:5050/api';
const ACCESS_TOKEN = localStorage.getItem('accessToken');

async function getCurrentUserId(): Promise<string> {
  const res = await fetch(`${BASE_URL}/users/current`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });
  const user = await res.json();

  return user._id;
}

export { getCurrentUserId, BASE_URL, ACCESS_TOKEN };
