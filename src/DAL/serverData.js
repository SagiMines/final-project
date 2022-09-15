import Cookies from 'js-cookie';

export const postReq = async (route, data) => {
  let val;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };

  const req = await fetch(`http://localhost:8000/api/${route}`, requestOptions);
  const ans = await req.json();
  const status = ans.statusCode;
  if (status === 200) val = true;
  else val = false;

  return val;
};

export const getReq = async route => {
  const req = await fetch(`http://localhost:8000/api/${route}`);
  const ans = await req.json();
  return ans;
};

export const getUserIdFromCookie = async () => {
  try {
    const userId = await getReq(`login/${Cookies.get('user_id')}`);
    return userId;
  } catch {
    return false;
  }
};

export const isConnected = async () => {
  if (Cookies.get('user_id')) {
    const userId = await getUserIdFromCookie();
    console.log(userId);
    return userId ? true : false;
  }
  return false;
};
